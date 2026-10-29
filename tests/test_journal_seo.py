"""Keep journal snippets, linked facts and structured data aligned with the page."""
from pathlib import Path
from html import unescape
from html.parser import HTMLParser
import importlib.util
import json
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
GUIDES = json.loads((ROOT/'content/journal-guides.json').read_text(encoding='utf-8'))
PRODUCTS = {p['handle']:p for p in json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']}
spec = importlib.util.spec_from_file_location('seo', ROOT/'scripts/audit_seo.py')
seo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(seo)

class Head(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta={}
    def handle_starttag(self, tag, attrs):
        data=dict(attrs)
        if tag=='meta': self.meta[data.get('property',data.get('name',''))]=data.get('content')

class JournalSeoTests(unittest.TestCase):
    def test_social_and_article_metadata_match_visible_article_and_image(self):
        for page in (ROOT/'journal').glob('*/index.html'):
            with self.subTest(page=page.parent.name):
                text=page.read_text(encoding='utf-8'); head=Head(); head.feed(text)
                title=unescape(re.sub('<[^>]+>','',re.search(r'<h1\b[^>]*>(.*?)</h1>',text,re.S)[1]))
                canonical='https://nevisan.in/journal/'+page.parent.name+'/'
                image='https://nevisan.in'+re.search(r'<figure class="journal-cover">.*?\bsrc="([^"]+)"',text,re.S)[1]
                entities=[json.loads(raw) for raw in re.findall(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',text,re.S)]
                article=[o for o in entities if o.get('@type') in ['Article','BlogPosting']]
                self.assertEqual(len(article),1)
                self.assertEqual(article[0]['headline'],title)
                self.assertEqual(article[0]['mainEntityOfPage']['@id'],canonical)
                self.assertEqual(article[0]['image'],image)
                self.assertEqual(head.meta['og:title'],title)
                self.assertEqual(head.meta['twitter:title'],title)
                self.assertEqual(head.meta['og:image'],image)
                for entity in entities:
                    if entity.get('@type')=='BreadcrumbList':
                        self.assertEqual(entity['itemListElement'][-1]['item'],canonical)

    def test_rewritten_guides_show_catalog_facts_attribution_and_useful_next_links(self):
        hub=(ROOT/'journal/index.html').read_text(encoding='utf-8')
        for guide in GUIDES['guides']:
            with self.subTest(slug=guide['slug']):
                text=(ROOT/'journal'/guide['slug']/'index.html').read_text(encoding='utf-8')
                main=re.search(r'<main\b.*?</main>',text,re.S)[0]
                product=PRODUCTS[guide['product']]
                visible=unescape(re.sub('<[^>]+>',' ',main))
                for fact in [product['ingredients'],product['brew']['water'],product['brew']['leaves'],product['brew']['time'],'50g · MRP ₹499','Contains caffeine']:
                    self.assertIn(fact,visible)
                self.assertIn('AI assistance',visible)
                self.assertIn(f'datetime="{GUIDES["updated"]}"',main)
                self.assertIn('/contact.html',main)
                self.assertIn('/compare/',main)
                for related in guide['related']: self.assertIn('/journal/'+related+'/',main)
                self.assertIn(guide['title'].replace('&','&amp;'),hub)

    def test_health_and_cold_preparation_limits_are_sourced(self):
        pcos=(ROOT/'journal/pcos-spearmint-tea-daily-routine/index.html').read_text(encoding='utf-8')
        self.assertIn('https://pubmed.ncbi.nlm.nih.gov/19585478/',pcos)
        self.assertIn('no statistically significant improvement',pcos)
        self.assertIn('did not test Nevisan',pcos)
        cold=(ROOT/'journal/cold-brew-green-tea-guide/index.html').read_text(encoding='utf-8')
        self.assertIn('www.ua-bw.de',cold)
        self.assertIn('does not establish a tested cold-infusion time',cold)
        iced=(ROOT/'journal/cold-brew-lemongrass-iced-tea/index.html').read_text(encoding='utf-8')
        self.assertIn('It is not a cold-infusion recipe',iced)

    def test_audit_rejects_stray_quote_fragments_in_meta_tags(self):
        parser=seo.Metadata()
        parser.feed('<meta property="og:title" content="A beginner"s Guide">')
        self.assertTrue(parser.meta_errors)
        parser=seo.Metadata()
        parser.feed('<meta property="og:title" content="A beginner&#x27;s guide">')
        self.assertEqual(parser.meta_errors,[])
