const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
test('image preview escapes animated page containers, locks scrolling and cleans up on close',()=>{
 const effects=[],listeners=new Map(),body={style:{overflow:'auto'}};let closed=0;
 const context={document:{body},window:{addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:(name,fn)=>{if(listeners.get(name)===fn)listeners.delete(name);}},useEffect:fn=>effects.push(fn),React:{createElement:(type,props,...children)=>({type,props,children})},ReactDOM:{createPortal:(content,target)=>({content,target})}};
 vm.createContext(context);const source=fs.readFileSync('app.js','utf8');vm.runInContext(source.slice(source.indexOf('function ImageLightbox'),source.indexOf('function CollectionPage')),context);
 const result=context.ImageLightbox({img:'/teas/gaba-lifestyle.webp',name:'GABA Oolong Tea',onClose:()=>closed++});assert.equal(result.target,body);assert.equal(result.content.props.role,'dialog');const cleanup=effects[0]();assert.equal(body.style.overflow,'hidden');listeners.get('keydown')({key:'Escape'});assert.equal(closed,1);cleanup();assert.equal(body.style.overflow,'auto');assert.equal(listeners.size,0);
 const caption=result.content.children.at(-1);assert.equal(caption.children.at(-1).props.href,'/products/gaba-oolong-tea/');
});
