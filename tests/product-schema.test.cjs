const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('all tea offers declare non-returnable policy and product pages expose its link', () => {
  const paths = ['index.html', ...fs.readdirSync('products').map(slug => `products/${slug}/index.html`)];
  let count = 0;
  for (const path of paths) {
    const html = fs.readFileSync(path, 'utf8');
    const entities = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap(m => { const data = JSON.parse(m[1]); return data['@graph'] || [data]; });
    for (const product of entities.filter(p => p['@type'] === 'Product')) {
      const policy = product.offers.hasMerchantReturnPolicy;
      assert.equal(policy.applicableCountry, 'IN');
      assert.equal(policy.returnPolicyCategory, 'https://schema.org/MerchantReturnNotPermitted');
      assert.equal(policy.merchantReturnLink, 'https://nevisan.in/terms-of-service.html#returns');
      count++;
    }
    if (path.startsWith('products/')) {
      assert.ok(html.includes('Non-returnable food product.'));
      assert.ok(html.includes('href="/terms-of-service.html#returns"'));
    }
  }
  assert.equal(count, 20);
  assert.ok(fs.readFileSync('terms-of-service.html', 'utf8').includes('id="returns"'));
});

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
