const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const products=require('../content/product-catalog.json').products;
const html=fs.readFileSync('compare/index.html','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
test('comparison covers every tea exactly once with catalogue ingredients, flavour and brewing',()=>{
 const rows=[...html.matchAll(/<tr id="([^"]+)">(.*?)<\/tr>/gs)];
 assert.equal(rows.length,10);
 for(const p of products){
  const matches=rows.filter(r=>r[1]===p.handle);assert.equal(matches.length,1);
  const row=matches[0][2];
  for(const field of [p.name,p.flavour,p.ingredients,...Object.values(p.brew)])assert.ok(row.includes(escape(field)),p.handle+': '+field);
  assert.ok(row.includes('Contains caffeine'));assert.ok(row.includes('MRP ₹'+p.mrp));
  assert.ok(fs.existsSync('products/'+p.handle+'/index.html'));
 }
 assert.ok(html.includes('All ten teas contain caffeine.'));
 assert.ok(html.includes('Follow the current pouch instructions first'));
 assert.ok(html.includes('Rum and Whiskey teas are non-alcoholic'));
 assert.ok(fs.readFileSync('app.js','utf8').includes('Compare all ten teas ↗'));
});
