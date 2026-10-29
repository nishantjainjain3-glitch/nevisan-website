"""Keep real product discovery in the homepage's initial HTML before React loads."""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
START, END = '<!-- static-collection:start -->', '<!-- static-collection:end -->'

def build():
    products = json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']
    cards = ''.join('<article class="polish-card"><h3><a href="/products/' + p['handle'] + '/">' + escape(p['name']) + '</a></h3><p>' + escape(p['flavour']) + '</p><p>50g · MRP ₹' + str(p['mrp']) + '</p><a href="/products/' + p['handle'] + '/">Explore this tea ↗</a></article>' for p in products)
    block = START + '<section class="lux-collection" aria-labelledby="static-collection-title"><div style="max-width:1240px;margin:auto"><h2 id="static-collection-title">Whole-leaf Assam green and oolong teas</h2><p>Ten teas, each in a 50g packet. Compare flavours, ingredients, caffeine and brewing instructions to find your next cup.</p><p><a href="/compare/">Compare all ten teas ↗</a> · <a href="/how-to-brew/">Brewing guide ↗</a></p><div class="lux-collection__grid">' + cards + '</div></div></section>' + END
    path = ROOT/'index.html'
    text = path.read_text(encoding='utf-8')
    if START in text:
        text = re.sub(re.escape(START) + '.*?' + re.escape(END), lambda _: block, text, flags=re.S)
    else:
        text = text.replace('  <div id="root">', '  <div id="root"><main id="main-content" class="nevisan-home">')
        text = re.sub(r'\s*<noscript><p style="padding:24px;text-align:center">Explore our.*?</noscript>', '\n' + block + '\n</main>', text, flags=re.S)
    path.write_text(text, encoding='utf-8')

if __name__ == '__main__':
    build()
