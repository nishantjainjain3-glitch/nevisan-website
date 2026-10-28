"""Publish content/product-catalog.json after checking listings/physical packs.

This command has no network access or automatic marketplace repricing.
"""
from html import escape
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CATALOG = json.loads((ROOT / 'content/product-catalog.json').read_text(encoding='utf-8'))
PRODUCTS = CATALOG['products']
BY_HANDLE = {p['handle']: p for p in PRODUCTS}
BY_NAME = {p['name']: p for p in PRODUCTS}
CAFFEINE = 'This tea contains caffeine. The amount in your cup depends on the leaf, serving size and how you brew it. Herbs, flowers and flavouring do not make a green-tea blend caffeine-free.'


def brewing(p):
    b = p['brew']
    return f"Use {b['leaves']} with fresh, filtered water at {b['water']}. Steep for {b['time']}, then strain. Follow the current pouch instructions first and adjust to taste."


def faqs(p):
    return [
        (f"What is in {p['name']}?", p['ingredients'] + ' Refer to the current pouch for the complete ingredient declaration.'),
        (f"Does {p['name']} contain caffeine?", CAFFEINE),
        (f"How do I brew {p['name']}?", brewing(p)),
    ]


def schema(text, transform):
    def replace(m):
        data = json.loads(m[2])
        transform(data)
        return m[1] + '\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n' + m[3]
    return re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', replace, text, flags=re.S)


def product_entity(entity, p):
    entity['name'] = 'Nevisan ' + p['name']
    entity['description'] = p['description']
    entity['offers']['price'] = str(p['price'])
    entity['weight'] = {'@type': 'QuantitativeValue', 'value': p['net_weight_g'], 'unitCode': 'GRM'}


def write(path, text):
    path.write_text(text, encoding='utf-8')


