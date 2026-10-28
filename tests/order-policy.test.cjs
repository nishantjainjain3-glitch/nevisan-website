const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const policy=require('../content/order-policy.json');
function pages(root='.'){
 return fs.readdirSync(root,{withFileTypes:true}).flatMap(entry=>{
  if(['.git','.agents','node_modules'].includes(entry.name))return [];
  const file=path.join(root,entry.name);
  return entry.isDirectory()?pages(file):file.endsWith('.html')?[file]:[];
 });
}
const unescape=s=>s.replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&#x27;',"'").replaceAll('&quot;','"');
test('every customer page exposes the same ordering, delivery, support and no-returns policy',()=>{
 let count=0;
 for(const file of pages()){
  const html=fs.readFileSync(file,'utf8');
  if(!html.includes('<main')&&file!=='index.html')continue;
  count++;
  const blocks=[...html.matchAll(/<!-- nevisan-order-policy:start -->(.*?)<!-- nevisan-order-policy:end -->/gs)];
  assert.equal(blocks.length,1,file);
  const text=unescape(blocks[0][1].replace(/<[^>]+>/g,''));
  for(const value of Object.values(policy))assert.ok(text.includes(value),file);
  assert.ok(html.includes('/order-policy.css?v=1'),file);
 }
 assert.equal(count,57);
});
test('checkout explains manual sending and provides the delivery and no-returns terms before payment',()=>{
 const html=fs.readFileSync('checkout/index.html','utf8');
 assert.ok(html.includes('press Send'));
 assert.match(html,/attach your (?:payment )?screenshot/i);
 const form=html.slice(html.indexOf('<form'),html.indexOf('</form>'));
 assert.ok(form.includes('/terms-of-service.html#returns'));
 assert.ok(form.includes('/terms-of-service.html#shipping'));
 assert.ok(form.includes('non-returnable for change of mind'));
});
test('delivery and no-returns terms retain product support and do not turn screenshots into payment confirmation',()=>{
 const html=fs.readFileSync('terms-of-service.html','utf8');
 for(const id of ['ordering','shipping','returns'])assert.ok(html.includes(`id="${id}"`));
 for(const text of ['after payment verification and order acceptance','3–7 business days after dispatch','International schedules are confirmed individually','change-of-mind returns or exchanges','damaged, incorrect or defective','does not affect your rights under applicable law','Nevisan receives the details only after you send'])assert.ok(html.includes(text),text);
 assert.ok(!html.includes('all sales are final'));
 assert.ok(!html.includes('to any PIN code across India'));
});
