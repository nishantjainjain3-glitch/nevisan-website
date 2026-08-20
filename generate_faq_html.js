const fs = require('fs');
const path = require('path');

// Read the markdown file
const markdownPath = 'C:/Users/HP/nevisan-site/faq.md';
const htmlOutputPath = 'C:/Users/HP/nevisan-website-src/faq/index.html';

const markdown = fs.readFileSync(markdownPath, 'utf8');

// Parse sections and questions
const sections = [];
let currentSection = null;
let currentQuestion = null;
let questionBuffer = [];

const lines = markdown.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Skip the initial header and metadata
  if (line.startsWith('# Nevisan Tea') || line.startsWith('**Page Title:') || line.startsWith('## Brand & Product') || line.startsWith('- Single-origin') || line.startsWith('- PGS-India') || line.startsWith('- 100% whole-leaf') || line.startsWith('- Every batch') || line.startsWith('## Product Line') || line.startsWith('## Contact & Ordering') || line.startsWith('- WhatsApp:') || line.startsWith('- Amazon') || line.startsWith('- Bulk minimum:')) {
    continue;
  }

  // Skip product line items (1-10)
  if (/^\d+\. \*\*/.test(line)) {
    continue;
  }

  // Skip horizontal rules
  if (line.trim() === '---') {
    continue;
  }

  // Detect section headers (## or ###)
  const sectionMatch = line.match(/^##+\s+(.+)/);
  if (sectionMatch) {
    // Save previous section if exists
    if (currentSection && currentSection.questions.length > 0) {
      sections.push(currentSection);
    }

    const sectionTitle = sectionMatch[1].replace(/[🍵🫖🌿⚗️📦💰🎁🌱📱🧘🔧🎓]/g, '').trim();
    const emojiMatch = line.match(/^##+\s+([🍵🫖🌿⚗️📦💰🎁🌱📱🧘🔧🎓])/);
    const emoji = emojiMatch ? emojiMatch[1] : '📋';

    currentSection = {
      title: sectionTitle,
      emoji: emoji,
      questions: []
    };
    continue;
  }

  // Detect questions (numbered format)
  const questionMatch = line.match(/^\*\*(\d+)\.\s+(.+?)\*\*$/);
  if (questionMatch) {
    // Save previous question if exists
    if (currentQuestion) {
      currentQuestion.answer = questionBuffer.join(' ');
      currentSection.questions.push(currentQuestion);
    }

    currentQuestion = {
      number: questionMatch[1],
      text: questionMatch[2],
      answer: ''
    };
    questionBuffer = [];
    continue;
  }

  // Collect answer lines
  if (currentQuestion && line.trim()) {
    questionBuffer.push(line.trim());
  }
}

// Don't forget the last question and section
if (currentQuestion && questionBuffer.length > 0) {
  currentQuestion.answer = questionBuffer.join(' ');
  currentSection.questions.push(currentQuestion);
}
if (currentSection && currentSection.questions.length > 0) {
  sections.push(currentSection);
}

console.log(`Parsed ${sections.length} sections with ${sections.reduce((sum, s) => sum + s.questions.length, 0)} total questions`);

// Generate HTML
const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);

