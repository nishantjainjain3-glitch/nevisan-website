const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('homepage Product entities cover every collection product, including Ginger', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(m => JSON.parse(m[1])['@graph'] || []);
  const collection = graph.find(x => x['@type'] === 'ItemList');
  const products = graph.filter(x => x['@type'] === 'Product');
  assert.equal(products.length, collection.numberOfItems);
  assert.equal(new Set(products.map(p => p.url)).size, 10);
  assert.deepEqual(products.map(p => p.url).sort(), collection.itemListElement.map(p => p.url).sort());
  for (const product of products) {
    const html = fs.readFileSync(new URL(product.url).pathname.slice(1) + 'index.html', 'utf8');
    const detail = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(m => JSON.parse(m[1])).find(p => p['@type'] === 'Product');
    assert.equal(product.offers.price, detail.offers.price);
    assert.equal(product.offers.priceCurrency, detail.offers.priceCurrency);
    assert.equal(product.image, detail.image);
    assert.ok(product.description && product.brand.name);
  }
});
