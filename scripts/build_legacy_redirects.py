"""Preserve published URLs found in Search Console on static hosting.

GitHub Pages cannot configure HTTP redirects. An immediate meta refresh is
Google's supported permanent-redirect fallback; only the destination is canonical.
"""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
REDIRECTS = {
    'quiz.html': '/quiz/',
    'journal/tulsi-green-tea-adaptogen.html': '/journal/tulsi-green-tea-adaptogen/',
    'journal/blue-butterfly-pea-flower-tea.html': '/journal/blue-butterfly-pea-flower-tea/',
    'journal/assam-whole-leaf-tea-guide.html': '/journal/assam-whole-leaf-tea-guide/',
    'journal/science-behind-gaba-tea.html': '/journal/science-behind-gaba-tea/',
}

def build():
    for source, destination in REDIRECTS.items():
        assert (ROOT / destination.lstrip('/') / 'index.html').is_file(), destination
        url = 'https://nevisan.in' + destination
        (ROOT / source).write_text(f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page moved | Nevisan Tea</title>
  <link rel="canonical" href="{escape(url)}">
  <meta http-equiv="refresh" content="0; url={escape(url)}">
</head>
<body><p>This Nevisan page has moved. <a href="{escape(url)}">Continue to the current page</a>.</p></body>
</html>
''', encoding='utf-8')
    print(f'Built {len(REDIRECTS)} legacy URL redirects.')

if __name__ == '__main__':
    build()
