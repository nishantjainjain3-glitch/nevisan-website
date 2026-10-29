"""Prevent unverified packaging and certification badges returning to commerce."""
from pathlib import Path
import hashlib
import json
import re
import unittest

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'content/product-evidence.json').read_text(encoding='utf-8'))

class ProductEvidenceTests(unittest.TestCase):
    def test_reviewed_images_are_unchanged_illustrations_not_fabricated_photographs(self):
        self.assertEqual(len(DATA['display_images']),10)
        for key,source in DATA['display_images'].items():
            with self.subTest(tea=key):
                self.assertEqual(hashlib.sha256((ROOT/f'teas/display/{key}.webp').read_bytes()).digest(),hashlib.sha256((ROOT/f'teas/editorial/{source}.webp').read_bytes()).digest())
                for suffix in ['-640','-thumb']:self.assertTrue((ROOT/f'teas/display/{key}{suffix}.webp').is_file())

    def test_all_product_pages_explain_images_and_link_documentation(self):
        for path in (ROOT/'products').glob('*/index.html'):
            with self.subTest(page=path.parent.name):
                text=path.read_text(encoding='utf-8')
                self.assertNotIn('/teas/packaging/',text)
                self.assertNotIn('-lifestyle',text)
                self.assertIn('not a photograph of your current packet',text)
                self.assertIn('/contact.html#product-information',text)
                self.assertIn('/teas/display/',text)
                for src in re.findall(r'data-gallery-src="([^"]+)"',text):self.assertNotIn('branded',src)

    def test_certification_claims_are_not_inferred_from_existing_licence_numbers(self):
        app=(ROOT/'app.js').read_text(encoding='utf-8')
        for claim in ['PGS Organic Certified','PGS-INDIA ORGANIC','PGS Organic certified supply','Chemical Free, Always','FSSAI LICENSED']:
            self.assertNotIn(claim,app)
        self.assertIn('Current organic certificates are not published here',app)
        contact=(ROOT/'contact.html').read_text(encoding='utf-8')
        for licence in DATA['declared_licences']:
            self.assertIn(licence['number'],app)
            self.assertIn(licence['number'],contact)
        self.assertIn('separate from organic certification',contact)
        self.assertIn('not been independently verified',contact)
