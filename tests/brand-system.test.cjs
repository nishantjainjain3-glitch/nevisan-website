const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
function pages(root='.'){
 return fs.readdirSync(root,{withFileTypes:true}).flatMap(e=>{
  if(['.git','.agents','node_modules','oauth'].includes(e.name))return [];
  const file=path.join(root,e.name);return e.isDirectory()?pages(file):file.endsWith('.html')?[file]:[];
 });
}
test('customer pages share one accessible brand header and footer, stylesheet and working internal destinations',()=>{
 let count=0;
 for(const file of pages()){
  const html=fs.readFileSync(file,'utf8');if(!html.includes('<main')&&file!=='index.html'&&file!==path.join('quiz','index.html'))continue;count++;
  assert.equal((html.match(/class="brand-header"/g)||[]).length,1,file);
  assert.equal((html.match(/class="brand-footer"/g)||[]).length,1,file);
  assert.match(html,/<body[^>]*class="[^"]*brand-unified/,file);
  assert.ok(html.includes('/brand-system.css?v=1'),file);
  assert.ok(html.includes('/brand-shell.js?v=1'),file);
  const header=html.match(/<!-- nevisan-brand-header:start -->(.*?)<!-- nevisan-brand-header:end -->/s)[1];
  assert.ok(header.includes('<details class="brand-menu">'),file);
  assert.ok(header.includes('href="/compare/"'),file);
  assert.ok(header.includes('href="/checkout/'),file);
  assert.ok(html.includes('id="main-content"')||file==='index.html',file);
  for(const match of header.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)){
   const target=new URL(match[1],'https://nevisan.in').pathname;assert.ok(fs.existsSync('.'+target+(target.endsWith('/')?'index.html':'')),file+': '+target);
  }
 }
 assert.equal(count,58);
});
