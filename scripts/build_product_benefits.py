"""Add sourced, bounded reasons to choose each tea without changing pack assets."""
from pathlib import Path
from html import escape
import json
import re

ROOT=Path(__file__).resolve().parents[1]
START='<!-- why-choose:start -->'
END='<!-- why-choose:end -->'

def build():
    content=json.loads((ROOT/'content/product-benefits.json').read_text(encoding='utf-8'))
    catalog=json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']
    assert set(content['products'])=={p['handle'] for p in catalog}
    for product in catalog:
        data=content['products'][product['handle']]
        health=''
        if data.get('health'):
            item=data['health']; source=item['source']
            health='<div class="tea-health" aria-labelledby="ingredient-health-title"><p class="lux-eyebrow">POTENTIAL HEALTH BENEFITS · INGREDIENT RESEARCH</p><h3 id="ingredient-health-title">'+escape(item['title'])+'</h3><p class="tea-evidence-level">'+escape(item['level'])+'</p><p>'+escape(item['finding'])+'</p><p><strong>What this means for your cup: </strong>'+escape(item['limits'])+'</p><p>These are findings about the studied ingredients or preparations, not clinically established benefits of this Nevisan blend.</p><a href="'+escape(source['url'],quote=True)+'" target="_blank" rel="noopener">'+escape(source['label'])+' ↗</a></div>'
        cards=''.join('<div class="tea-reason"><h3>'+escape(item['title'])+'</h3><p>'+escape(item['text'])+'</p></div>' for item in data['benefits'])
        research=''
        if data.get('research'):
            item=data['research']
            links=''.join('<li><a href="'+escape(s['url'],quote=True)+'" target="_blank" rel="noopener">'+escape(s['label'])+' ↗</a></li>' for s in item['sources'])
            research='<details class="tea-research"><summary>Ingredient research &amp; its limits</summary><div><h3>'+escape(item['title'])+'</h3><p>'+escape(item['text'])+'</p><ul>'+links+'</ul><p class="tea-research-date">Research checked 31 October 2026. These sources concern the stated ingredients or preparations, not clinical testing of this Nevisan blend.</p></div></details>'
        elif data.get('note'):
            research='<p class="tea-choice-note">'+escape(data['note'])+'</p>'
        block=START+'<section class="product-section tea-why-choose" id="why-choose" aria-labelledby="why-choose-title"><p class="lux-eyebrow">A CUP THAT FITS YOU</p><h2 id="why-choose-title">Why choose this tea?</h2><p class="tea-choice-intro">'+escape(data['intro'])+'</p><div class="tea-reasons">'+cards+'</div>'+research+'<p class="tea-choice-note">Contains caffeine. Choose by ingredients, flavour and your own caffeine needs. Tea is a food and drink; it is not a replacement for medical care.</p><a class="tea-compare-link" href="/compare/">Compare all ten teas →</a></section>'+END
        block=block.replace('<div class="tea-reasons">',health+'<div class="tea-reasons">',1)
        path=ROOT/'products'/product['handle']/'index.html'
        text=path.read_text(encoding='utf-8').replace('/product-benefits.css?v=1','/product-benefits.css?v=2')
        if START in text:
            text=re.sub(re.escape(START)+'.*?'+re.escape(END),lambda _:block,text,flags=re.S)
        else:
            anchor='<section class="product-section"><h2>Make it your ritual</h2>'
            assert text.count(anchor)==1,product['handle']
            text=text.replace(anchor,block+'\n'+anchor,1)
        if '/product-benefits.css?v=2' not in text:
            text=text.replace('</head>','<link rel="stylesheet" href="/product-benefits.css?v=2">\n</head>')
        path.write_text(text,encoding='utf-8')
    sitemap=ROOT/'sitemap.xml'
    text=sitemap.read_text(encoding='utf-8')
    text=re.sub(r'<url>.*?</url>',lambda m:re.sub(r'<lastmod>.*?</lastmod>','<lastmod>'+content['reviewed_at']+'</lastmod>',m[0]) if '<loc>https://nevisan.in/products/' in m[0] else m[0],text,flags=re.S)
    sitemap.write_text(text,encoding='utf-8')
    print('Updated Why choose this tea on all ten product pages.')

if __name__=='__main__':build()
