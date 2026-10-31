from pathlib import Path
from html import escape
import importlib.util
import json
import re
import unittest

ROOT=Path(__file__).resolve().parents[1]
CONTENT=json.loads((ROOT/'content/product-benefits.json').read_text(encoding='utf-8'))
CATALOG=json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']

class ProductBenefitsTests(unittest.TestCase):
    def test_all_ten_products_have_one_matching_visible_section(self):
        self.assertEqual(set(CONTENT['products']),{p['handle'] for p in CATALOG})
        for product in CATALOG:
            handle=product['handle'];data=CONTENT['products'][handle]
            with self.subTest(tea=handle):
                text=(ROOT/'products'/handle/'index.html').read_text(encoding='utf-8')
                self.assertEqual(text.count('id="why-choose"'),1)
                self.assertEqual(text.count('id="why-choose-title"'),1)
                block=re.search(r'<!-- why-choose:start -->(.*?)<!-- why-choose:end -->',text,re.S)[1]
                self.assertIn('Why choose this tea?',block)
                self.assertEqual(block.count('class="tea-reason"'),3)
                self.assertIn(escape(data['intro']),block)
                for benefit in data['benefits']:
                    self.assertIn(escape(benefit['title']),block)
                    self.assertIn(escape(benefit['text']),block)
                self.assertLess(text.index('id="why-choose"'),text.index('<h2>Make it your ritual</h2>'))
                self.assertIn('/product-benefits.css?v=1',text)
                self.assertIn('Contains caffeine.',block)

    def test_ingredient_research_is_linked_and_kept_out_of_benefit_promises(self):
        for handle,data in CONTENT['products'].items():
            with self.subTest(tea=handle):
                cards=' '.join(x['title']+' '+x['text'] for x in data['benefits'])
                self.assertNotRegex(cards.lower(),r'(treats|cures|prevents|reduces|helps with|boosts) (pcos|pcod|gout|uric acid|thyroid|migraine|immunity|insomnia)')
                if 'research' not in data:continue
                text=(ROOT/'products'/handle/'index.html').read_text(encoding='utf-8')
                self.assertIn('<details class="tea-research">',text)
                self.assertIn(escape(data['research']['text']),text)
                self.assertTrue(data['research']['sources'])
                for source in data['research']['sources']:
                    self.assertTrue(source['url'].startswith('https://'))
                    self.assertIn('href="'+source['url']+'"',text)

    def test_specific_preparation_and_caffeine_limits_are_explicit(self):
        self.assertIn('ginger-powder capsules',CONTENT['products']['ginger-green-tea']['research']['text'])
        self.assertIn('prepared fish dishes',CONTENT['products']['lemongrass-green-tea']['research']['text'])
        self.assertIn('did not test migraine',CONTENT['products']['gaba-oolong-tea']['research']['text'])
        self.assertIn('leaf extract',CONTENT['products']['tulsi-green-tea']['research']['text'])
        self.assertIn('caffeinated green-tea blend',CONTENT['products']['chamomile-green-tea']['research']['text'])
        self.assertIn('cultured human skin cells',CONTENT['products']['blue-flower-green-tea']['research']['text'])
        self.assertIn('no significant improvement',CONTENT['products']['spearmint-green-tea']['research']['text'])
        self.assertIn('does not mean all green teas',CONTENT['products']['organic-green-tea']['research']['text'])
