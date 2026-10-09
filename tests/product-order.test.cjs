const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
test('packet counts update all order actions and block invalid quantities', () => {
  const input = {value:'1', events:{}, setCustomValidity(message){this.error=message;}, reportValidity(){return !this.error;}, focus(){}, addEventListener(name, fn){this.events[name]=fn;}};
  const links = Array.from({length:4},()=>({events:{},addEventListener(name,fn){this.events[name]=fn;}}));
  const document = {readyState:'complete',querySelector(selector){return selector==='h1'?{textContent:'GABA Oolong Tea'}:input;},querySelectorAll(){return links;}};
  vm.runInNewContext(fs.readFileSync('product-order.js','utf8'),{document,encodeURIComponent});
  input.value='3';input.events.input();
  links.forEach(link=>assert.match(decodeURIComponent(link.href),/Quantity: 3 packets × 50g each/));
  for(const value of ['0','1.5','']) {
    input.value=value;let blocked=false;
    links[0].events.click({preventDefault(){blocked=true;}});
    assert.equal(blocked,true);
  }
});
