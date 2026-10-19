const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function bridge(){let destination;const context=vm.createContext({window:{location:{assign:value=>destination=value}},encodeURIComponent});vm.runInContext(fs.readFileSync(path.join(__dirname,'../checkout/cart-bridge.js'),'utf8'),context);return {bridge:context.window.NEVISAN_CART_CHECKOUT,get destination(){return destination}};}
test('staged checkout remains disabled and carries only product handles and packet counts',()=>{
 const env=bridge();assert.equal(env.bridge.enabled,false);
 env.bridge.open([{tea:{name:'Ginger Green Tea',price:1},qty:2}]);
 const url=new URL(env.destination,'https://nevisan.in');
 assert.equal(url.pathname,'/checkout/');assert.deepEqual(JSON.parse(url.searchParams.get('items')),[{handle:'ginger-green-tea',quantity:2}]);assert.ok(!env.destination.includes('price'));
});
test('unknown teas and fractional packet quantities cannot be handed off',()=>{
 for(const [name,qty] of [['Ginger Green Tea',1.5],['Unknown tea',2],['Ginger Green Tea',1001]])assert.throws(()=>bridge().bridge.open([{tea:{name},qty}]));
});