let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#15271B">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<title>Complete Tea FAQ — 450+ Questions Answered | Nevisan Tea</title>
<meta name="description" content="Everything you need to know before buying Nevisan tea. 450+ questions answered about every variety, health benefits, brewing, shipping, gifting and more.">
<meta property="og:title" content="Nevisan Tea FAQ — 450+ Questions Answered">
<meta property="og:description" content="450+ questions answered about every Nevisan tea variety, health benefits, brewing temperatures, 0.0% alcohol status, shipping &amp; gifting.">
<meta property="og:image" content="https://nevisan.in/hero-bg.jpg">
<meta property="og:url" content="https://nevisan.in/faq">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Nevisan Tea FAQ — 450+ Questions Answered">
<meta name="twitter:description" content="450+ questions answered about every Nevisan tea variety, health benefits, brewing, shipping &amp; gifting.">
<meta name="twitter:image" content="https://nevisan.in/hero-bg.jpg">
<link rel="canonical" href="https://nevisan.in/faq">
<link rel="icon" type="image/jpeg" href="/nevisan-logo.jpeg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-W3Q7DNWTKP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-W3Q7DNWTKP');
</script>
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --teal:      #23412D;
    --teal-dark: #15271B;
    --teal-mid:  #1E3626;
    --gold:      #C9A84C;
    --gold-lt:   #f0e4c0;
    --cream:     #F8F6F2;
    --cream-dk:  #EEE9DF;
    --text:      #1F2E24;
    --muted:     #3D5245;
    --border:    #E2DDD5;
    --white:     #ffffff;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--cream); color: var(--text); line-height: 1.7; overflow-x: hidden; }

  /* ── NAV ── */
  nav {
    background: var(--teal-dark);
    padding: 0 40px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 200;
    box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: transparent;
    -webkit-text-stroke: 0px;
    background: linear-gradient(90deg, #fff 0%, var(--gold) 55%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.04em; transition: color 0.2s; }
  .nav-link:hover { color: #fff; }
  .nav-cta {
    background: var(--gold);
    color: var(--teal-dark);
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: filter 0.2s;
  }
  .nav-cta:hover { filter: brightness(1.08); }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal-mid) 60%, #1a4a2e 100%);
    color: #fff;
    text-align: center;
    padding: 80px 24px 72px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-label {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .hero-label span { height: 1px; width: 40px; background: var(--gold); display: block; }
  .hero-label p { font-size: 11px; font-weight: 600; letter-spacing: 0.16em; color: var(--gold); text-transform: uppercase; }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 5vw, 54px);
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 18px;
  }
  .hero p { color: rgba(255,255,255,0.72); font-size: 16px; max-width: 500px; margin: 0 auto 28px; }
  .hero-badge {
    display: inline-block;
    background: rgba(201,168,76,0.15);
    border: 1px solid rgba(201,168,76,0.4);
    color: var(--gold);
    padding: 8px 22px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  /* ── CATEGORY NAV ── */
  .cat-nav {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    overflow-x: auto;
    white-space: nowrap;
    position: sticky;
    top: 64px;
    z-index: 100;
    scrollbar-width: none;
  }
  .cat-nav::-webkit-scrollbar { display: none; }
  .cat-inner { display: inline-flex; gap: 6px; padding: 12px 0; }
  .cat-btn {
    display: inline-block;
    background: none;
    border: 1.5px solid var(--border);
    color: var(--muted);
    padding: 7px 16px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
    letter-spacing: 0.03em;
  }
  .cat-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  .cat-btn.active { background: var(--teal); color: #fff; border-color: var(--teal); }

  /* ── MAIN ── */
  .main { max-width: 860px; margin: 0 auto; padding: 60px 24px 100px; }

  /* ── SECTION ── */
  .section { margin-bottom: 64px; scroll-margin-top: 130px; }
  .section-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid var(--border); }
  .section-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .ic-teal { background: rgba(35,65,45,0.1); }
  .ic-gold { background: rgba(201,168,76,0.12); }
  .section-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 400; color: var(--teal-dark); }
  .section-count { font-size: 12px; color: var(--muted); margin-top: 2px; letter-spacing: 0.02em; }

  /* ── ACCORDION ── */
  .qa-list { display: flex; flex-direction: column; gap: 3px; }
  details {
    background: var(--white);
    border-radius: 12px;
    border: 1px solid var(--border);
    overflow: hidden;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  details:hover { box-shadow: 0 2px 16px rgba(35,65,45,0.07); }
  details[open] { box-shadow: 0 6px 28px rgba(35,65,45,0.1); border-color: rgba(35,65,45,0.2); }
  summary {
    padding: 18px 22px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    list-style: none;
    user-select: none;
  }
  summary::-webkit-details-marker { display: none; }
  .s-text { flex: 1; line-height: 1.45; }
  .s-icon {
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--cream);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: transform 0.25s, background 0.2s, color 0.2s;
    font-size: 15px;
    color: var(--teal);
    font-weight: 400;
  }
  details[open] .s-icon { transform: rotate(45deg); background: var(--teal); color: #fff; }
  .answer {
    padding: 0 22px 20px;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.82;
    border-top: 1px solid var(--border);
    padding-top: 16px;
  }
  .answer p { margin-bottom: 10px; }
  .answer p:last-child { margin-bottom: 0; }
  .answer strong { color: var(--teal); font-weight: 600; }
  .tag {
    display: inline-block;
    background: rgba(35,65,45,0.08);
    color: var(--teal);
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    margin: 0 2px;
  }

  /* ── CTA ── */
  .cta-strip {
    background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal-mid) 100%);
    border-radius: 20px;
    padding: 48px 40px;
    text-align: center;
    margin: 56px 0;
    position: relative;
    overflow: hidden;
  }
  .cta-strip::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    background: rgba(201,168,76,0.08);
    border-radius: 50%;
  }
  .cta-strip h2 { font-family: 'Playfair Display', serif; color: #fff; font-size: 28px; font-weight: 400; margin-bottom: 10px; }
  .cta-strip p { color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 24px; }
  .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-gold { display: inline-block; background: var(--gold); color: var(--teal-dark); padding: 13px 30px; border-radius: 8px; font-weight: 700; font-size: 13px; text-decoration: none; letter-spacing: 0.04em; transition: filter 0.2s; }
  .btn-gold:hover { filter: brightness(1.08); }
  .btn-outline { display: inline-block; border: 1px solid rgba(255,255,255,0.35); color: #fff; padding: 13px 30px; border-radius: 8px; font-size: 13px; text-decoration: none; transition: background 0.2s; }
  .btn-outline:hover { background: rgba(255,255,255,0.1); }

  /* ── FOOTER ── */
  footer {
    background: var(--teal-dark);
    color: rgba(255,255,255,0.55);
    text-align: center;
    padding: 32px 24px;
    font-size: 13px;
    line-height: 1.8;
  }
  footer a { color: rgba(255,255,255,0.75); text-decoration: none; }
  footer a:hover { color: var(--gold); }

  @media (max-width: 640px) {
    nav { padding: 0 20px; }
    .hero { padding: 60px 20px 52px; }
    .main { padding: 40px 16px 72px; }
    summary { font-size: 14px; padding: 15px 16px; }
    .answer { font-size: 13px; padding: 0 16px 16px; padding-top: 14px; }
    .cta-strip { padding: 36px 24px; }
    .cta-strip h2 { font-size: 22px; }
  }
  .footer-licenses {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;
    flex-wrap: wrap;
  }
  .license-badge {
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.06em;
    font-family: 'Inter', sans-serif;
  }
</style>
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
`;

// Generate JSON-LD schema (first 10 questions for SEO)
const schemaQuestions = [];
for (const section of sections.slice(0, 3)) {
  for (const q of section.questions.slice(0, 3)) {
    schemaQuestions.push({
      "@type": "Question",
      "name": q.text,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer.substring(0, 200) + (q.answer.length > 200 ? '...' : '')
      }
    });
  }
}

html += schemaQuestions.map(q => `        {
            "@type": "Question",
            "name": "${q.name.replace(/"/g, '\\"')}",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "${q.acceptedAnswer.text.replace(/"/g, '\\"')}"
            }
        }`).join(',\n');

html += `
    ]
}
</script>
</head>
<body>

