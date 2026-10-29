"""Repair verified metadata errors without changing article/review content."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin
import copy
import json
import re

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://nevisan.in/'

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.canonical = ''; self.in_main = False; self.image = ''
    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'main': self.in_main = True
        if tag == 'img' and self.in_main and not self.image: self.image = urljoin(BASE, a.get('src', ''))
    def handle_endtag(self, tag):
        if tag == 'main': self.in_main = False

def main():
    changed = []
    for path in ROOT.rglob('*.html'):
        if any(x in path.parts for x in ['.git', 'node_modules', '.agents']): continue
        text = path.read_text(encoding='utf-8'); page = Page(); page.feed(text)
        def fix(match):
            data = json.loads(match[2]); original = copy.deepcopy(data)
            def walk(value):
                if isinstance(value, dict):
                    for key, item in list(value.items()):
                        if isinstance(item, str) and item in [BASE+'assets/logo.png', BASE+'teas/logo.png']:
                            value[key] = BASE+'nevisan-logo.jpeg'
                        walk(value[key])
                    if value.get('@type') in ['Article', 'BlogPosting']:
                        if 'hero-image.jpg' in str(value.get('image')) and page.image: value['image'] = page.image
                        if page.canonical:
                            value['mainEntityOfPage'] = {'@type':'WebPage','@id':page.canonical}
                elif isinstance(value, list):
                    for item in value: walk(item)
            walk(data)
            if path == ROOT/'index.html':
                for entity in data.get('@graph', []):
                    if entity.get('@type') in ['Organization', 'Store']:
                        entity['legalName'] = 'Mahabir Enterprise'
                        entity['description'] = 'Nevisan offers whole-leaf Assam green and oolong teas in 50g packets, packed and marketed by Mahabir Enterprise in Guwahati.'
                    if entity.get('@type') == 'Store': entity['paymentAccepted'] = 'UPI'
            if data == original: return match[0]
            return match[1] + '\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n' + match[3]
        new = re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', fix, text, flags=re.S)
        if new != text:
            path.write_text(new, encoding='utf-8'); changed.append(path.relative_to(ROOT).as_posix())
    print('Repaired schema on ' + str(len(changed)) + ' pages: ' + ', '.join(changed))

if __name__ == '__main__': main()
