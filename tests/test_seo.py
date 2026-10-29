import importlib.util
from pathlib import Path
import unittest
import json
import re

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('nevisan_seo_audit',ROOT/'scripts/audit_seo.py')
audit=importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

class SeoTests(unittest.TestCase):
    def test_canonicals_sitemap_schema_images_and_raw_product_links(self):
        report=audit.audit()
        self.assertEqual(report['errors'],[])
        self.assertEqual(report['indexable_pages'],56)
        self.assertGreaterEqual(report['article_entities'],20)

    def test_business_and_collection_markup_match_verified_facts(self):
        home=(ROOT/'index.html').read_text(encoding='utf-8')
        graph=next(json.loads(raw)['@graph'] for raw in re.findall(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',home,re.S) if '@graph' in json.loads(raw))
        businesses=[e for e in graph if e.get('@type') in ['Organization','Store']]
        self.assertTrue(businesses)
        for business in businesses:self.assertEqual(business['legalName'],'Mahabir Enterprise')
        self.assertEqual(next(e for e in businesses if e['@type']=='Store')['paymentAccepted'],'UPI')
        catalog=json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']
        names={'https://nevisan.in/products/'+p['handle']+'/':'Nevisan '+p['name'] for p in catalog}
        for item in next(e for e in graph if e.get('@type')=='ItemList')['itemListElement']:
            self.assertEqual(item['name'],names[item['url']])
