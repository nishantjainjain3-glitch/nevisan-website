const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const api=require('../checkout/static-order.js');
const context=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync('checkout/catalog.js','utf8'),context);
const catalog=JSON.parse(JSON.stringify(context.window.NEVISAN_TEAS));
test('checkout ignores incoming prices and computes exact multi-tea total and UPI amount',()=>{
 const items=api.selection([{handle:'ginger-green-tea',quantity:2,price:1},{handle:'gaba-oolong-tea',quantity:1}],catalog);
 assert.equal(api.total(items),1497);
 const upi=new URL(api.upi(items,'NEV-QATEST-12345678'));
 assert.equal(upi.searchParams.get('pa'),'mahavirpaltan@icici');
 assert.equal(upi.searchParams.get('am'),'1497.00');assert.equal(upi.searchParams.get('cu'),'INR');
});
test('malformed, duplicate, unknown and fractional selections are rejected',()=>{
 for(const raw of [null,{},[{handle:'unknown',quantity:1}],[{handle:'ginger-green-tea',quantity:1.5}],[{handle:'ginger-green-tea',quantity:0}],[{handle:'ginger-green-tea',quantity:1001}],[{handle:'ginger-green-tea',quantity:1},{handle:'ginger-green-tea',quantity:2}]])assert.throws(()=>api.selection(raw,catalog));
});
test('WhatsApp includes complete selection, delivery and manual payment review without claiming payment success',()=>{
 const items=api.selection([{handle:'ginger-green-tea',quantity:2}],catalog);
 const customer={first_name:'Test',last_name:'Buyer',phone:'9000000000',email:'qa@example.invalid',address_1:'TEST DO NOT SHIP',address_2:'Landmark & gate',city:'Guwahati',province:'Assam',postal_code:'781008'};
 const url=new URL(api.build(items,customer,'NEV-QATEST-12345678','123456789012'));
 assert.equal(url.pathname,'/919864245687');
 const message=url.searchParams.get('text');
 for(const text of ['2 × 50g','998.00','Shipping: FREE',...Object.values(customer),'123456789012','NEV-QATEST-12345678','actual ICICI bank credit'])assert.ok(message.includes(text),text);
 assert.ok(!message.includes('Payment successful'));
 assert.throws(()=>api.build(items,customer,'NEV-QATEST-12345678','123'));
 assert.match(new URL(api.build(items,customer,'NEV-QATEST-12345678','',true)).searchParams.get('text'),/before I pay/);
});
test('static checkout has no backend dependency and stores no customer or payment details',()=>{
 const html=fs.readFileSync('checkout/index.html','utf8');
 assert.ok(html.includes('static-checkout.js'));
 assert.ok(!html.includes('src="checkout.js')&&!html.includes('src="config.js')&&!html.includes('local-config.js'));
 const js=fs.readFileSync('checkout/static-checkout.js','utf8');
 assert.ok(!/fetch\(|localStorage/.test(js));
 assert.ok(js.includes('api.rememberCart(items,window.sessionStorage)'));
 for(const tea of catalog){const html=fs.readFileSync(`products/${tea.handle}/index.html`,'utf8');assert.ok(html.includes('cart-bridge.js?v=2'));assert.ok(html.includes(`₹${tea.price}`));}
});

test('checkout cart memory contains only tea identities and packet counts',()=>{
 let saved;
 const items=api.selection([{handle:'ginger-green-tea',quantity:2}],catalog);
 api.rememberCart(items,{setItem:(key,value)=>{assert.equal(key,'nevisan-cart-v1');saved=JSON.parse(value)}});
 assert.deepEqual(saved,[{name:'Ginger Green Tea',qty:2}]);
 assert.doesNotThrow(()=>api.rememberCart(items,{setItem(){throw new Error('Blocked')}}));
});
test('international addresses and phone numbers survive the WhatsApp handoff',()=>{
 const items=api.selection([{handle:'gaba-oolong-tea',quantity:1}],catalog);
 const customer={first_name:'Test',last_name:'Buyer',phone:'+447700900000',email:'qa@example.invalid',address_1:'TEST DO NOT SHIP',city:'London',province:'London',postal_code:'SW1A 1AA',country:'United Kingdom'};
 const message=new URL(api.build(items,customer,'NEV-TEST-12345678')).searchParams.get('text');
 for(const text of ['United Kingdom','SW1A 1AA','+447700900000','499.00'])assert.ok(message.includes(text));
 assert.ok(!message.includes('\nIndia\n'));
});

test('desktop devices are distinguished from phones and iPad desktop mode for payment guidance',()=>{
 assert.equal(api.mobileDevice('Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),false);
 assert.equal(api.mobileDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X)',0),false);
 assert.equal(api.mobileDevice('Mozilla/5.0 (Linux; Android 14)'),true);
 assert.equal(api.mobileDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0)'),true);
 assert.equal(api.mobileDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X)',5),true);
});
