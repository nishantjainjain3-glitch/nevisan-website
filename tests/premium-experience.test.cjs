const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function events(target = {}) {
  const listeners = new Map();
  return Object.assign(target, {
    listeners,
    addEventListener(name, fn) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); },
    removeEventListener(name, fn) { listeners.get(name)?.delete(fn); },
    emit(name, value) { listeners.get(name)?.forEach(fn => fn(value)); }
  });
}
function environment({ reduced = false, webglFails = false, missingThree = false, wide = true, saveData = false } = {}) {
  const frames = new Map(), objects = [], observers = [];
  const motion = events({ matches: reduced });
  const document = events({ hidden: false });
  const host = events({ clientWidth: 600, clientHeight: 490, children: [], appendChild(node) { this.children.push(node); node.parent = this; }, getBoundingClientRect() { return { left: 0, top: 0, width: 600, height: 490 }; } });
  function vector() { return { x: 0, y: 0, z: 0, set(x,y,z) { this.x=x;this.y=y;this.z=z; } }; }
  class Object3D {
    constructor() { this.position=vector();this.rotation=vector();this.children=[];objects.push(this); }
    add(child) { this.children.push(child); }
  }
  class Geometry { constructor() { this.disposals=0;objects.push(this); } setAttribute(){return this;} setIndex(){return this;} computeVertexNormals(){} dispose(){this.disposals++;} }
  class Material { constructor(config) { this.colour=config.color;this.color={set:value=>this.colour=value};this.disposals=0;objects.push(this); } dispose(){this.disposals++;} }
  class Mesh extends Object3D { constructor(geometry,material){super();this.geometry=geometry;this.material=material;} }
  class Camera extends Object3D { lookAt(){} updateProjectionMatrix(){} }
  class Renderer {
    constructor() {
      if(webglFails) throw Error('WebGL disabled');
      this.renders=0;this.disposals=0;
      this.domElement=events({ setAttribute(){}, remove(){ const p=this.parent;if(p)p.children=p.children.filter(n=>n!==this); } });
      objects.push(this);
    }
    setPixelRatio(){} setSize(){} render(){this.renders++;} dispose(){this.disposals++;}
  }
  class Observer { constructor(callback){this.callback=callback;observers.push(this);} observe(){} disconnect(){this.disconnected=true;} }
  const THREE = { Scene:Object3D, Group:Object3D, PerspectiveCamera:Camera, Mesh, WebGLRenderer:Renderer,
    MeshPhysicalMaterial:Material, MeshStandardMaterial:Material, HemisphereLight:Object3D, DirectionalLight:Object3D,
    CylinderGeometry:Geometry,TorusGeometry:Geometry,LatheGeometry:Geometry,CircleGeometry:Geometry,BufferGeometry:Geometry,
    Float32BufferAttribute:class {}, Vector2:class {}, DoubleSide:2,sRGBEncoding:3001,ACESFilmicToneMapping:4 };
  const window=events({innerWidth:1200,devicePixelRatio:2,matchMedia:query=>query.includes('reduced-motion')?motion:events({matches:wide}),THREE:missingThree?undefined:THREE});
  let id=0;
  const context={React:{createElement:(type,props,...children)=>({type,props:props||{},children}),useEffect(){},useRef:value=>({current:value}),useState:value=>[typeof value==='function'?value():value,()=>{}]},window,document,navigator:{connection:{saveData}},IntersectionObserver:Observer,ResizeObserver:Observer,
    requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id)};
  vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../premium-experience.js'),'utf8'),context);
  let ready=0,failure=0;
  const controller=window.NevisanPremium.createRitualScene(host,'#ba671b',()=>ready++,()=>failure++);
  return {controller,frames,objects,observers,host,document,motion,premium:window.NevisanPremium,counts:()=>({ready,failure})};
}
function elements(tree) { return [tree,...tree.children.flat(Infinity).filter(item=>item&&typeof item==='object').flatMap(elements)]; }
test('Hero avoids video downloads on mobile, reduced motion, and data saver',()=>{
  for(const options of [{wide:false},{reduced:true},{saveData:true}]){
    const e=environment(options);const nodes=elements(e.premium.Hero({setPage(){}}));assert.equal(nodes.filter(n=>n.type==='video').length,0);assert.equal(nodes.filter(n=>n.type==='picture').length,1);e.controller.dispose();
  }
  const e=environment();const nodes=elements(e.premium.Hero({setPage(){}}));assert.equal(nodes.filter(n=>n.type==='video').length,1);e.controller.dispose();
});
test('Hero has one heading and collection/story actions retain their destinations',()=>{
  const e=environment(), destinations=[];const nodes=elements(e.premium.Hero({setPage:value=>destinations.push(value)}));
  assert.equal(nodes.filter(n=>n.type==='h1').length,1);
  nodes.filter(n=>n.props.className==='lux-button lux-button--ivory'||n.props.className==='lux-text-button').forEach(n=>n.props.onClick());
  assert.deepEqual(destinations,['Collection','Our Story']);e.controller.dispose();
});
test('No Three.js or disabled WebGL leaves the product-photo fallback usable',()=>{
  for(const options of [{missingThree:true},{webglFails:true}]){
    const e=environment(options);assert.equal(e.controller,null);assert.deepEqual(e.counts(),{ready:0,failure:1});assert.equal(e.host.children.length,0);assert.equal(e.frames.size,0);
  }
});
test('Decorative animation runs only in view and pauses while the tab is hidden',()=>{
  const e=environment();assert.equal(e.frames.size,0);
  e.observers[0].callback([{isIntersecting:true}]);assert.equal(e.frames.size,1);
  e.document.hidden=true;e.document.emit('visibilitychange');assert.equal(e.frames.size,0);
  e.document.hidden=false;e.document.emit('visibilitychange');assert.equal(e.frames.size,1);
  e.observers[0].callback([{isIntersecting:false}]);assert.equal(e.frames.size,0);e.controller.dispose();
});
test('Reduced motion stops ambient frames but preserves explicit rotation and tea choices',()=>{
  const e=environment({reduced:true});e.observers[0].callback([{isIntersecting:true}]);assert.equal(e.frames.size,0);
  e.controller.rotate(45);const group=e.objects.find(o=>o.children?.some(c=>c.geometry));assert.equal(group.rotation.y,Math.PI/4);
  e.controller.setColour('#3658be');assert.equal(e.objects.filter(o=>o.colour==='#3658be').length,2);e.controller.dispose();
});
test('Changing motion preferences takes effect without navigating away',()=>{
  const e=environment();e.observers[0].callback([{isIntersecting:true}]);assert.equal(e.frames.size,1);
  e.motion.matches=true;e.motion.emit('change');assert.equal(e.frames.size,0);
  e.motion.matches=false;e.motion.emit('change');assert.equal(e.frames.size,1);e.controller.dispose();
});
test('Context loss shows a fallback and stops frames until the context is restored',()=>{
  const e=environment();e.observers[0].callback([{isIntersecting:true}]);
  e.host.children[0].emit('webglcontextlost',{preventDefault(){}});assert.equal(e.frames.size,0);assert.equal(e.counts().failure,1);
  e.document.emit('visibilitychange');assert.equal(e.frames.size,0);
  e.host.children[0].emit('webglcontextrestored');assert.equal(e.frames.size,1);assert.equal(e.counts().ready,2);e.controller.dispose();
});
test('Navigating away disposes GPU objects once and removes all observers and listeners',()=>{
  const e=environment();e.observers[0].callback([{isIntersecting:true}]);e.controller.dispose();
  assert.equal(e.frames.size,0);assert.equal(e.host.children.length,0);
  for(const o of e.objects.filter(o=>'disposals' in o))assert.equal(o.disposals,1);
  for(const target of [e.host,e.document,e.motion])for(const group of target.listeners.values())assert.equal(group.size,0);
  assert(e.observers.every(o=>o.disconnected));
});
test('every collection card provides native links to its full product page',()=>{
 const e=environment();
 for(const name of ['GABA Oolong Tea','Spearmint Green Tea','Blue Flower Green Tea','Ginger Green Tea','Organic Green Tea','Tulsi Green Tea','Lemongrass Green Tea','Chamomile Green Tea','Rum Green Tea','Whiskey Green Tea']){
  const nodes=elements(e.premium.TeaCard({tea:{name,img:'/teas/example-lifestyle.webp'},onView(){throw Error('Preview should not intercept product links');},onImageClick(){},BuyModal(){}}));
  const links=nodes.filter(n=>n.type==='a');const expected='/products/'+name.toLowerCase().replace(/\s+/g,'-')+'/';assert.equal(links.length,2);assert(links.every(n=>n.props.href===expected));
 }
 e.controller.dispose();
});
