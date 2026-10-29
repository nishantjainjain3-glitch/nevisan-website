const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file,'utf8').replaceAll('\r\n','\n')).digest('hex');
test('production JavaScript matches current sources and is smaller; rebuild after source changes',()=>{
 const manifest=require('../assets/js-manifest.json');
 for(const [source,item] of Object.entries(manifest)){
  assert.equal(hash(source),item.source_sha256,source+': run scripts/build_production_js.py');
  assert.equal(hash(item.output),item.output_sha256,item.output);
  assert.ok(fs.statSync(item.output).size<fs.statSync(source).size*.95);
 }
 const home=fs.readFileSync('index.html','utf8');
 assert.ok(home.includes('/assets/app.min.js'));
 assert.ok(home.includes('/vendor/react-18.3.1.min.js'));
 assert.ok(!home.includes('maps/embed'));
 assert.ok(!home.includes('src="https://unpkg.com/'));
 assert.ok(fs.statSync('brand-mark-96.webp').size<4000);
 assert.ok(fs.statSync('hero-mobile.webp').size<fs.statSync('hero-mobile-fast.webp').size);
});
