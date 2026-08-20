const fs = require('fs');

const FAQ_MD = 'C:/Users/HP/nevisan-website-src/faq.md';
const FAQ_HTML = 'C:/Users/HP/nevisan-website-src/faq/index.html';

// Extract Q&A pairs from markdown
function extractQA(md) {
  const pairs = [];
  const lines = md.split('\n');
  let inSection = false;

  for (const line of lines) {
    if (line.startsWith('## Key FAQ Content')) {
      inSection = true;
      continue;
    }
    if (inSection && line.startsWith('##') && !line.startsWith('## Key')) break;
    if (!inSection) continue;

    const match = line.match(/\*\*(.+?):\*\*\s*"(.+?)"/);
    if (match) {
      pairs.push({ q: match[1].toLowerCase(), a: match[2] });
    } else {
      const match2 = line.match(/\*\*(.+?):\*\*\s*(.+)/);
      if (match2) {
        pairs.push({ q: match2[1].toLowerCase(), a: match2[2] });
      }
    }
  }
  return pairs;
}

// Build keyword-to-answer mapping
function buildKeywordMap(pairs) {
  const map = {};

  for (const pair of pairs) {
    const keywords = pair.q.split(/[\s-]+/).filter(w => w.length > 2);

    // Add direct keyword mappings
    for (const kw of keywords) {
      map[kw] = pair.a;
    }

    // Add phrase mappings
    map[pair.q] = pair.a;

    // Add specific synonym mappings
    if (pair.q.includes('delivery') || pair.q.includes('shipping') || pair.q.includes('order')) {
      map['order'] = pair.a;
      map['buy'] = pair.a;
      map['purchase'] = pair.a;
      map['amazon'] = pair.a;
      map['flipkart'] = pair.a;
      map['available'] = pair.a;
      map['deliver'] = pair.a;
    }
    if (pair.q.includes('organic') || pair.q.includes('certification')) {
      map['organic'] = pair.a;
      map['certified'] = pair.a;
      map['pesticide'] = pair.a;
      map['chemical'] = pair.a;
      map['safe'] = pair.a;
      map['natural'] = pair.a;
    }
    if (pair.q.includes('shelf life') || pair.q.includes('expire')) {
      map['shelf'] = pair.a;
      map['expire'] = pair.a;
      map['fresh'] = pair.a;
      map['store'] = pair.a;
    }
    if (pair.q.includes('re-steeping') || pair.q.includes('steep')) {
      map['steep'] = pair.a;
      map['resteep'] = pair.a;
      map['multiple'] = pair.a;
      map['times'] = pair.a;
    }
    if (pair.q.includes('butterfly pea') || pair.q.includes('blue')) {
      map['butterfly'] = pair.a;
      map['blue'] = pair.a;
      map['flower'] = pair.a;
      map['purple'] = pair.a;
      map['clitoria'] = pair.a;
    }
    if (pair.q.includes('spearmint') || pair.q.includes('pcos')) {
      map['spearmint'] = pair.a;
      map['pcos'] = pair.a;
      map['hormonal'] = pair.a;
      map['testosterone'] = pair.a;
    }
    if (pair.q.includes('tulsi') || pair.q.includes('holy basil')) {
      map['tulsi'] = pair.a;
      map['holy'] = pair.a;
      map['basil'] = pair.a;
      map['adaptogen'] = pair.a;
      map['cortisol'] = pair.a;
      map['stress'] = pair.a;
    }
    if (pair.q.includes('gaba') || pair.q.includes('oolong')) {
      map['gaba'] = pair.a;
      map['oolong'] = pair.a;
      map['calming'] = pair.a;
      map['neurotransmitter'] = pair.a;
      map['focus'] = pair.a;
    }
    if (pair.q.includes('brewing') || pair.q.includes('temperature')) {
      map['brew'] = pair.a;
      map['temperature'] = pair.a;
      map['water'] = pair.a;
      map['boiling'] = pair.a;
      map['bitter'] = pair.a;
      map['75'] = pair.a;
      map['85'] = pair.a;
    }
    if (pair.q.includes('caffeine')) {
      map['caffeine'] = pair.a;
      map['coffee'] = pair.a;
      map['l-theanine'] = pair.a;
      map['energy'] = pair.a;
    }
    if (pair.q.includes('quality') || pair.q.includes('identification')) {
      map['quality'] = pair.a;
      map['real'] = pair.a;
      map['whole'] = pair.a;
      map['leaf'] = pair.a;
      map['smell'] = pair.a;
      map['artificial'] = pair.a;
    }
    if (pair.q.includes('chamomile') || pair.q.includes('sleep')) {
      map['chamomile'] = pair.a;
      map['sleep'] = pair.a;
      map['apigenin'] = pair.a;
      map['gaba'] = pair.a;
      map['calming'] = pair.a;
      map['bed'] = pair.a;
      map['night'] = pair.a;
    }
  }
  return map;
}

// Match question to answer using keyword map
function matchAnswer(question, keywordMap) {
  const q = question.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  // Count keyword matches
  let bestMatch = null;
  let bestScore = 0;

  for (const word of words) {
    if (keywordMap[word]) {
      const score = word.length; // Longer matches are better
      if (score > bestScore) {
        bestScore = score;
        bestMatch = keywordMap[word];
      }
    }
  }

  return bestMatch;
}

const md = fs.readFileSync(FAQ_MD, 'utf8');
const pairs = extractQA(md);
console.log(`Extracted ${pairs.length} Q&A pairs from markdown`);

const keywordMap = buildKeywordMap(pairs);
console.log(`Built keyword map with ${Object.keys(keywordMap).length} entries`);

let html = fs.readFileSync(FAQ_HTML, 'utf8');
const placeholder = 'For detailed information about this topic, please contact us on WhatsApp at +91 98642 45687 or explore our product pages.';

// Replace answer content with real answers where possible
const answerRegex = /<div class="answer">\s*<p>(.*?)<\/p>\s*<\/div>/g;

let match;
let updated = 0;

while ((match = answerRegex.exec(html)) !== null) {
  const currentAnswer = match[1];
  const fullMatch = match[0];

  // Find the preceding question
  const beforeMatch = html.substring(0, match.index);
  const lastQuestionMatch = beforeMatch.match(/<span class="s-text">([^<]+)<\/span>/);
  if (!lastQuestionMatch) continue;

  const question = lastQuestionMatch[1];
  const answer = matchAnswer(question, keywordMap);

  if (answer && answer !== currentAnswer) {
    const newAnswerDiv = `<div class="answer"><p>${answer}</p></div>`;
    html = html.substring(0, match.index) + newAnswerDiv + html.substring(match.index + fullMatch.length);
    answerRegex.lastIndex = match.index + newAnswerDiv.length;
    updated++;
  }
}

fs.writeFileSync(FAQ_HTML, html, 'utf8');
console.log(`Done! Updated ${updated} answers with real content.`);
