const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('quiz/index.html', 'utf8');
const source = html.slice(html.indexOf('const teas ='), html.indexOf('</script>', html.indexOf('const teas =')));
function setup() {
  const elements = new Map();
  const get = id => {
    if (!elements.has(id)) elements.set(id, {innerHTML:'', textContent:'', style:{}, classList:{add(){},remove(){}}, querySelector(){return {focus(){}};}});
    return elements.get(id);
  };
  const context = vm.createContext({window:{}, document:{getElementById:get,querySelector(){return {focus(){}};}},encodeURIComponent});
  vm.runInContext(source, context);
  return {context, elements};
}
test('all 216 quiz paths reach a product page, all ten teas are reachable, and restart resets progress', () => {
  const outcomes = new Set();
  for (let first=0;first<6;first++) for(let second=0;second<9;second++) for(let third=0;third<4;third++) {
    const {context,elements}=setup();
    context.window.selectOption(first);
    assert.equal(elements.get('quiz-progress').textContent,'Question 2 of 3');
    context.window.selectOption(second);
    assert.equal(elements.get('quiz-progress').textContent,'Question 3 of 3');
    context.window.selectOption(third);
    const result=elements.get('quiz-flow').innerHTML;
    const path=result.match(/href="(\/products\/[^"]+)"/)[1];
    assert.ok(fs.existsSync('.'+path+'index.html'),path);
    assert.ok(result.includes('https://www.amazon.in/dp/'));
    assert.ok(result.includes('https://www.flipkart.com/'));
    outcomes.add(path);
    context.window.restartQuiz();
    assert.equal(elements.get('quiz-progress').textContent,'Question 1 of 3');
  }
  assert.equal(outcomes.size,10);
});