<nav>
  <a href="/" class="nav-logo">NEVISAN</a>
  <div class="nav-right">
    <a href="/#products" class="nav-link">Shop Teas</a>
    <a href="/#story" class="nav-link">Our Story</a>
    <a href="/#contact" class="nav-link">Contact</a>
    <a href="https://wa.me/919864245687" class="nav-cta">Order on WhatsApp</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-label"><span></span><p>Knowledge Base</p><span></span></div>
  <h1>Complete Tea FAQ</h1>
  <p>Everything you need to know about Nevisan tea — from garden to cup, brewing to gifting.</p>
  <div class="hero-badge">${totalQuestions}+ Questions Answered</div>
</section>

<div class="cat-nav">
  <div class="cat-inner">
`;

// Generate category navigation
for (const section of sections) {
  const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  html += `    <button class="cat-btn" onclick="document.getElementById('${sectionId}').scrollIntoView({behavior:'smooth'})">${section.emoji} ${section.title}</button>\n`;
}

html += `  </div>
</div>

<div class="main">
`;

// Generate sections and questions
for (const section of sections) {
  const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  html += `<div class="section" id="${sectionId}">
  <div class="section-head">
    <div class="section-icon ic-teal">${section.emoji}</div>
    <div>
      <div class="section-title">${section.title}</div>
      <div class="section-count">${section.questions.length} questions</div>
    </div>
  </div>
  <div class="qa-list">
`;

  for (const q of section.questions) {
    // Escape HTML special characters
    const escapedText = q.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedAnswer = q.answer.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Convert markdown bold to HTML strong
    const formattedAnswer = escapedAnswer.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    html += `    <details>
      <summary>
        <span class="s-text">${escapedText}</span>
        <span class="s-icon">+</span>
      </summary>
      <div class="answer">
        <p>${formattedAnswer}</p>
      </div>
    </details>
`;
  }

  html += `  </div>
</div>

`;
}

// CTA strip
html += `<div class="cta-strip">
  <h2>Still have questions?</h2>
  <p>Chat directly with the Nevisan team on WhatsApp for personalised tea recommendations.</p>
  <div class="cta-btns">
    <a href="https://wa.me/919864245687" class="btn-gold">Chat on WhatsApp</a>
    <a href="/#products" class="btn-outline">Explore Our Teas</a>
  </div>
</div>

</div>

<footer>
  <p>&copy; 2024 Nevisan Tea. All rights reserved. | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a></p>
  <div class="footer-licenses">
    <span class="license-badge">PGS-India Organic</span>
    <span class="license-badge">FSSAI Licensed</span>
    <span class="license-badge">Single Origin</span>
  </div>
</footer>

</body>
</html>`;

// Write the HTML file
fs.writeFileSync(htmlOutputPath, html, 'utf8');
console.log(`Successfully generated FAQ HTML at: ${htmlOutputPath}`);
console.log(`Total sections: ${sections.length}`);
console.log(`Total questions: ${totalQuestions}`);
