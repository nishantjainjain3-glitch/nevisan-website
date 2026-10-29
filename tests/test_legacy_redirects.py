"""Migration coverage for old URLs Google still crawls."""
import importlib.util
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('redirects', ROOT / 'scripts/build_legacy_redirects.py')
redirects = importlib.util.module_from_spec(spec)
spec.loader.exec_module(redirects)

class LegacyRedirectTests(unittest.TestCase):
    def test_reported_legacy_urls_resolve_to_real_canonical_pages(self):
        sitemap = ET.parse(ROOT / 'sitemap.xml')
        urls = {n.text for n in sitemap.findall('.//{*}loc')}
        for source, destination in redirects.REDIRECTS.items():
            with self.subTest(source=source):
                url = 'https://nevisan.in' + destination
                text = (ROOT / source).read_text(encoding='utf-8')
                self.assertIn(f'content="0; url={url}"', text)
                self.assertIn(f'rel="canonical" href="{url}"', text)
                self.assertIn(f'href="{url}">Continue', text)
                self.assertNotIn('noindex', text)
                self.assertIn(url, urls)
                self.assertNotIn('https://nevisan.in/' + source, urls)
                target = (ROOT / destination.lstrip('/') / 'index.html').read_text(encoding='utf-8')
                self.assertIn(f'rel="canonical" href="{url}"', target)
