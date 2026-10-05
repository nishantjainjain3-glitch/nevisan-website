const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function galleryHarness() {
  const pending = [];
  function element() {
    return {style: {}, attrs: {}, listeners: {}, children: [],
      setAttribute(k, v) { this.attrs[k] = v; },
      getAttribute(k) { return this.attrs[k]; },
      addEventListener(k, fn) { this.listeners[k] = fn; },
      append(...items) { this.children.push(...items); },
      focus() {},
      querySelector(selector) { return this.children.find(e => e.tag === selector) || this.children.flatMap(e => e.children || []).find(e => e.tag === selector); },
      showModal() { this.open = true; },
      close() { this.open = false; pending.push(() => this.listeners.close()); }
    };
  }
  const body = element(); body.style.overflow = 'auto';
  const main = element(); main.attrs.src = '/main.webp'; main.alt = 'Main';
  const zoom = element(); const caption = element();
  const choice = element(); choice.dataset = {gallerySrc:'/back.webp', galleryAlt:'Back'};
  const gallery = {querySelector(s) { return s === '.signature-gallery__main' ? main : s === '.signature-gallery__zoom' ? zoom : caption; },querySelectorAll() { return [choice]; }};
  const document = {body, readyState:'complete', querySelectorAll() { return [gallery]; },createElement(tag) { const e = element(); e.tag = tag; return e; }};
  vm.runInNewContext(fs.readFileSync('product-gallery.js','utf8'), {document, window:{HTMLDialogElement:function(){}}});
  return {body, zoom, choice, pending, dialog:() => body.children[0]};
}

test('product viewer releases scroll immediately and survives a rapid reopen before close notification', () => {
  const h = galleryHarness(); h.zoom.listeners.click();
  assert.equal(h.body.style.overflow, 'hidden');
  h.dialog().querySelector('button').listeners.click();
  assert.equal(h.body.style.overflow, 'auto');
  h.zoom.listeners.click(); h.pending.shift()();
  assert.equal(h.dialog().open, true);
  assert.equal(h.body.style.overflow, 'hidden');
  h.dialog().querySelector('button').listeners.click(); h.pending.shift()();
  assert.equal(h.body.style.overflow, 'auto');
});

test('Escape cancellation closes the viewer and restores the previous scroll style', () => {
  const h = galleryHarness(); h.zoom.listeners.click(); let prevented = false;
  h.dialog().listeners.cancel({preventDefault() { prevented = true; }});
  assert.equal(prevented, true);
  assert.equal(h.dialog().open, false);
  assert.equal(h.body.style.overflow, 'auto');
  h.pending.shift()();
  assert.equal(h.body.style.overflow, 'auto');
});
