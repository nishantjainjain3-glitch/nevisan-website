"""Prevent navigation markup from swallowing journal articles again."""
from html.parser import HTMLParser
from pathlib import Path
import unittest


class JournalStructure(HTMLParser):
    def __init__(self):
        super().__init__()
        self.nav_depth = 0
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag == 'nav':
            if self.nav_depth:
                self.errors.append('nested navigation')
            self.nav_depth += 1
        if tag in {'main', 'h1', 'footer'} and self.nav_depth:
            self.errors.append(f'{tag} inside navigation')

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.nav_depth -= 1


class JournalStructureTests(unittest.TestCase):
    def test_journal_content_is_outside_navigation(self):
        root = Path(__file__).resolve().parents[1]
        for page in (root / 'journal').rglob('*.html'):
            with self.subTest(page=page.relative_to(root)):
                parser = JournalStructure()
                parser.feed(page.read_text(encoding='utf-8'))
                self.assertEqual(parser.errors, [])
                self.assertEqual(parser.nav_depth, 0)
