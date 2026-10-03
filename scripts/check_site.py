#!/usr/bin/env python3
"""Check static pages, scripts, local assets and FAQ consistency without dependencies."""
from collections import Counter
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.scripts = [], [], []
        self.script = None

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if 'id' in attributes:
            self.ids.append(attributes['id'])
        for key in ['src', 'href', 'poster']:
            if attributes.get(key):
                self.refs.append((key, attributes[key]))
        if tag == 'meta' and attributes.get('property') in ['og:url', 'og:image', 'og:image:secure_url']:
            self.refs.append(('meta', attributes.get('content', '')))
        if tag == 'script':
            self.script = [attributes, '']

    def handle_data(self, data):
        if self.script is not None:
            self.script[1] += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.scripts.append(self.script)
            self.script = None


def check():
    errors = []
    pages = 0
    for path in sorted(ROOT.rglob('*.html')):
        if any(part in {'.git', '.agents', 'node_modules'} for part in path.relative_to(ROOT).parts):
            continue
        pages += 1
        page = Page()
        page.feed(path.read_text())
        relative = path.relative_to(ROOT)
        for identifier, count in Counter(page.ids).items():
            if count > 1:
                errors.append(f'{relative}: duplicate id {identifier}')
        for kind, url in page.refs:
            parts = urlsplit(url)
            if parts.scheme not in ('', 'http', 'https') or (parts.netloc and parts.netloc not in {'nevisan.in', 'www.nevisan.in'}):
                continue
            local = unquote(parts.path)
            target = ROOT / local.lstrip('/') if local.startswith('/') or parts.netloc else path.parent / local
            if target.is_dir():
                target /= 'index.html'
            if local and not target.exists():
                errors.append(f'{relative}: missing local {kind}: {url}')
            # React creates these two homepage anchor targets when it mounts.
            dynamic = relative == Path('index.html') and parts.fragment in {'main-content', 'collection'}
            if parts.fragment and not local and parts.fragment not in page.ids and not dynamic:
                errors.append(f'{relative}: missing anchor {url}')
        for attributes, body in page.scripts:
            if attributes.get('type') == 'application/ld+json':
                try:
                    json.loads(body)
                except ValueError as error:
                    errors.append(f'{relative}: invalid JSON-LD: {error}')
            elif not attributes.get('src') and body.strip():
                with tempfile.NamedTemporaryFile(suffix='.js', mode='w') as temporary:
                    temporary.write(body)
                    temporary.flush()
                    result = subprocess.run(['node', '--check', temporary.name], capture_output=True, text=True)
                    if result.returncode:
                        errors.append(f'{relative}: inline JavaScript syntax error: {result.stderr}')
    for name in ['app.js', 'consent.js']:
        result = subprocess.run(['node', '--check', str(ROOT / name)], capture_output=True, text=True)
        if result.returncode:
            errors.append(f'{name}: {result.stderr}')

    faq = (ROOT / 'faq/index.html').read_text()
    questions = {}
    counts = {}
    for block in re.findall(r'<section class="faq-section-block".*?</section>', faq, re.S):
        category = re.search(r'data-cat="([^"]+)"', block)[1]
        items = re.findall(r'<details class="faq-item".*?</details>', block, re.S)
        counts[category] = len(items)
        advertised = int(re.search(r'<span class="section-count">(\d+)', block)[1])
        if advertised != len(items):
            errors.append(f'FAQ {category}: section count differs from visible count')
        for item in items:
            question = unescape(re.search(r'<span class="s-text">(.*?)</span>', item, re.S)[1]).strip()
            answer = unescape(re.sub('<[^>]+>', '', re.search(r'<div class="answer">(.*?)</div>', item, re.S)[1])).strip()
            questions[question] = answer
    counts['all'] = sum(counts.values())
    for pill in re.findall(r'<button class="filter-pill[^\"]*".*?</button>', faq, re.S):
        category = re.search(r'data-filter="([^"]+)"', pill)[1]
        advertised = int(re.search(r'<span class="pill-badge">(\d+)', pill)[1])
        if advertised != counts[category]:
            errors.append(f'FAQ {category}: filter count differs from visible count')
    parser = Page()
    parser.feed(faq)
    for attributes, body in parser.scripts:
        if attributes.get('type') != 'application/ld+json':
            continue
        data = json.loads(body)
        if data.get('@type') == 'FAQPage':
            for item in data['mainEntity']:
                if questions.get(item['name']) != item['acceptedAnswer']['text']:
                    errors.append(f'FAQ schema does not match visible answer: {item["name"]}')
    app = (ROOT / 'app.js').read_text()
    front = json.loads(re.search(r'const frontFaqs = (\[.*?\]);', app, re.S)[1])
    parser = Page()
    parser.feed((ROOT / 'index.html').read_text())
    for attributes, body in parser.scripts:
        if attributes.get('type') != 'application/ld+json':
            continue
        data = json.loads(body)
        for node in data.get('@graph', [data]):
            if node.get('@type') == 'FAQPage':
                expected = [(item['q'], item['a']) for item in front]
                actual = [(item['name'], item['acceptedAnswer']['text']) for item in node['mainEntity']]
                if expected != actual:
                    errors.append('Homepage FAQ schema differs from React visible answers')
    print(f'Checked {pages} HTML pages, local references, JavaScript, JSON-LD and {counts["all"]} visible FAQs.')
    for error in errors:
        print(error, file=sys.stderr)
    return bool(errors)


if __name__ == '__main__':
    sys.exit(check())
