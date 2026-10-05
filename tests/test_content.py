import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]
class Metadata(HTMLParser):
    def __init__(self):
        super().__init__();self.description=None;self.entries=[];self.href=None;self.excerpt=None;self.capturing=False
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='meta' and attrs.get('name')=='description':self.description=attrs.get('content')
        if tag=='a' and 'post-link' in attrs.get('class','').split():self.href=attrs['href']
        if tag=='p' and self.href and 'post-excerpt' in attrs.get('class','').split():self.excerpt='';self.capturing=True
    def handle_data(self,data):
        if self.capturing:self.excerpt+=data
    def handle_endtag(self,tag):
        if tag=='p':self.capturing=False
        if tag=='a' and self.href:
            if self.excerpt is not None:self.entries.append((self.href,self.excerpt))
            self.href=None;self.excerpt=None

def metadata(path):
    p=Metadata();p.feed(path.read_text());return p
class ContentTests(unittest.TestCase):
    def test_both_journal_lists_use_the_canonical_description(self):
        entries=metadata(ROOT/'journal/index.html').entries
        self.assertGreater(len(entries),10)
        for url,excerpt in entries:
            target=ROOT/urlsplit(url).path.strip('/')/'index.html'
            self.assertEqual(' '.join(excerpt.split()),' '.join(metadata(target).description.split()),str(target))
        posts=json.loads(re.search(r'const POSTS = (\[.*?\]);',(ROOT/'app.js').read_text(),re.S)[1])
        for post in posts:
            target=ROOT/'journal'/post['slug']/'index.html'
            self.assertEqual(post['excerpt'],metadata(target).description,post['slug'])
    def test_unverified_ratings_are_not_present_in_structured_data(self):
        def visit(value):
            if isinstance(value,dict):
                self.assertNotIn('aggregateRating',value)
                self.assertNotIn('review',value)
                for child in value.values():visit(child)
            elif isinstance(value,list):
                for child in value:visit(child)
        for path in ROOT.rglob('*.html'):
            for block in re.findall(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',path.read_text(),re.S):
                visit(json.loads(block))
