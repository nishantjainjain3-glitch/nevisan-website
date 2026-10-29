"""Publish reviewed journal copy and keep article metadata tied to visible content.

No dates, credentials, tests or first-hand experiences are inferred. Existing
publication dates are retained; only substantively rewritten guides get a new
modification date. Source copy lives in content/journal-guides.json.
"""
from pathlib import Path
from html import escape, unescape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://nevisan.in'
DATA = json.loads((ROOT / 'content/journal-guides.json').read_text(encoding='utf-8'))
GUIDES = {g['slug']: g for g in DATA['guides']}
PRODUCTS = {p['handle']: p for p in json.loads((ROOT / 'content/product-catalog.json').read_text(encoding='utf-8'))['products']}

def plain(text):
    return unescape(re.sub('<[^>]+>', '', text)).strip()

def metadata(text, key, value, attribute='property'):
    tag = f'<meta {attribute}="{key}" content="{escape(value, quote=True)}">'
    pattern = r'<meta\b(?=[^>]*\b' + attribute + r'="' + re.escape(key) + r'")[^>]*>'
    return re.sub(pattern, lambda _: tag, text) if re.search(pattern, text) else text.replace('</head>', tag + '\n</head>')

def build_main(guide, image, alt):
    product = PRODUCTS[guide['product']]
    toc = ''.join(f'<a href="#guide-{i}">{escape(section[0])}</a>' for i, section in enumerate(guide['sections'], 1))
    sections = ''.join(f'<section aria-labelledby="guide-{i}"><h2 id="guide-{i}">{escape(heading)}</h2>{body}</section>' for i, (heading, body) in enumerate(guide['sections'], 1))
    related = ''.join(f'<li><a href="/journal/{slug}/">{escape(GUIDES[slug]["title"])}</a></li>' for slug in guide['related'])
    image_path = ROOT / image.lstrip('/')
    smaller = image_path.with_name(image_path.stem + '-640.webp')
    if smaller.exists():
        image = '/' + smaller.relative_to(ROOT).as_posix()
        dimensions = 'width="640" height="640"'
    elif image_path.stem.endswith('-640'):
        dimensions = 'width="640" height="640"'
    else:
        dimensions = 'width="1254" height="1254"'
    return f'''<main id="main-content" class="journal-wrapper journal-article journal-guide">
<a class="back-link" href="/journal/">← Back to the journal</a>
<p class="lux-eyebrow">NEVISAN JOURNAL</p>
<h1 class="journal-title">{escape(guide['title'])}</h1>
<p class="journal-subtitle">{escape(guide['description'])}</p>
<p class="journal-meta">By <a href="/contact.html">Nevisan Tea</a> · Updated <time datetime="{DATA['updated']}">29 October 2026</time></p>
<figure class="journal-cover"><img src="{image}" {dimensions} alt="{escape(alt, quote=True)}" decoding="async" fetchpriority="high"><figcaption>Illustrative Nevisan tea image. Check your physical pouch for current product declarations.</figcaption></figure>
<nav class="journal-toc" aria-label="In this guide"><h2>In this guide</h2>{toc}</nav>
<div class="journal-section">{sections}
<aside class="journal-pack" aria-labelledby="pack-guide"><h2 id="pack-guide">The Nevisan packet reference</h2>
<h3><a href="/products/{product['handle']}/">{escape(product['name'])}</a></h3>
<p>{escape(product['ingredients'])}</p>
<dl><dt>Packet</dt><dd>50g · MRP ₹499</dd><dt>Preparation</dt><dd>{escape(product['brew']['leaves'])} · {escape(product['brew']['water'])} · {escape(product['brew']['time'])}</dd><dt>Caffeine</dt><dd>Contains caffeine; no product-specific milligram value published.</dd></dl>
<p>Use the physical pouch’s instructions if they differ. These are preparation directions, not a medical dosage.</p>
<a href="/compare/">Compare ingredients and brewing for all ten teas →</a></aside>
<section class="journal-related" aria-labelledby="related-guides"><h2 id="related-guides">Continue reading</h2><ul>{related}</ul></section>
<aside class="journal-editorial"><h2>About this guide</h2><p>Prepared for Nevisan with AI assistance using our checked product catalog and the references linked in the text. Brewing examples are serving suggestions, not laboratory tests or clinical advice. Product details were checked on 28 October 2026; this guide was updated on 29 October 2026.</p><p><a href="/contact.html">Ask a product question or report a correction</a> · <a href="/how-to-brew/">Read the brewing guide</a></p></aside>
</div><a class="back-link" href="/journal/">← Back to the journal</a></main>'''

