const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
function pages(root='.'){
 return fs.readdirSync(root,{withFileTypes:true}).flatMap(entry=>{
  if(['.git','.agents','node_modules','checkout'].includes(entry.name))return [];
  const file=path.join(root,entry.name);
  return entry.isDirectory()?pages(file):file.endsWith('.html')?[file]:[];
 });
}
test('shopping navigation across all public pages links to checkout rather than bypassing it',()=>{
 let checked=0;
 for(const file of pages()){
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/<a\b[^>]*>.*?<\/a>/gs)){
   const tag=match[0]; const text=tag.replace(/<[^>]+>/g,'').trim().toLowerCase();
   if(['shop now','shop teas','shop tea'].includes(text)){
    checked++;assert.match(tag,/href="\/checkout\/"/,file);
   }
   assert.ok(!tag.includes('wa.me/919864245687?text=Hi%20Nevisan!%20I%20would%20like%20to%20place%20an%20order.'),file);
  }
 }
 assert.ok(checked>=50,`Expected site-wide shopping links, checked ${checked}`);
});
test('all ten product pages have usable static checkout links and quantity-update hooks',()=>{
 for(const entry of fs.readdirSync('products',{withFileTypes:true}).filter(e=>e.isDirectory())){
  const file=path.join('products',entry.name,'index.html');if(!fs.existsSync(file))continue;
  const html=fs.readFileSync(file,'utf8');
  const links=[...html.matchAll(/<a\b[^>]*data-nevisan-order[^>]*>/g)];
  assert.equal(links.length,4,file);
  for(const [tag] of links){const href=tag.match(/href="([^"]+)"/)[1];const url=new URL(href,'https://nevisan.in');assert.equal(url.pathname,'/checkout/');assert.deepEqual(JSON.parse(url.searchParams.get('items')),[{handle:entry.name,quantity:1}]);}
  assert.ok(html.includes('product-order.js?v=3'),file);
 }
});
