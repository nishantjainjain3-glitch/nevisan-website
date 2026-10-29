"""Deterministic local SEO checks; does not infer Google indexation or rankings."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
from urllib.robotparser import RobotFileParser
from collections import Counter
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://nevisan.in/'

class Metadata(HTMLParser):
    def __init__(self):
        super().__init__(); self.canonical=''; self.robots=''; self.title=''; self.description=''; self.in_title=False; self.h1=0; self.links=[]; self.meta_errors=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta':
            allowed={'charset','name','content','property','http-equiv','itemprop','id','scheme','lang','dir'}
            unexpected=[key for key,_ in attrs if key not in allowed and not key.startswith('data-')]
            if unexpected: self.meta_errors.append('malformed meta attributes: '+', '.join(unexpected))
            if len(a)!=len(attrs): self.meta_errors.append('duplicate meta attribute')
        if tag=='title': self.in_title=True
        if tag=='h1': self.h1+=1
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
        if tag=='meta' and a.get('name')=='robots': self.robots=a.get('content','')
        if tag=='meta' and a.get('name')=='description': self.description=a.get('content','')
        if tag=='a': self.links.append(a.get('href',''))
    def handle_endtag(self, tag):
        if tag=='title': self.in_title=False
    def handle_data(self, data):
        if self.in_title: self.title+=data

def audit():
    errors=[]; pages=[]; articles=0; schema_assets=0
    def assets(value, name):
        nonlocal schema_assets
        if isinstance(value, dict):
            for key, child in value.items():
                if key in ['image','logo','url','contentUrl','thumbnailUrl'] and isinstance(child,str):
                    u=urlsplit(child)
                    if u.netloc=='nevisan.in' and Path(u.path).suffix.lower() in ['.jpg','.jpeg','.png','.webp','.svg','.mp4']:
                        schema_assets+=1
                        if not (ROOT/u.path.lstrip('/')).is_file(): errors.append(name+': broken schema asset '+child)
                assets(child,name)
        elif isinstance(value,list):
            for child in value: assets(child,name)
    for path in ROOT.rglob('*.html'):
        if any(x in path.parts for x in ['.git','.agents','node_modules']): continue
        text=path.read_text(encoding='utf-8'); name=path.relative_to(ROOT).as_posix()
        p=Metadata(); p.feed(text)
        errors.extend(name+': '+error for error in p.meta_errors)
        if '<main' not in text and name not in ['index.html','quiz/index.html']: continue
        if 'noindex' not in p.robots.lower():
            expected=BASE+(name[:-10] if name.endswith('index.html') else name)
            if p.canonical!=expected: errors.append(name+': canonical mismatch '+p.canonical)
            if not p.description or not p.title: errors.append(name+': missing title/description')
            if p.h1!=1: errors.append(name+': expected one H1')
            pages.append({'path':name,'canonical':p.canonical,'title':p.title,'description':p.description})
        for raw in re.findall(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',text,re.S):
            data=json.loads(raw); assets(data,name)
            for entity in data.get('@graph',[data]):
                if entity.get('@type') in ['Article','BlogPosting']:
                    articles+=1
                    if entity.get('mainEntityOfPage',{}).get('@id')!=p.canonical: errors.append(name+': article canonical mismatch')
    for key in ['canonical','title','description']:
        for value,count in Counter(p[key] for p in pages).items():
            if count>1: errors.append('duplicate '+key+': '+value)
    ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls=[n.text for n in ET.parse(ROOT/'sitemap.xml').findall('.//s:loc',ns)]
    if set(urls)!={p['canonical'] for p in pages}: errors.append('sitemap differs from indexable canonical pages')
    if len(urls)!=len(set(urls)): errors.append('duplicate sitemap URLs')
    robots=RobotFileParser(); robots.parse((ROOT/'robots.txt').read_text().splitlines())
    for agent in ['Googlebot','Bingbot','GPTBot','ClaudeBot']:
        if not robots.can_fetch(agent,BASE): errors.append(agent+': homepage blocked')
        if robots.can_fetch(agent,BASE+'oauth/callback/'): errors.append(agent+': OAuth exclusion not applied')
    home=Metadata(); home.feed((ROOT/'index.html').read_text(encoding='utf-8'))
    for p in json.loads((ROOT/'content/product-catalog.json').read_text(encoding='utf-8'))['products']:
        if '/products/'+p['handle']+'/' not in home.links: errors.append('missing raw-HTML product link: '+p['handle'])
    return {'indexable_pages':len(pages),'sitemap_urls':len(urls),'article_entities':articles,'local_schema_asset_references':schema_assets,'errors':errors,'limits':['Google indexation, rankings and field Core Web Vitals require first-party account data.','This validates local markup; live HTTP checks are separate.']}

if __name__=='__main__':
    result=audit(); print(json.dumps(result,indent=2)); raise SystemExit(bool(result['errors']))
