"""Remove unverified pack mockups from commerce; publish labelled illustrations.

No image is retouched or presented as a real photograph. Reviewed existing
illustrations are copied unchanged; smaller web derivatives preserve aspect ratio.
Pillow is required only to rebuild those derivatives, not to serve the site.
"""
from pathlib import Path
from html import escape
import json
import re
import shutil

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'content/product-evidence.json').read_text(encoding='utf-8'))
NOTICE='Illustrative tea imagery, not a photograph of your current packet. Read the product declarations below; images are not certification evidence.'

def main():
    from PIL import Image
    target=ROOT/'teas/display'; target.mkdir(exist_ok=True)
    sizes={}
    for key,source in DATA['display_images'].items():
        original=ROOT/'teas/editorial'/f'{source}.webp'
        dest=target/f'{key}.webp'
        shutil.copyfile(original,dest)
        with Image.open(original) as im:
            sizes[key]=list(im.size)
            for suffix,width in [('-640',640),('-thumb',160)]:
                small=im.copy();small.thumbnail((width,width*2),Image.Resampling.LANCZOS)
                small.save(target/f'{key}{suffix}.webp','WEBP',quality=80,method=6)
    (target/'dimensions.json').write_text(json.dumps(sizes,indent=2)+'\n',encoding='utf-8')
    with Image.open(ROOT/'teas/editorial/gaba-ritual.webp') as im:
        small=im.copy();small.thumbnail((160,320),Image.Resampling.LANCZOS)
        small.save(target/'gaba-ritual-thumb.webp','WEBP',quality=80,method=6)
    # Only customer pages in the website; the requested reviews archive is untouched.
    for path in ROOT.rglob('*.html'):
        if any(part in {'.git','node_modules','.agents','reviews','oauth'} for part in path.relative_to(ROOT).parts):continue
        text=path.read_text(encoding='utf-8')
        if path.parent.parent==ROOT/'products' and path.name=='index.html':
            catalog=json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']
            product=next(p for p in catalog if p['handle']==path.parent.name)
            key=next(k for k in DATA['display_images'] if product['handle'].startswith(k+'-'))
            alternate={'gaba':'gaba-ritual','spearmint':'spearmint-cup','ginger':'ginger-ritual','organic':'organic-serving','tulsi':'tulsi-serving','chamomile':'chamomile-pour','lemongrass':'lemongrass-iced','rum':'rum-serving','whiskey':'whiskey-serving'}.get(key)
            views=[(f'/teas/display/{key}.webp',f'/teas/display/{key}-thumb.webp','Tea illustration')]
            if alternate:
                thumb=f'/teas/editorial/{alternate}-thumb.webp' if (ROOT/f'teas/editorial/{alternate}-thumb.webp').is_file() else f'/teas/display/{alternate}-thumb.webp'
                views.append((f'/teas/editorial/{alternate}.webp',thumb,'Serving illustration'))
            buttons=''.join(f'<button type="button" aria-label="{label}" aria-pressed="{str(i==0).lower()}" data-gallery-src="{src}" data-gallery-alt="{escape(product["name"])} — {label.lower()}"><img src="{thumb}" width="80" height="80" loading="lazy" alt=""><span>{label}</span></button>' for i,(src,thumb,label) in enumerate(views))
            text=re.sub(r'(<div\b[^>]*class="signature-gallery__thumbs"[^>]*>).*?(</div><p class="signature-gallery__caption">)',lambda m:m[1]+buttons+m[2],text,flags=re.S)
            def figure(view):
                src,_,label=view
                with Image.open(ROOT/src.lstrip('/')) as im: width,height=im.size
                return f'<figure><img src="{src}" width="{width}" height="{height}" loading="lazy" decoding="async" alt="{escape(product["name"])} — {label.lower()}"><figcaption>{label}; not a current packet photograph.</figcaption></figure>'
            figures=''.join(figure(view) for view in views)
            text=re.sub(r'(<div class="product-editorial">).*?(</div></section>)',lambda m:m[1]+figures+m[2],text,flags=re.S)
            text=re.sub(r'<button\b(?=[^>]*data-gallery-src="/teas/packaging/).*?</button>','',text,flags=re.S)
            text=re.sub(r'<section class="product-section"><h2>The back of the pouch</h2>.*?</section>','',text,flags=re.S)
            text=re.sub(r'<button\b(?=[^>]*data-gallery-src="/teas/editorial/blue-flower-cup.webp").*?</button>','',text,flags=re.S)
            text=re.sub(r'(<p class="signature-gallery__caption">).*?(</p>)',lambda m:m[1]+NOTICE+m[2],text,flags=re.S)
            note='<p class="product-evidence-note"><a href="/contact.html#product-information">Product images, licence details & organic documentation</a></p>'
            if 'class="product-evidence-note"' not in text:
                text=text.replace(NOTICE+'</p>',NOTICE+'</p>'+note,1)
            text=re.sub(r'(<figcaption>)(.*?)(</figcaption>)',lambda m:m[1]+m[2]+('' if 'illustrat' in m[2].lower() else ' (illustration)')+m[3],text,flags=re.S)
            text=text.replace('Mahabir Enterprise, Citi Point, G.S. Road, Guwahati, Assam - 781008','Mahabir Enterprise, Citi Point Market, Paltan Bazar, opposite ASTC Bus Stand, Guwahati, Assam 781008')
            if key=='gaba':
                text=re.sub(r'(<strong>Manufactured by:</strong> )GABA TEA PVT\. LTD\.[^<]*',r'\1GABA TEA PVT. LTD.',text)
        for key in DATA['display_images']:
            for suffix in ['-640','-thumb','']:
                text=text.replace(f'/teas/{key}-lifestyle{suffix}.webp',f'/teas/display/{key}{suffix}.webp')
            # The Blue Flower editorial cup includes the same unverified pack art.
            if key=='blue-flower':text=text.replace('/teas/editorial/blue-flower-cup.webp','/teas/display/blue-flower.webp')
        text=text.replace('pouch and tea scene','tea illustration').replace('pouch &amp; tea','tea illustration').replace('pouch & tea','tea illustration')
        text=text.replace('aria-label="Pouch &amp; tea"','aria-label="Tea illustration"').replace('aria-label="Pouch & tea"','aria-label="Tea illustration"')
        text=text.replace('>Pouch &amp; tea<','>Tea illustration<').replace('>Pouch & tea<','>Tea illustration<')
        def dimensions(m):
            tag=m[0]; src=re.search(r'\bsrc="/teas/display/([^"/]+)\.webp"',tag)
            if not src:return tag
            key=src[1].replace('-640','').replace('-thumb','')
            if key not in sizes:return tag
            width,height=sizes[key]
            if '-thumb' in src[1]:return tag
            if '-640' in src[1]:height=round(height*640/width);width=640
            tag=re.sub(r'\bwidth="\d+"',f'width="{width}"',tag)
            tag=re.sub(r'\bheight="\d+"',f'height="{height}"',tag)
            return tag
        text=re.sub(r'<img\b[^>]*>',dimensions,text)
        # Preserve each page's existing layout and markup outside these corrections.
        text=re.sub(r'(?m)^[ \t]+$','',text)
        path.write_text(text,encoding='utf-8')
    app_path=ROOT/'app.js';app=app_path.read_text(encoding='utf-8')
    for key in DATA['display_images']:app=app.replace(f'teas/{key}-lifestyle.webp',f'teas/display/{key}.webp')
    for old,new in {
        '"PGS-INDIA ORGANIC"':'"50G PACKETS"',
        '"FSSAI LICENSED"':'"INGREDIENTS LISTED"',
        '"FOOD SAFETY, ASSAM"':'"BREWING GUIDE INCLUDED"',
        '"PGS ORGANIC"':'"WHOLE-LEAF TEA"',
        'label: "PGS Organic Certified"':'label: "50g whole-leaf packets"',
        'text: "PGS Organic certified supply"':'text: "Product-specific documentation enquiries"',
        'title: "Our Certifications"':'title: "Product Information & Documentation"',
        'name: "PGS-India Organic"':'name: "Organic certification information"',
        'number: "PGS Organic Certified"':'number: "Product-specific evidence required"',
        'PGS-India uses a participatory assurance process. Ask us for the current certificate and its product coverage before relying on a certification claim.':'Current organic certificates are not published here. Organic wording in product names or supplier declarations is not proof that every Nevisan tea is certified. Ask for the relevant operator, validity and product scope before relying on a claim.',
        'FSSAI 10325001000313 (Marketer) · FSSAI 20321120000114 (Manufacturer)':'Mahabir Enterprise: 10325001000313 (marketer) · Tailor Made Tea: 20321120000114 (nine green teas) · GABA TEA PVT. LTD.: 20325120000477 (GABA Oolong)',
        'Marketer and manufacturer licence numbers are listed here and on the packaging. A licence number is not a product-specific laboratory report.':'These numbers reproduce the product and business declarations. Current validity and activity scope should be checked against the official licence record. FSSAI licensing is separate from organic certification and product laboratory testing.',
        'The product galleries show the leaves and pack artwork so you can see what you are choosing.':'The galleries currently use clearly labelled tea illustrations. They do not establish current packet appearance, certification or batch details.'
    }.items():app=app.replace(old,new)
    # A claim repeated as a badge is not remedied by a qualification elsewhere.
    app=app.replace('"Our Certifications"','"Product Information"')
    app_path.write_text(app,encoding='utf-8')
    bulk=ROOT/'bulk/index.html';bulk.write_text(bulk.read_text(encoding='utf-8').replace('Product and certification documents available on request','Ask about documentation for the products you need'),encoding='utf-8')
    print('Published reviewed illustration assets and removed unsupported certification badges.')

if __name__=='__main__':main()
