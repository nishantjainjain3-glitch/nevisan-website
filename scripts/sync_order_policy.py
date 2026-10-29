"""Publish the shared ordering, delivery and no-returns wording on customer pages."""
from pathlib import Path
from html import escape, unescape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
POLICY = json.loads((ROOT / 'content/order-policy.json').read_text(encoding='utf-8'))
START, END = '<!-- nevisan-order-policy:start -->', '<!-- nevisan-order-policy:end -->'
FAQS = [
    ('How do I order directly through Nevisan Pay?', POLICY['ordering']),
    ('Where do you deliver and when will my order arrive?', POLICY['delivery']),
    ('Can I return my tea?', POLICY['returns']),
]

def block():
    sections = [('How to order', 'ordering'), ('Payment verification', 'verification'), ('Order confirmation', 'confirmation'), ('Dispatch', 'dispatch'), ('Tracking your parcel', 'tracking'), ('Delivery', 'delivery'), ('No returns', 'returns'), ('Order support', 'support'), ('Marketplace orders', 'marketplaces')]
    body = ''.join(f'<h2>{title}</h2><p>{escape(POLICY[key])}</p>' for title, key in sections)
    return START + '<aside class="nevisan-order-policy" aria-label="Ordering and delivery policy"><details><summary>Ordering, delivery &amp; no returns</summary>' + body + '<p><a href="/checkout/">Order with Nevisan Pay</a> · <a href="/terms-of-service.html#ordering">Read the full policy</a> · <a href="https://wa.me/919864245687">Contact Nevisan</a></p></details></aside>' + END

def update_schema(text, transform):
    def replace(match):
        data = json.loads(match[2])
        transform(data)
        return match[1] + json.dumps(data, ensure_ascii=False, indent=2) + match[3]
    return re.sub(r'(<script\b[^>]*type="application/ld\+json"[^>]*>)(.*?)(</script>)', replace, text, flags=re.S)

