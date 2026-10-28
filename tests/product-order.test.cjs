const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
test('packet counts update all order actions and block invalid quantities', () => {
  const input = {value:'1', events:{}, setCustomValidity(message){this.error=message;}, reportValidity(){return !this.error;}, focus(){}, addEventListener(name, fn){this.events[name]=fn;}};
  const links = Array.from({length:4},()=>({events:{},addEventListener(name,fn){this.events[name]=fn;}}));
  const document = {readyState:'complete',querySelector(selector){return selector==='h1'?{textContent:'GABA Oolong Tea'}:input;},querySelectorAll(){return links;}};
  vm.runInNewContext(fs.readFileSync('product-order.js','utf8'),{document,window:{},encodeURIComponent});
  input.value='3';input.events.input();
  links.forEach(link=>assert.match(decodeURIComponent(link.href),/Quantity: 3 packets × 50g each/));
  for(const value of ['0','1.5','','1001']) {
    input.value=value;let blocked=false;
    links[0].events.click({preventDefault(){blocked=true;}});
    assert.equal(blocked,true);
  }
});
test('activated product actions carry the selected packet count into Nevisan Pay checkout',()=>{
 const input={value:'2',events:{},setCustomValidity(message){this.error=message},reportValidity(){return !this.error},addEventListener(name,fn){this.events[name]=fn}};
 const links=Array.from({length:4},()=>({events:{},addEventListener(name,fn){this.events[name]=fn},removeAttribute(name){this[name]=undefined}}));
 const document={readyState:'complete',querySelector(selector){return selector==='h1'?{textContent:'GABA Oolong Tea'}:input},querySelectorAll(){return links}};
 const context=vm.createContext({document,window:{location:{assign(){}}},encodeURIComponent});
 vm.runInContext(fs.readFileSync('checkout/cart-bridge.js','utf8'),context);
 context.window.NEVISAN_CART_CHECKOUT.enabled=true;
 vm.runInContext(fs.readFileSync('product-order.js','utf8'),context);
 for(const link of links){const url=new URL(link.href,'https://nevisan.in');assert.equal(url.pathname,'/checkout/');assert.deepEqual(JSON.parse(url.searchParams.get('items')),[{handle:'gaba-oolong-tea',quantity:2}]);}
});

test('quantity changes never rewrite or validate WhatsApp support links',()=>{
 const input={value:'2',events:{},setCustomValidity(message){this.error=message},reportValidity(){return !this.error},addEventListener(name,fn){this.events[name]=fn}};
 const purchase={events:{},addEventListener(name,fn){this.events[name]=fn},removeAttribute(){}};
 const support={href:'https://wa.me/919864245687',events:{},addEventListener(name,fn){this.events[name]=fn},removeAttribute(){}};
 const document={readyState:'complete',querySelector(selector){return selector==='h1'?{textContent:'Ginger Green Tea'}:input},querySelectorAll(selector){return selector.includes('href*')?[purchase,support]:[purchase]}};
 const context=vm.createContext({document,window:{},encodeURIComponent});
 vm.runInContext(fs.readFileSync('checkout/cart-bridge.js','utf8'),context);
 vm.runInContext(fs.readFileSync('product-order.js','utf8'),context);
 input.value='0';input.events.input();
 assert.equal(support.href,'https://wa.me/919864245687');
 assert.equal(support.events.click,undefined);
 assert.ok(purchase.href.startsWith('/checkout/'));
});
