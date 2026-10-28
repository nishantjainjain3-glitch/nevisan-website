const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function app(consent = false, cartOpen = false) {
  let state = [];
  const opened = [], tracked = [];
  const React = {
    createContext: value => ({value, Provider: 'provider'}),
    createElement: (type, props, ...children) => ({type, props: props || {}, children}),
    useState: initial => typeof initial === 'boolean' ? [cartOpen,()=>{}] : [state, update => {state = typeof update === 'function' ? update(state) : update;}],
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
  assert.equal(tea.price,499);
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
  assert.ok(url.searchParams.get('text').includes('Ginger Green Tea x2 = ₹998'));
  assert.ok(url.searchParams.get('text').includes('Total: ₹998'));
  assert.equal(env.provider().cart[0].qty,2);
  assert.equal(env.tracked.length,0);
});

test('activated cart checkout opens the selected teas and quantities without clearing the cart',()=>{
 const env=app(); let destination;
 env.context.window.location={assign:value=>destination=value};
 vm.runInContext(fs.readFileSync('checkout/cart-bridge.js','utf8'),env.context);
 env.provider().addToCart({name:'Ginger Green Tea',price:499});
 env.provider().addToCart({name:'Ginger Green Tea',price:499});
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

test('cart uses current catalog prices and enforces checkout packet limits',()=>{
 const env=app();
 env.provider().addToCart({name:'Unknown tea',price:1});
 assert.equal(env.provider().cart.length,0);
 env.provider().addToCart({name:'Ginger Green Tea',price:1});
 assert.equal(env.provider().cart[0].tea.price,499);
 env.provider().updateQty('Ginger Green Tea',999);
 env.provider().addToCart({name:'Ginger Green Tea'});
 env.provider().updateQty('Ginger Green Tea',1);
 env.provider().updateQty('Ginger Green Tea',0.5);
 assert.equal(env.provider().cart[0].qty,1000);
 env.provider().clearCart();assert.equal(env.provider().cart.length,0);
});

test('session cart restores packet counts with fresh prices and rejects malformed saved selections',()=>{
 const env=app();let saved;
 env.context.window.sessionStorage={getItem:()=>saved,setItem:(key,value)=>saved=value};
 env.provider().addToCart({name:'Ginger Green Tea',price:1});
 env.context.currentCart=env.provider().cart;
 vm.runInContext('saveCart(currentCart)',env.context);
 assert.deepEqual(JSON.parse(saved),[{name:'Ginger Green Tea',qty:1}]);
 saved=JSON.stringify([{name:'Ginger Green Tea',qty:2,price:1}]);
 assert.equal(vm.runInContext('readSavedCart()[0].tea.price',env.context),499);
 assert.equal(vm.runInContext('readSavedCart()[0].qty',env.context),2);
 for(const value of ['{',JSON.stringify([{name:'Unknown',qty:1}]),JSON.stringify([{name:'Ginger Green Tea',qty:1.5}]),JSON.stringify([{name:'Ginger Green Tea',qty:1001}]),JSON.stringify([{name:'Ginger Green Tea',qty:1},{name:'Ginger Green Tea',qty:2}])]){
  saved=value;assert.equal(vm.runInContext('readSavedCart().length',env.context),0);
 }
 env.context.window.sessionStorage={getItem(){throw new Error('Blocked')},setItem(){throw new Error('Blocked')}};
 assert.equal(vm.runInContext('readSavedCart().length',env.context),0);
 assert.doesNotThrow(()=>vm.runInContext('saveCart(currentCart)',env.context));
});

test('empty carts disable checkout and expose a continue-shopping action',()=>{
 const env=app(false,true);env.context.cartValue=env.provider();
 vm.runInContext('CartCtx.value=cartValue',env.context);
 assert.ok(vm.runInContext('CartFAB()',env.context),'The open drawer must remain mounted after its last item is removed.');
 const tree=vm.runInContext('CartSheet({onClose:()=>{}})',env.context);
 const nodes=[];function visit(node){if(!node||typeof node!=='object')return;nodes.push(node);(node.children||[]).flat(Infinity).forEach(visit)}visit(tree);
 assert.equal(nodes.find(n=>n.props.className==='shine-button').props.disabled,true);
 assert.ok(nodes.some(n=>n.type==='button'&&n.children.includes('Continue shopping')));
 assert.ok(nodes.some(n=>n.props.role==='status'&&n.children.some(x=>typeof x==='string'&&x.includes('Your cart is empty'))));
});

test('every store-choice action routes the selected tea to the correct destination',()=>{
 const env=app();let direct;
 env.context.window.location={assign:value=>direct=value};
 vm.runInContext(fs.readFileSync('checkout/cart-bridge.js','utf8'),env.context);
 const teas=vm.runInContext('TEAS',env.context);
 function nodes(tree){if(!tree||typeof tree!=='object')return [];return [tree,...(tree.children||[]).flat(Infinity).flatMap(nodes)]}
 function text(tree){return typeof tree==='string'?tree:(tree?.children||[]).flat(Infinity).map(text).join(' ')}
 for(const tea of teas){
  env.context.selectedTea=tea;
  const choices=nodes(vm.runInContext('BuyModal({tea:selectedTea,onClose:()=>{}})',env.context)).filter(n=>n.type==='button');
  choices.find(n=>text(n).includes('Buy from Nevisan')).props.onClick();
  const checkout=new URL(direct,'https://nevisan.in');
  assert.equal(checkout.pathname,'/checkout/');
  assert.equal(JSON.parse(checkout.searchParams.get('items'))[0].handle,tea.name.toLowerCase().replace(/\s+/g,'-'));
  choices.find(n=>text(n).includes('Buy on Amazon')).props.onClick();
  assert.equal(env.opened.at(-1)[0],vm.runInContext('getDirectAmazonUrl(selectedTea.name)',env.context));
  assert.match(env.opened.at(-1)[0],/^https:\/\/www.amazon.in\/dp\/[A-Z0-9]+$/);
  choices.find(n=>text(n).includes('Buy on Flipkart')).props.onClick();
  assert.equal(env.opened.at(-1)[0],vm.runInContext('getDirectFlipkartUrl(selectedTea.name)',env.context));
  assert.ok(new URL(env.opened.at(-1)[0]).searchParams.get('pid'));
 }
});
