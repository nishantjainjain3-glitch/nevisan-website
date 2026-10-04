const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('app.js','utf8');
const start = source.indexOf('const NEVISAN_PAGE_ROUTES');
const end = source.indexOf('function App()', start);
const context = vm.createContext({URL});
vm.runInContext(source.slice(start,end), context);
test('legacy product links, direct page routes and tea deep links select the intended page',()=> {
 for (const [url,page] of [['/#collection','Collection'],['/#about','Our Story'],['/#our-story','Our Story'],['/#company','About'],['/?page=contact','Contact'],['/?tea=gaba-oolong-tea','Collection'],['/#brew-ritual','Home'],['/#premium-collection','Home'],['/#journal','Journal'],['/#wholesale','Wholesale']]) assert.equal(context.getNevisanPageFromUrl(url),page);
 assert.equal(context.getNevisanPageFromUrl('/#%ZZ'),'Home');
});