def main():
    for p in PRODUCTS:
        path = ROOT / 'products' / p['handle'] / 'index.html'
        text = path.read_text(encoding='utf-8')
        title = p['name'] + ' | 50g Whole-Leaf Assam Tea | Nevisan'
        text = re.sub(r'<title>.*?</title>', '<title>' + escape(title) + '</title>', text)
        for attr, key, value in [('name', 'description', p['description']), ('property', 'og:title', title), ('property', 'og:description', p['description']), ('name', 'twitter:title', title), ('name', 'twitter:description', p['description'])]:
            text = re.sub(fr'(<meta {attr}="{key}" content=")[^"]*(">)', lambda m: m[1] + escape(value, quote=True) + m[2], text)
        text = re.sub(r'(<div class="product-price"><strong>)₹\d+', lambda m: m[1] + f"₹{p['price']}", text)
        text = re.sub(r'(<div class="sticky-price">\s*)₹\d+', lambda m: m[1] + f"₹{p['price']}", text)
        text = re.sub(r'<p><strong>Ingredients:</strong>.*?</p>', '<p><strong>Ingredients:</strong> ' + escape(p['ingredients']) + ' Refer to your current pouch for the complete ingredient declaration.</p>', text)
        for label, value in [('Water', p['brew']['water']), ('Leaves', p['brew']['leaves']), ('First steep', p['brew']['time'])]:
            text = re.sub(fr'(<dt>{label}</dt><dd>).*?(</dd>)', lambda m: m[1] + escape(value) + m[2], text)
        old_caffeine = 'This tea contains caffeine. The amount in your cup depends on the leaf, serving size and how you brew it.'
        if CAFFEINE not in text:
            text = text.replace(old_caffeine, CAFFEINE)
        text = re.sub(r'(<strong>Maximum Retail Price \(MRP\):</strong> )₹\d+', lambda m: m[1] + f"₹{p['mrp']}", text)
        text = re.sub(r'(<strong>Manufactured by:</strong> )[^,<]+', lambda m: m[1] + escape(p['manufacturer']), text)
        questions = faqs(p)
        def update(data):
            if data.get('@type') == 'Product':
                product_entity(data, p)
            if data.get('@type') == 'FAQPage':
                data['mainEntity'] = [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in questions]
        text = schema(text, update)
        faq_block = '<section class="product-section product-faq" id="product-questions"><h2>About this tea</h2>' + ''.join('<details class="packaging-detail"><summary>' + escape(q) + '</summary><p>' + escape(a) + '</p></details>' for q, a in questions) + '</section>'
        # Copied testimonials without source evidence are replaced with visible
        # product facts; the original content remains recoverable in Git history.
        text, replaced = re.subn(r'<section class="product-section product-reviews".*?</section>', faq_block, text, flags=re.S)
        if not replaced:
            text = re.sub(r'<section class="product-section product-faq".*?</section>', faq_block, text, flags=re.S)
        write(path, text)

    app_path = ROOT / 'app.js'
    app = app_path.read_text(encoding='utf-8')
    match = re.search(r'const TEAS = (\[.*?\]);', app, re.S)
    teas = json.loads(match[1])
    for tea in teas:
        p = BY_NAME[tea['name']]
        tea['price'] = p['price']
        tea['brew'] = p['brew']['water'] + ' · ' + p['brew']['time'] + ' · ' + p['brew']['leaves']
        tea.pop('bestseller', None)
    app = app[:match.start(1)] + json.dumps(teas, ensure_ascii=False, indent=2) + app[match.end(1):]
    write(app_path, app)
    checkout = [{'handle': p['handle'], 'title': 'Nevisan ' + p['name'], 'price': p['price']} for p in PRODUCTS]
    write(ROOT / 'checkout/catalog.js', 'window.NEVISAN_TEAS = ' + json.dumps(checkout, ensure_ascii=False, indent=2) + ';\n')

    home_path = ROOT / 'index.html'
    home = home_path.read_text(encoding='utf-8')
    def home_schema(data):
        for entity in data.get('@graph', []):
            if entity.get('@type') == 'Product':
                product_entity(entity, BY_HANDLE[entity['url'].rstrip('/').split('/')[-1]])
    home = schema(home, home_schema).replace('app.js?v=89', 'app.js?v=90')
    write(home_path, home)
    checkout_path = ROOT / 'checkout/index.html'
    write(checkout_path, checkout_path.read_text(encoding='utf-8').replace('catalog.js?v=1', 'catalog.js?v=2'))

    brew_path = ROOT / 'how-to-brew/index.html'
    guide = brew_path.read_text(encoding='utf-8')
    def blend_row(m):
        p = BY_HANDLE[m[2]]
        return m[1] + ''.join('<td>' + escape(p['brew'][key]) + '</td>' for key in ['water', 'leaves', 'time']) + '</tr>'
    guide = re.sub(r'(<tr><th scope="row"><a href="/products/([^"]+)/">.*?</a></th>)(?:<td>.*?</td>){3}</tr>', blend_row, guide)
    write(brew_path, guide)
    minimum, maximum = min(p['price'] for p in PRODUCTS), max(p['price'] for p in PRODUCTS)
    for name in ['faq/index.html', 'terms-of-service.html']:
        path = ROOT / name
        text = path.read_text(encoding='utf-8')
        text = re.sub(r'between ₹\d+ and ₹\d+', f'between ₹{minimum} and ₹{maximum}', text)
        text = re.sub(r'from ₹\d+ to ₹\d+', f'from ₹{minimum} to ₹{maximum}', text)
        if name.startswith('faq/'):
            text = text.replace('id="faq-status" aria-live="polite">40 questions', 'id="faq-status" aria-live="polite">43 questions')
        write(path, text)
    cost_path = ROOT / 'journal/the-real-cost-of-cheap-tea-bags/index.html'
    cost_text = cost_path.read_text(encoding='utf-8')
    price = BY_HANDLE['organic-green-tea']['price']
    example = f'A 50g pouch gives about 20–25 first servings when you use 2–2.5g per cup. At the current Organic Green Tea selling price of ₹{price}, that is approximately ₹{price/25:.2f}–₹{price/20:.2f} per first serving. Direct orders include free shipping. This example uses the displayed selling price, not the ₹499 MRP; check the product page for the current price. Using more leaf gives fewer servings.'
    cost_text = re.sub(r'<p(?: id="cost-example")?>A 50g pouch.*?</p>', '<p id="cost-example">' + example + '</p>', cost_text)
    cost_text = cost_text.replace('Updated 5 October 2026', 'Updated 28 October 2026')
    write(cost_path, cost_text)
    print(f'Synchronized {len(PRODUCTS)} products, checkout, collection, structured data and brewing guide.')


if __name__ == '__main__':
    main()
