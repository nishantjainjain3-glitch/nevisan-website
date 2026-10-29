"""Apply Nevisan's shared, static navigation and visual system to customer pages."""
from pathlib import Path
import re
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
START, END = '<!-- nevisan-brand-header:start -->', '<!-- nevisan-brand-header:end -->'
FOOT_START, FOOT_END = '<!-- nevisan-brand-footer:start -->', '<!-- nevisan-brand-footer:end -->'
LINKS = [('Collection', '/#collection'), ('Compare teas', '/compare/'), ('Our Assam story', '/#about'), ('How to brew', '/how-to-brew/'), ('Journal', '/journal/'), ('Wholesale', '/bulk/'), ('Delivery & locations', '/locations/'), ('Questions & answers', '/faq/'), ('Contact', '/contact.html')]

def header():
    links = ''.join(f'<a href="{url}">{label}</a>' for label, url in LINKS)
    return START + '''<a class="brand-skip" href="#main-content">Skip to content</a><nav class="brand-header" aria-label="Main navigation"><div class="brand-header__inner"><a class="brand-wordmark" href="/" aria-label="Nevisan Tea home"><img src="/brand-mark-96.webp" width="36" height="36" alt=""><span>NEVISAN</span></a><div class="brand-header__links"><a href="/#collection">Collection</a><a href="/compare/">Compare teas</a><a href="/#about">Our Assam story</a></div><div class="brand-header__actions"><a class="brand-order" href="/checkout/">Shop teas</a><details class="brand-menu"><summary aria-label="More navigation">Menu <span aria-hidden="true">☰</span></summary><div class="brand-menu__panel">''' + links + '</div></details></div></div></nav>' + END

def footer():
    return FOOT_START + '''<footer class="brand-footer"><div class="brand-footer__inner"><div class="brand-footer__story"><a class="brand-wordmark" href="/" aria-label="Nevisan Tea home"><img src="/brand-mark-96.webp" width="36" height="36" alt=""><span>NEVISAN</span></a><p>Whole-leaf Assam tea.<br>A ritual of your own.</p><p>Packed and marketed by Mahabir Enterprise, Guwahati, Assam.</p></div><div><h2>Find your tea</h2><a href="/#collection">The collection</a><a href="/compare/">Compare all ten teas</a><a href="/quiz/">Tea finder quiz</a><a href="/how-to-brew/">Brewing guide</a></div><div><h2>Here to help</h2><a href="/terms-of-service.html#order-updates">Payment & tracking help</a><a href="/terms-of-service.html#shipping">Delivery information</a><a href="/terms-of-service.html#returns">No returns & product support</a><a href="/bulk/">Wholesale enquiries</a><a href="/faq/">Questions & answers</a></div><div><h2>Talk to Nevisan</h2><a href="https://wa.me/919864245687">WhatsApp +91 98642 45687</a><a href="mailto:care@nevisan.in">care@nevisan.in</a><a href="https://www.instagram.com/nevisan.tea/">Instagram</a><a href="/contact.html">Contact & business details</a><a href="/reviews/">Tea notes & reviews</a></div></div><div class="brand-footer__bottom"><span>© 2026 Nevisan Tea · Mahabir Enterprise</span><div><a href="/terms-of-service.html">Terms</a><a href="/privacy-policy.html">Privacy</a></div><span>Marketer FSSAI 10325001000313 · GSTIN 18AFAPJ8203P1Z7</span></div></footer>''' + FOOT_END

def main():
    count = 0
    for path in ROOT.rglob('*.html'):
        if any(p in {'.git', '.agents', 'node_modules', 'oauth'} for p in path.relative_to(ROOT).parts):
            continue
        text = path.read_text(encoding='utf-8')
        if '<main' not in text and path not in [ROOT / 'index.html', ROOT / 'quiz/index.html']:
            continue
        page_header = header()
        if path.parent.parent == ROOT / 'products':
            selection = quote('[{"handle":"' + path.parent.name + '","quantity":1}]', safe='')
            page_header = page_header.replace('class="brand-order" href="/checkout/"', 'data-nevisan-order class="brand-order" href="/checkout/?items=' + selection + '"')
        text = re.sub(r'<a\b[^>]*class="skip-link"[^>]*>.*?</a>', '', text, flags=re.S)
        # Existing navigation scripts may remain, but their old drawers are inert.
        if START in text:
            text = re.sub(re.escape(START) + '.*?' + re.escape(END), lambda _: page_header, text, flags=re.S)
        else:
            text = re.sub(r'<nav\b(?=[^>]*aria-label="Main navigation")[^>]*>.*?</nav>', '', text, flags=re.S)
            if path == ROOT / 'checkout/index.html':
                text = re.sub(r'(<body[^>]*>)<header>.*?</header>', r'\1', text, count=1, flags=re.S)
            text = re.sub(r'(<body[^>]*>)', lambda m: m[1] + '\n' + page_header, text, count=1)
        if FOOT_START in text:
            text = re.sub(re.escape(FOOT_START) + '.*?' + re.escape(FOOT_END), lambda _: footer(), text, flags=re.S)
        elif '<footer' in text:
            text = re.sub(r'<footer\b.*?</footer>', lambda _: footer(), text, count=1, flags=re.S)
        else:
            text = text.replace('</body>', footer() + '\n</body>')
        def body_class(m):
            tag = m[0]
            if 'brand-unified' in tag:
                return tag
            return tag.replace('class="', 'class="brand-unified ', 1) if 'class="' in tag else tag[:-1] + ' class="brand-unified">'
        text = re.sub(r'<body\b[^>]*>', body_class, text, count=1)
        if path != ROOT / 'index.html':
            text = re.sub(r'<main(?![^>]*\bid=)', '<main id="main-content"', text, count=1)
        if path == ROOT / 'checkout/index.html':
            text = text.replace('class="brand-unified"', 'class="brand-unified brand-checkout"')
            text = text.replace(footer() + '</main>', '</main>' + footer())
        if '/brand-system.css?v=1' not in text:
            text = text.replace('</head>', '<link rel="stylesheet" href="/brand-system.css?v=1">\n<script src="/brand-shell.js?v=1" defer></script>\n</head>')
        if 'fonts.googleapis.com/css2' not in text:
            text = text.replace('</head>', '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">\n</head>')
        text = re.sub(r'<meta name="theme-color" content="[^"]*"\s*/?>\n?', '', text)
        text = text.replace('</head>', '<meta name="theme-color" content="#15271b">\n</head>')
        text = re.sub(r'(?m)^[ \t]+$', '', text)
        path.write_text(text, encoding='utf-8')
        count += 1
    print(f'Applied shared brand design to {count} customer pages.')

if __name__ == '__main__':
    main()
