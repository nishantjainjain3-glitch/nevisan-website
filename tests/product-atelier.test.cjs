const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function env(){const states=[],refs=[];let si=0,ri=0;const React={createElement:(type,props,...children)=>({type,props:props||{},children}),useState:initial=>{const i=si++;if(!(i in states))states[i]=initial;return[states[i],v=>states[i]=typeof v==='function'?v(states[i]):v];},useRef:initial=>{const i=ri++;return refs[i]||(refs[i]={current:initial});}};const context=vm.createContext({React,window:{}});vm.runInContext(fs.readFileSync('product-atelier.js','utf8'),context);return {states,refs,render(){si=ri=0;return context.window.NevisanAtelier.ProductAtelier();}};}
function flatten(tree){return[tree,...tree.children.flat(Infinity).filter(x=>x&&typeof x==='object').flatMap(flatten)];}
function find(e,predicate){return flatten(e.render()).find(predicate);}

test('every selectable tea shows the catalogue MRP and brewing directions',()=>{
 const e=env(),catalog=JSON.parse(fs.readFileSync('content/product-catalog.json','utf8')).products;
 const choices=find(e,n=>n.props['aria-label']==='Choose your tea').children[0];
 for(const button of choices){
  button.props.onClick();
  const profile=find(e,n=>n.props.className==='atelier__profile');
  const nodes=flatten(profile),name=nodes.find(n=>n.type==='h3').children[0];
  const product=catalog.find(p=>p.name===name);
  assert(product,name);
  assert.deepEqual(nodes.filter(n=>n.type==='dd').map(n=>n.children[0]),[product.brew.water,product.brew.time,'50g · MRP ₹'+product.mrp]);
 }
});
test('gallery uses reviewed illustrations and never presents artwork as a current pack photo',()=>{const e=env();assert.equal(find(e,n=>n.type==='img').props.src,'/teas/display/gaba.webp');assert.match(find(e,n=>n.props.className==='atelier__caption').children.join(' '),/not current packet photographs/);});
test('unverified front and back packaging controls are absent',()=>{const e=env();assert(!find(e,n=>n.type==='button'&&n.children.some(c=>typeof c==='string'&&/pouch/i.test(c))));assert(!fs.readFileSync('product-atelier.js','utf8').includes('/teas/packaging/'));});
test('all ten teas retain reviewed illustration assets and correct product links',()=>{const e=env();const group=find(e,n=>n.props['aria-label']==='Choose your tea');assert.equal(group.children[0].length,10);for(const button of group.children[0]){button.props.onClick();const img=find(e,n=>n.type==='img').props.src;assert.match(img,/^\/teas\/display\//);assert(fs.existsSync('.'+img));assert(fs.existsSync('.'+find(e,n=>n.type==='a').props.href+'index.html'));}});
test('missing image retains shopping link and choosing another tea recovers',()=>{const e=env();find(e,n=>n.type==='img').props.onError();assert(find(e,n=>n.props.className==='atelier__unavailable'));assert.equal(find(e,n=>n.type==='a').props.href,'/products/gaba-oolong-tea/');find(e,n=>n.props['aria-label']==='Choose your tea').children[0][1].props.onClick();assert(find(e,n=>n.type==='img'));});