def main():
    terms_path = ROOT / 'terms-of-service.html'
    terms = terms_path.read_text(encoding='utf-8')
    updates = '<section id="order-updates"><h2>Order confirmation, payment review &amp; tracking</h2>' + ''.join('<h3>' + title + '</h3><p>' + escape(POLICY[key]) + '</p>' for title, key in [('Payment verification', 'verification'), ('Order confirmation', 'confirmation'), ('Dispatch', 'dispatch'), ('Tracking your parcel', 'tracking')]) + '</section>'
    if '<section id="order-updates">' in terms:
        terms = re.sub(r'<section id="order-updates">.*?</section>', lambda _: updates, terms, flags=re.S)
    else:
        terms = terms.replace('<h2 id="shipping">', updates + '\n<h2 id="shipping">')
    terms_path.write_text(terms, encoding='utf-8')
    faq_path = ROOT / 'faq/index.html'
    faq = faq_path.read_text(encoding='utf-8')
    # Fix older direct-channel descriptions in both visible text and structured data.
    faq = faq.replace('direct WhatsApp ordering', 'Nevisan Pay ordering')
    faq = faq.replace('Product pages link to Nevisan Pay ordering, Amazon and Flipkart. Choose the channel that suits you and confirm its current stock, delivery and return terms.', 'Product pages link to Nevisan Pay, Amazon and Flipkart. For direct orders, follow the Nevisan Pay steps below. Marketplace orders follow the selected marketplace’s delivery and return terms.')
    old_price = 'All 50g loose-leaf tea packs are priced between ₹279 and ₹449 depending on the blend, with live pricing matched to our Amazon store. All prices are fully inclusive of GST and applicable taxes, with complimentary pan-India delivery via India Post to any serviceable PIN code.'
    prices = [p['price'] for p in json.loads((ROOT / 'content/product-catalog.json').read_text(encoding='utf-8'))['products']]
    faq = faq.replace(old_price, f'The current 50g tea collection is priced between ₹{min(prices)} and ₹{max(prices)}, depending on the blend. Check the displayed price before paying. Direct website prices are in INR, include applicable taxes and include free shipping. International delivery arrangements must be confirmed before payment; marketplace prices and shipping terms are shown by the selected seller.')
    general_match = next(m for m in re.finditer(r'<section class="faq-section-block".*?</section>', faq, re.S) if 'Where can I order?' in m[0])
    general = general_match[0]
    for question, answer in FAQS:
        question_tag = f'<span class="s-text">{escape(question)}</span>'
        if question_tag in general:
            item_pattern = r'<details class="faq-item"><summary>' + re.escape(question_tag) + r'</summary><div class="answer">.*?</div></details>'
            item = '<details class="faq-item"><summary>' + question_tag + '</summary><div class="answer">' + escape(answer) + '</div></details>'
            general = re.sub(item_pattern, lambda _: item, general, flags=re.S)
        else:
            item = '<details class="faq-item"><summary><span class="s-text">' + escape(question) + '</span></summary><div class="answer">' + escape(answer) + '</div></details>'
            general = general.replace('</div></section>', item + '</div></section>')
    general = re.sub(r'(<span class="section-count">)\d+', lambda m: m[1] + str(general.count('<details class="faq-item">')), general)
    faq = faq[:general_match.start()] + general + faq[general_match.end():]
    counts = {}
    for section in re.findall(r'<section class="faq-section-block".*?</section>', faq, re.S):
        counts[re.search(r'data-cat="([^"]+)"', section)[1]] = section.count('<details class="faq-item">')
    counts['all'] = sum(counts.values())
    def badge(match):
        tag = match[0]
        category = re.search(r'data-filter="([^"]+)"', tag)[1]
        return re.sub(r'(<span class="pill-badge">)\d+', lambda m: m[1] + str(counts[category]), tag)
    faq = re.sub(r'<button class="filter-pill[^\"]*".*?</button>', badge, faq, flags=re.S)
    def faq_schema(data):
        if data.get('@type') == 'FAQPage':
            for question, answer in FAQS:
                existing = next((x for x in data['mainEntity'] if x['name'] == question), None)
                if existing: existing['acceptedAnswer']['text'] = answer
                else: data['mainEntity'].append({'@type':'Question','name':question,'acceptedAnswer':{'@type':'Answer','text':answer}})
    faq = update_schema(faq, faq_schema)
    faq_path.write_text(faq, encoding='utf-8')

    app_path = ROOT / 'app.js'
    app = app_path.read_text(encoding='utf-8')
    match = re.search(r'const frontFaqs = (\[.*?\]);', app, re.S)
    front = json.loads(match[1])
    for question, answer in FAQS:
        existing = next((x for x in front if x['q'] == question), None)
        if existing: existing['a'] = answer
        else: front.append({'q':question,'a':answer})
    app = app[:match.start(1)] + json.dumps(front, ensure_ascii=False, indent=2) + app[match.end(1):]
    app = app.replace('See all 40 questions', f'See all {counts["all"]} questions')
    app_path.write_text(app, encoding='utf-8')

    pages = 0
    for path in ROOT.rglob('*.html'):
        if any(part in {'.git','.agents','node_modules'} for part in path.relative_to(ROOT).parts): continue
        html = path.read_text(encoding='utf-8')
        if '<main' not in html and path != ROOT / 'index.html': continue
        html = re.sub(r'[ \t]*' + re.escape(START) + r'.*?' + re.escape(END) + r'\n?', '', html, flags=re.S)
        html = re.sub(r'(?m)^[ \t]+$', '', html)
        if '/order-policy.css?v=1' not in html:
            html = html.replace('</head>', '<link rel="stylesheet" href="/order-policy.css?v=1">\n</head>', 1)
        position = html.rfind('<footer')
        if position == -1: position = html.rfind('</body>')
        html = html[:position] + block() + '\n' + html[position:]
        if path == ROOT / 'index.html':
            def front_schema(data):
                for node in data.get('@graph', [data]):
                    if node.get('@type') == 'FAQPage':
                        node['mainEntity'] = [{'@type':'Question','name':x['q'],'acceptedAnswer':{'@type':'Answer','text':x['a']}} for x in front]
            html = update_schema(html, front_schema)
            html = html.replace('/app.js?v=88', '/app.js?v=89')
        path.write_text(html, encoding='utf-8')
        pages += 1
    print(f'Updated shared policy on {pages} customer pages; FAQ hub has {counts["all"]} questions.')

if __name__ == '__main__': main()
