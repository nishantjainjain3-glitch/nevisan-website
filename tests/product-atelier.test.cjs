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
test('gallery presents the complete image without artificial pouch geometry',()=>{const e=env();assert.equal(find(e,n=>n.type==='img').props.src,'/teas/gaba-lifestyle.webp');assert(!find(e,n=>n.props.className==='atelier__pack'));});
test('back and ritual controls select the matching images',()=>{const e=env();find(e,n=>n.type==='button'&&n.children.includes('Back of pouch')).props.onClick();assert.equal(find(e,n=>n.type==='img').props.src,'/teas/packaging/gaba-back.webp');find(e,n=>n.type==='button'&&n.children.includes('Tea ritual')).props.onClick();assert.equal(find(e,n=>n.type==='img').props.src,'/teas/editorial/gaba-ritual.webp');});
test('all ten teas have matching gallery assets and product links; changing tea resets view',()=>{const e=env();find(e,n=>n.type==='button'&&n.children.includes('Back of pouch')).props.onClick();const group=find(e,n=>n.props['aria-label']==='Choose your tea');assert.equal(group.children[0].length,10);for(const button of group.children[0]){button.props.onClick();const img=find(e,n=>n.type==='img').props.src;assert(fs.existsSync('.'+img));assert(fs.existsSync('.'+find(e,n=>n.type==='a').props.href+'index.html'));find(e,n=>n.type==='button'&&n.children.includes('Back of pouch')).props.onClick();assert(fs.existsSync('.'+find(e,n=>n.type==='img').props.src));}});
test('missing image retains shopping link and choosing another view recovers',()=>{const e=env();find(e,n=>n.type==='img').props.onError();assert(find(e,n=>n.props.className==='atelier__unavailable'));assert.equal(find(e,n=>n.type==='a').props.href,'/products/gaba-oolong-tea/');find(e,n=>n.type==='button'&&n.children.includes('Back of pouch')).props.onClick();assert(find(e,n=>n.type==='img'));});
