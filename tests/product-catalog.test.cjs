const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const catalog = require('../content/product-catalog.json');
const html = path => fs.readFileSync(path, 'utf8');
const entities = text => [...text.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => {const data = JSON.parse(m[1]); return data['@graph'] || [data];});

test('all customer price surfaces and pack weights agree with the checked catalog', () => {
  const context = {window: {}};
  vm.runInNewContext(html('checkout/catalog.js'), context);
  const teas = JSON.parse(html('app.js').match(/const TEAS = (\[[\s\S]*?\]);/)[1]);
  const homeProducts = entities(html('index.html')).filter(p => p['@type'] === 'Product');
  assert.equal(catalog.products.length, 10);
  assert.equal(context.window.NEVISAN_TEAS.length, 10);
  for (const p of catalog.products) {
    const detail = html(`products/${p.handle}/index.html`);
    assert.equal(context.window.NEVISAN_TEAS.find(x => x.handle === p.handle).price, p.price);
    assert.equal(teas.find(x => x.name === p.name).price, p.price);
    assert.match(detail, new RegExp(`class="product-price"><strong>₹${p.price}<`));
    assert.match(detail, new RegExp(`class="sticky-price">\\s*₹${p.price}\\s*<`));
    assert.ok(detail.includes('Maximum Retail Price (MRP):</strong> ₹499'));
    assert.equal(p.net_weight_g, 50);
    assert.equal(p.mrp, 499);
    assert.equal(p.price, p.mrp, 'The owner lists every packet at MRP; private quotes are handled on WhatsApp.');
    assert.ok(!/<del\b|nevisan-price__saving|\d+% off/.test(detail), 'No public discount or crossed-out price.');
    assert.ok(p.price > 0 && p.price <= p.mrp);
    const product = entities(detail).find(x => x['@type'] === 'Product');
    const home = homeProducts.find(x => x.url.endsWith(`/${p.handle}/`));
    for (const entity of [product, home]) {
      assert.equal(Number(entity.offers.price), p.price);
      assert.equal(entity.offers.priceCurrency, 'INR');
      assert.equal(entity.weight.value, 50);
      assert.equal(entity.description, p.description);
    }
    assert.ok(detail.includes(`Manufactured by:</strong> ${p.manufacturer}`));
  }
});

test('ingredients, brewing and visible product FAQs match their structured data', () => {
  const guide = html('how-to-brew/index.html');
  const teas = JSON.parse(html('app.js').match(/const TEAS = (\[[\s\S]*?\]);/)[1]);
  for (const p of catalog.products) {
    const detail = html(`products/${p.handle}/index.html`);
    assert.ok(detail.includes(p.ingredients));
    const row = guide.match(new RegExp(`<tr><th scope="row"><a href="/products/${p.handle}/">[\\s\\S]*?</tr>`))[0];
    for (const value of Object.values(p.brew)) {
      assert.ok(row.includes(value));
      assert.ok(detail.includes(`<dd>${value}</dd>`));
      assert.ok(teas.find(x => x.name === p.name).brew.includes(value));
    }
    const faq = entities(detail).find(x => x['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, 3);
    for (const question of faq.mainEntity) {
      assert.ok(detail.includes(`<summary>${question.name}</summary>`));
      assert.ok(detail.includes(`<p>${question.acceptedAnswer.text}</p>`));
    }
    assert.ok(!detail.includes('class="review-card"'));
    assert.ok(!/PCOS support|deep sleep support|calm the central nervous system|pure botanicals without alcohol/.test(detail));
  }
  assert.ok(catalog.products.find(p => p.handle === 'ginger-green-tea').ingredients.includes('Natural Ginger Flavour'));
  assert.ok(catalog.products.find(p => p.handle === 'rum-green-tea').ingredients.includes('Natural Rum Flavour'));
  assert.ok(catalog.products.find(p => p.handle === 'whiskey-green-tea').ingredients.includes('Natural Whiskey Flavour'));
});
