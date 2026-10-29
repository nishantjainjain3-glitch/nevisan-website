"""Build the public comparison from the verified catalogue, without network access."""
from html import escape
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]

def build():
    products = json.loads((ROOT / 'content/product-catalog.json').read_text(encoding='utf-8'))['products']
    template = (ROOT / 'how-to-brew/index.html').read_text(encoding='utf-8')
    title = 'Compare All 10 Teas | Flavour, Ingredients & Brewing | Nevisan'
    description = 'Compare all ten Nevisan 50g teas by flavour, ingredients, caffeine and brewing instructions. Find your next whole-leaf Assam tea.'
    template = re.sub(r'<title>.*?</title>', '<title>' + escape(title) + '</title>', template)
    for name in ['description', 'og:description']:
        template = re.sub(r'(<meta (?:name|property)="' + name + r'" content=")[^"]*', lambda m: m[1] + escape(description, quote=True), template)
    template = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m[1] + escape(title, quote=True), template)
    template = template.replace('https://nevisan.in/how-to-brew/', 'https://nevisan.in/compare/')
    rows = []
    for p in products:
        e = escape
        b = p['brew']
        cells = [
            '<th scope="row"><a href="/products/' + p['handle'] + '/">' + e(p['name']) + ' <span aria-hidden="true">↗</span></a><small>50g · MRP ₹' + str(p['mrp']) + '</small></th>',
            '<td data-label="Flavour">' + e(p['flavour']) + '</td>',
            '<td data-label="Ingredients">' + e(p['ingredients']) + '</td>',
            '<td data-label="Caffeine"><span class="compare-caffeine">Contains caffeine</span></td>',
            '<td data-label="Brewing"><strong>' + e(b['water']) + '</strong><br>' + e(b['leaves']) + '<br>Steep ' + e(b['time']) + ', then strain.</td>'
        ]
        rows.append('<tr id="' + p['handle'] + '">' + ''.join(cells) + '</tr>')
    main = '''<main id="main-content" class="tea-compare">
<header class="compare-hero"><p class="compare-eyebrow">ONE ORIGIN. TEN EXPRESSIONS.</p><h1>Find your kind of cup.</h1><p>Compare all ten whole-leaf Assam teas. Start with the flavours you enjoy, then explore the ingredients and your first brew.</p><p class="compare-price">Every packet is 50g · MRP ₹499, inclusive of all taxes.</p><nav class="compare-jumps" aria-label="Flavour starting points"><a href="#spearmint-green-tea">Minty &amp; fresh</a><a href="#blue-flower-green-tea">Soft &amp; floral</a><a href="#ginger-green-tea">Warming &amp; spiced</a><a href="#organic-green-tea">Plain green tea</a><a href="#gaba-oolong-tea">Toasty oolong</a></nav></header>
<aside class="compare-note" aria-label="Caffeine and brewing information"><strong>All ten teas contain caffeine.</strong> Chamomile, mint and other added herbs do not make a green-tea blend caffeine-free. Caffeine varies with the leaf, serving size and brewing; we do not publish unverified milligram amounts. Follow the current pouch instructions first, then adjust to taste.</aside>
<table class="compare-table"><caption>Nevisan tea comparison — flavour, ingredients, caffeine and starting brewing instructions</caption><thead><tr><th scope="col">Tea</th><th scope="col">Flavour</th><th scope="col">Ingredients</th><th scope="col">Caffeine</th><th scope="col">Brewing</th></tr></thead><tbody>''' + ''.join(rows) + '''</tbody></table>
<section class="compare-next"><h2>Ready for your first cup?</h2><p>Select a tea name above for its product page, or use our quiz for a flavour suggestion. Rum and Whiskey teas are non-alcoholic flavoured green teas.</p><a href="/quiz/">Take the tea quiz ↗</a><a href="/how-to-brew/">Read the brewing guide ↗</a><a href="/checkout/">Choose your 50g packets ↗</a></section></main>'''
    template = re.sub(r'<main\b.*?</main>', lambda _: main, template, flags=re.S)
    template = template.replace('</head>', '<link rel="stylesheet" href="/tea-comparison.css?v=1">\n</head>')
    target = ROOT / 'compare/index.html'
    target.parent.mkdir(exist_ok=True)
    target.write_text(template, encoding='utf-8')

if __name__ == '__main__':
    build()
