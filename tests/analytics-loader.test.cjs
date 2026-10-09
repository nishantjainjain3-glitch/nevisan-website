const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(readyState, idle) {
  const scripts = [], timers = [], events = {}, callbacks = [];
  const window = {dataLayer: [['consent', 'default', {analytics_storage: 'denied'}]],
    addEventListener(name, fn) {events[name] = fn;}};
  if (idle) window.requestIdleCallback = (fn, options) => {callbacks.push(fn); assert.equal(options.timeout, 2000);};
  const document = {readyState, head: {appendChild: script => scripts.push(script)}, createElement: () => ({})};
  vm.runInNewContext(fs.readFileSync('analytics-loader.js', 'utf8'),
    {window, document, setTimeout: fn => timers.push(fn)});
  return {window, scripts, timers, events, callbacks};
}

test('consent and early order events survive until idle analytics startup', () => {
  const e = setup('loading', true);
  e.window.gtag('event', 'order_click', {packets: 3});
  assert.equal(e.scripts.length, 0);
  assert.equal(e.timers.length, 0);
  e.events.load();
  e.timers[0]();
  assert.equal(e.scripts.length, 0);
  e.callbacks[0](); e.callbacks[0]();
  assert.equal(e.scripts.length, 2);
  assert.equal(e.window.dataLayer[0][2].analytics_storage, 'denied');
  assert.equal(e.window.dataLayer[3][1], 'order_click');
  assert.equal(e.window.dataLayer.filter(e => e.event === 'gtm.js').length, 1);
  assert.ok(e.scripts.every(s => s.async));
});

test('already loaded pages without idle callbacks still initialize analytics', () => {
  const e = setup('complete', false);
  assert.equal(e.scripts.length, 0);
  e.timers[0]();
  assert.equal(e.scripts.length, 2);
  assert.ok(e.scripts[0].src.includes('GTM-WN76CRVR'));
  assert.ok(e.scripts[1].src.includes('G-W3Q7DNWTKP'));
});
