const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(value, blocked = false, pathname = '/products/ginger-green-tea/') {
  const events = {}, timers = new Map(), loaded = [], elements = {};
  let nextTimer = 0;
  const storage = {
    getItem() { if (blocked) throw Error('blocked'); return value; },
    setItem(key, next) { if (blocked) throw Error('blocked'); value = next; }
  };
  const document = {
    readyState: 'complete',
    getElementById: id => elements[id] || null,
    getElementsByTagName: () => [{parentNode: {insertBefore: element => loaded.push(element.src)}}],
    createElement: () => ({style: {}, setAttribute() {}, querySelector: () => ({addEventListener() {}}), remove() {delete elements[this.id];}}),
    body: {appendChild: element => {elements[element.id] = element;}}
  };
  const window = {
    location: {pathname},
    addEventListener: (name, fn) => {events[name] = fn;},
    dispatchEvent: event => events[event.type]?.(event)
  };
  const context = vm.createContext({window, document, localStorage: storage,
    CustomEvent: class {constructor(type) {this.type = type;}},
    setTimeout: fn => {timers.set(++nextTimer, fn); return nextTimer;},
    clearTimeout: id => timers.delete(id)
  });
  vm.runInContext(fs.readFileSync('consent.js','utf8'),context);
  return {window, document, loaded, events, elements, setValue: next => {value = next;},
    flush: () => {for (const [id, fn] of [...timers]) {timers.delete(id); fn();}}};
}

test('unknown and declined visitors do not load Meta or queue a PageView', () => {
  for (const value of [null, 'declined', 'invalid']) {
    const env = setup(value);
    assert.equal(env.loaded.length, 0);
    assert.equal(env.window.fbq, undefined);
    assert.equal(env.window.dataLayer[0][2].analytics_storage, 'denied');
    env.flush();
    assert.equal(Boolean(env.elements['nevisan-injected-consent-banner']), value !== 'declined');
  }
});
test('acceptance initializes once, withdrawal revokes, reacceptance avoids duplicate PageViews', () => {
  const env = setup(null);
  env.window.updateNevisanConsent(true);
  env.window.updateNevisanConsent(true);
  assert.equal(env.loaded.length, 1);
  assert.equal(env.window.fbq.queue.filter(args => args[1] === 'PageView').length, 1);
  env.window.updateNevisanConsent(false);
  assert.equal(env.window.hasNevisanConsent(), false);
  assert.equal(env.window.dataLayer.at(-1)[2].analytics_storage, 'denied');
  assert.equal(env.window.fbq.queue.at(-1)[1], 'revoke');
  env.window.updateNevisanConsent(true);
  assert.equal(env.window.fbq.queue.filter(args => args[1] === 'PageView').length, 1);
});
test('blocked storage still displays the banner and applies a choice', () => {
  const env = setup(null, true);
  env.flush();
  assert.ok(env.elements['nevisan-injected-consent-banner']);
  env.window.updateNevisanConsent(true);
  assert.equal(env.window.hasNevisanConsent(), true);
  assert.equal(env.window.dataLayer.at(-1)[2].analytics_storage, 'granted');
  assert.equal(env.loaded.length, 1);
  assert.equal(env.elements['nevisan-injected-consent-banner'], undefined);
});
test('a quick choice cancels pending banner display', () => {
  const env = setup(null);
  env.window.updateNevisanConsent(false);
  env.flush();
  assert.equal(env.elements['nevisan-injected-consent-banner'], undefined);
});
test('consent withdrawal in another tab applies immediately', () => {
  const env = setup('accepted');
  env.setValue('declined');
  env.events.storage({key: 'nevisan_cookie_consent'});
  assert.equal(env.window.hasNevisanConsent(), false);
  assert.equal(env.window.fbq.queue.at(-1)[1], 'revoke');
});
test('clearing consent storage restores the banner', () => {
  const env = setup('accepted');
  env.setValue(null);
  env.events.storage({key: null});
  assert.equal(env.window.hasNevisanConsent(), false);
  assert.ok(env.elements['nevisan-injected-consent-banner']);
});
