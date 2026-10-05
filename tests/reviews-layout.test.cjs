const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function harness(hash = '') {
  const html = fs.readFileSync('reviews/index.html', 'utf8');
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('function filterReviews'));
  const cards = [...html.matchAll(/class="review-card" data-category="([^"]+)"(?: data-platform="([^"]+)")?/g)].map(m => ({
    dataset: {category: m[1], platform: m[2]}, style: {},
    querySelector() { return {focus() {}}; }, scrollIntoView() {}
  }));
  const status = {};
  const more = {addEventListener(event, fn) { this.click = fn; }};
  const button = {classList: {remove() {}, add() {}}, setAttribute() {}};
  const document = {
    querySelectorAll(selector) { return selector === '.review-card' ? cards : [button]; },
    querySelector() { return button; },
    getElementById(id) { return id === 'reviewsStatus' ? status : more; }
  };
  let ready;
  const context = {document, window: {location: {hash}, addEventListener(event, fn) { ready = fn; }}};
  vm.runInNewContext(script, context);
  ready();
  return {cards, status, more, filter(category) { context.filterReviews(category, button); }, visible() { return cards.filter(c => c.style.display === 'flex'); }};
}

test('reviews start with 12 and show more reveals the next 12 without removing records', () => {
  const h = harness();
  assert.equal(h.cards.length, 410);
  assert.equal(h.visible().length, 12);
  h.more.click();
  assert.equal(h.visible().length, 24);
  assert.equal(h.status.textContent, 'Showing 24 of 410 reviews');
});
test('every tea and platform filter resets pagination and can reveal all matching records', () => {
  const h = harness();
  for (const category of [...new Set(h.cards.map(c => c.dataset.category)), 'amazon', 'all']) {
    h.filter(category);
    const expected = h.cards.filter(c => category === 'all' || c.dataset.category === category || c.dataset.platform === category).length;
    assert.equal(h.visible().length, Math.min(12, expected));
    while (!h.more.hidden) h.more.click();
    assert.equal(h.visible().length, expected);
  }
});
test('deep links open the selected tea with pagination initialized', () => {
  const h = harness('#ginger');
  assert.equal(h.visible().length, 12);
  assert.ok(h.visible().every(c => c.dataset.category === 'ginger'));
  assert.equal(h.status.textContent, 'Showing 12 of 40 reviews');
});
