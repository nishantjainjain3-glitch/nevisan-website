const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app(consent = false) {
  let state = [];
  const opened = [], tracked = [];
  const React = {
    createContext: value => ({value, Provider: 'provider'}),
    createElement: (type, props, ...children) => ({type, props: props || {}, children}),
    useState: initial => [state, update => {state = typeof update === 'function' ? update(state) : update;}],
    useEffect() {}, useRef: () => ({current:null}), useCallback: fn => fn,
    useContext: ctx => ctx.value
  };
  const context = vm.createContext({React,
    ReactDOM: {createRoot: () => ({render() {}}), createPortal: element => element},
    document: {getElementById: () => ({}), body: {}},
    window: {hasNevisanConsent: () => consent, open: (...args) => opened.push(args)},
    fbq: (...args) => tracked.push(args),
    console, URLSearchParams, encodeURIComponent
  });
  vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
  return {context, opened, tracked, provider: () => vm.runInContext('CartProvider({children:null}).props.value',context)};
}
test('homepage script evaluates when optional GSAP dependencies are unavailable', () => {
  const env = app();
  assert.equal(vm.runInContext('TEAS.length',env.context),10);
});
test('cart combines identical products, updates quantities and removes zero quantity', () => {
  const env = app();
  const tea = {name:'Ginger Green Tea',price:499};
  env.provider().addToCart(tea);
  env.provider().addToCart(tea);
  assert.equal(env.provider().cart.length,1);
  assert.equal(env.provider().cart[0].qty,2);
  env.provider().updateQty(tea.name,-1);
  assert.equal(env.provider().cart[0].qty,1);
  env.provider().updateQty(tea.name,-1);
  assert.equal(env.provider().cart.length,0);
});
test('cart tracking requires consent even when a pixel function already exists', () => {
  for (const consent of [false,true]) {
    const env = app(consent);
    env.provider().addToCart({name:'Ginger Green Tea',price:499});
    assert.equal(env.tracked.length,consent ? 1 : 0);
  }
});
test('WhatsApp handoff includes quantities and total and preserves the cart', () => {
  const env = app();
  const tea = vm.runInContext("TEAS.find(tea => tea.name === 'Ginger Green Tea')",env.context);
  assert.equal(tea.price,389);
  env.provider().addToCart(tea);
  env.provider().addToCart(tea);
  env.context.cartValue = env.provider();
  vm.runInContext('CartCtx.value = cartValue; ViewportCtx.value = {isMobile:false,isTablet:false}',env.context);
  const tree = vm.runInContext('CartSheet({onClose:()=>{}})',env.context);
  function find(node) {
    if (!node || typeof node !== 'object') return null;
    if (node.type === 'button' && node.children.includes('Place Order via WhatsApp')) return node;
    for (const child of node.children || []) { const found = find(child); if (found) return found; }
  }
  const button = find(tree);
  assert.ok(button);
  button.props.onClick();
  const url = new URL(env.opened[0][0]);
  assert.ok(url.searchParams.get('text').includes('Ginger Green Tea x2 = ₹778'));
  assert.ok(url.searchParams.get('text').includes('Total: ₹778'));
  assert.equal(env.provider().cart[0].qty,2);
  assert.equal(env.tracked.length,0);
});

test('activated cart checkout opens the selected teas and quantities without clearing the cart',()=>{
 const env=app(); let destination;
 env.context.window.location={assign:value=>destination=value};
 vm.runInContext(fs.readFileSync('checkout/cart-bridge.js','utf8'),env.context);
 env.provider().addToCart({name:'Ginger Green Tea',price:389});
 env.provider().addToCart({name:'Ginger Green Tea',price:389});
 env.context.cartValue=env.provider();
 vm.runInContext('CartCtx.value = cartValue; ViewportCtx.value = {isMobile:false,isTablet:false}',env.context);
 const tree=vm.runInContext('CartSheet({onClose:()=>{}})',env.context);
 function find(node){if(!node||typeof node!=='object')return null;if(node.type==='button'&&node.children.includes('Checkout · Free shipping · UPI'))return node;for(const child of node.children||[]){const result=find(child);if(result)return result;}}
 const button=find(tree);assert.ok(button);button.props.onClick();
 const url=new URL(destination,'https://nevisan.in');assert.equal(url.pathname,'/checkout/');assert.deepEqual(JSON.parse(url.searchParams.get('items')),[{handle:'ginger-green-tea',quantity:2}]);
 assert.equal(env.provider().cart[0].qty,2);assert.equal(env.opened.length,0);
});

test('homepage direct store choices and generic order actions use Nevisan Pay; support stays WhatsApp',()=>{
 const env=app();let destination;
 env.context.window.location={assign:value=>destination=value};
 vm.runInContext(fs.readFileSync('checkout/cart-bridge.js','utf8'),env.context);
 vm.runInContext('openWhatsApp("Ginger Green Tea")',env.context);
 let url=new URL(destination,'https://nevisan.in');
 assert.deepEqual(JSON.parse(url.searchParams.get('items')),[{handle:'ginger-green-tea',quantity:1}]);
 vm.runInContext('openWhatsApp()',env.context);assert.equal(destination,'/checkout/');assert.equal(env.opened.length,0);
 vm.runInContext('openNevisanSupport()',env.context);url=new URL(env.opened[0][0]);assert.equal(url.hostname,'wa.me');assert.match(url.searchParams.get('text'),/question/);
});