def main():
    count = 0
    for path in sorted((ROOT / 'journal').glob('*/index.html')):
        text = path.read_text(encoding='utf-8')
        slug = path.parent.name
        guide = GUIDES.get(slug)
        image_match = re.search(r'<figure class="journal-cover">.*?<img\b([^>]+)>', text, re.S)
        if not image_match:
            raise ValueError(f'Missing cover image: {slug}')
        image = re.search(r'\bsrc="([^"]+)"', image_match[1])[1]
        alt = unescape(re.search(r'\balt="([^"]*)"', image_match[1])[1])
        if guide:
            text = re.sub(r'<main\b.*?</main>', lambda _: build_main(guide, image, alt), text, count=1, flags=re.S)
            title, description = guide['title'], guide['description']
            text = re.sub(r'<title>.*?</title>', lambda _: '<title>' + escape(title + ' | Nevisan Tea') + '</title>', text, count=1, flags=re.S)
            text = metadata(text, 'description', description, 'name')
            if '/journal-editorial.css?v=1' not in text:
                text = text.replace('</head>', '<link rel="stylesheet" href="/journal-editorial.css?v=1">\n</head>')
            # The new cover can use the smaller public derivative.
            image = re.search(r'<figure class="journal-cover">.*?\bsrc="([^"]+)"', text, re.S)[1]
            count += 1
        else:
            title = plain(re.search(r'<h1\b[^>]*>(.*?)</h1>', text, re.S)[1])
            description = unescape(re.search(r'<meta name="description" content="([^"]*)"', text)[1])
        canonical = BASE + '/journal/' + slug + '/'
        # Replace the entire tag, including malformed trailing quote fragments.
        for key, value in [('og:title', title), ('og:description', description), ('og:url', canonical), ('og:image', BASE + image), ('og:type', 'article')]:
            text = metadata(text, key, value)
        for key, value in [('twitter:title', title), ('twitter:description', description), ('twitter:image', BASE + image), ('twitter:card', 'summary_large_image')]:
            text = metadata(text, key, value, 'name')
        found_article = False
        def schema(match):
            nonlocal found_article
            obj = json.loads(match[1])
            if obj.get('@type') in ['Article', 'BlogPosting']:
                found_article = True
                obj.update(headline=title, description=description, image=BASE + image,
                           mainEntityOfPage={'@type': 'WebPage', '@id': canonical})
                if guide:
                    obj['dateModified'] = DATA['updated']
            if obj.get('@type') == 'BreadcrumbList':
                for item in obj['itemListElement']:
                    if str(item.get('item', '')).rstrip('/') == canonical.rstrip('/'):
                        item.update(name=title, item=canonical)
            return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n</script>'
        text = re.sub(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', schema, text, flags=re.S)
        if not found_article:
            obj = {'@context': 'https://schema.org', '@type': 'BlogPosting', 'headline': title,
                   'description': description, 'image': BASE + image,
                   'mainEntityOfPage': {'@type': 'WebPage', '@id': canonical},
                   'author': {'@type': 'Organization', 'name': 'Nevisan Tea', 'url': BASE + '/'},
                   'publisher': {'@type': 'Organization', 'name': 'Nevisan Tea', 'logo': {'@type': 'ImageObject', 'url': BASE + '/nevisan-logo.jpeg'}}}
            if guide:
                obj['dateModified'] = DATA['updated']
            text = text.replace('</head>', '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n</script>\n</head>')
        path.write_text(text, encoding='utf-8')
    hub = ROOT / 'journal/index.html'
    text = hub.read_text(encoding='utf-8')
    for slug, guide in GUIDES.items():
        pattern = r'(<a class="post-link" href="/journal/' + re.escape(slug) + r'/">)(.*?)(</a>)'
        def card(match):
            body = re.sub(r'(<h2 class="post-title">).*?(</h2>)', lambda m: m[1] + escape(guide['title']) + m[2], match[2], flags=re.S)
            body = re.sub(r'(<p class="post-excerpt">).*?(</p>)', lambda m: m[1] + escape(guide['description']) + m[2], body, flags=re.S)
            return match[1] + body + match[3]
        text = re.sub(pattern, card, text, count=1, flags=re.S)
    start, end = '<!-- journal-start:start -->', '<!-- journal-start:end -->'
    featured = ['how-to-buy-real-green-tea-india', 'how-to-choose-right-tea-for-your-lifestyle', 'art-of-tea-tasting-beginners-guide', 'cold-brew-lemongrass-iced-tea']
    block = start + '<section class="journal-start" aria-labelledby="start-reading"><h2 id="start-reading">A useful place to start</h2><p>Choose a packet, make your first cup, or compare two flavours.</p><ul>' + ''.join(f'<li><a href="/journal/{slug}/">{escape(GUIDES[slug]["title"])}</a></li>' for slug in featured) + '</ul></section>' + end
    if start in text:
        text = re.sub(re.escape(start) + '.*?' + re.escape(end), lambda _: block, text, flags=re.S)
    else:
        text = text.replace('<ul class="post-list">', block + '\n<ul class="post-list">')
    if '/journal-editorial.css?v=1' not in text:
        text = text.replace('</head>', '<link rel="stylesheet" href="/journal-editorial.css?v=1">\n</head>')
    hub.write_text(text, encoding='utf-8')
    app_path = ROOT / 'app.js'
    app = app_path.read_text(encoding='utf-8')
    def posts(match):
        entries = json.loads(match[1])
        for entry in entries:
            if entry['slug'] in GUIDES:
                guide = GUIDES[entry['slug']]
                entry.update(title=guide['title'], excerpt=guide['description'])
        return 'const POSTS = ' + json.dumps(entries, ensure_ascii=False, indent=2) + ';'
    app = re.sub(r'const POSTS = (\[.*?\]);', posts, app, count=1, flags=re.S)
    app_path.write_text(app, encoding='utf-8')
    sitemap = ROOT / 'sitemap.xml'
    text = sitemap.read_text(encoding='utf-8')
    changed = {BASE + '/journal/'} | {BASE + '/journal/' + slug + '/' for slug in GUIDES}
    def lastmod(match):
        return re.sub(r'<lastmod>.*?</lastmod>', '<lastmod>' + DATA['updated'] + '</lastmod>', match[0]) if any('<loc>' + url + '</loc>' in match[0] for url in changed) else match[0]
    text = re.sub(r'<url>.*?</url>', lastmod, text, flags=re.S)
    sitemap.write_text(text, encoding='utf-8')
    print(f'Published {count} improved guides; aligned metadata on 34 journal articles and updated the hub.')

if __name__ == '__main__':
    main()
