/* Product gallery using the complete supplied product and ritual images. */
(function () {
  'use strict';
  const h = React.createElement;
  const teas = [
    { key:'gaba', name:'GABA Oolong Tea', slug:'gaba-oolong-tea', notes:'Toasty amber. Stone fruit. Smooth honey.', water:'85°C', time:'2–3 minutes', accent:'#bc9445' },
    { key:'spearmint', name:'Spearmint Green Tea', slug:'spearmint-green-tea', notes:'Fresh mint. A clean, bright finish.', water:'85°C', time:'2 minutes', accent:'#288e80' },
    { key:'blue-flower', name:'Blue Flower Green Tea', slug:'blue-flower-green-tea', notes:'Soft florals. A vivid blue cup.', water:'85°C', time:'2–3 minutes', accent:'#577fa9' },
    { key:'ginger', name:'Ginger Green Tea', slug:'ginger-green-tea', notes:'Ginger warmth. Mellow green tea.', water:'85°C', time:'2–3 minutes', accent:'#a79443' },
    {key:'organic',name:'Organic Green Tea',slug:'organic-green-tea',notes:'Fresh, grassy notes. Whole-leaf character.',water:'85°C',time:'2 minutes'},
    {key:'tulsi',name:'Tulsi Green Tea',slug:'tulsi-green-tea',notes:'Herbaceous warmth. Fragrant tulsi.',water:'85°C',time:'2 minutes'},
    {key:'chamomile',name:'Chamomile Green Tea',slug:'chamomile-green-tea',notes:'Soft florals. Honeyed apple notes.',water:'85°C',time:'2 minutes'},
    {key:'lemongrass',name:'Lemongrass Green Tea',slug:'lemongrass-green-tea',notes:'Bright citrus. A gentle grassy finish.',water:'85°C',time:'2 minutes'},
    {key:'rum',name:'Rum Green Tea',slug:'rum-green-tea',notes:'Sugarcane warmth. Spice and oak.',water:'85°C',time:'2 minutes'},
    {key:'whiskey',name:'Whiskey Green Tea',slug:'whiskey-green-tea',notes:'Malt character. Smoky oak notes.',water:'85°C',time:'2 minutes'}
  ];
  function ProductAtelier() {
    const [selected, setSelected] = React.useState(0);
    const [view, setView] = React.useState('pack');
    const [failed, setFailed] = React.useState(false);
    const tea = teas[selected];
    const details = {gaba:'gaba-ritual',spearmint:'spearmint-cup','blue-flower':'blue-flower-cup',ginger:'ginger-branded-ritual',organic:'organic-branded-ritual',tulsi:'tulsi-ritual',chamomile:'chamomile-branded-ritual',lemongrass:'lemongrass-branded-ritual',rum:'rum-ritual',whiskey:'whiskey-ritual'};
    const choose = index => { setSelected(index); setView('pack'); setFailed(false); };
    const detail = details[tea.key];
    const image = view === 'back' ? `/teas/packaging/${tea.key}-back.webp` : view === 'ritual' && detail ? `/teas/editorial/${detail}.webp` : `/teas/${tea.key}-lifestyle.webp`;
    return h('section',{className:'atelier',id:'brew-ritual','aria-labelledby':'atelier-title',style:{'--pack-accent':tea.accent}},
      h('div',{className:'atelier__inner'},
        h('div',{className:'atelier__visual'},
          h('p',{className:'lux-eyebrow'},'THE NEVISAN ATELIER'),
          h('figure',{className:'atelier__image'},failed ? h('div',{className:'atelier__unavailable'},h('span',null,'NEVISAN'),h('strong',null,tea.name)) : h('img',{key:image,src:image,width:1254,height:1254,alt:`${tea.name} — ${view === 'back' ? 'back of pouch artwork' : view === 'ritual' ? 'tea ritual scene' : 'pouch and tea scene'}`,loading:'lazy',decoding:'async',onError:()=>setFailed(true)})),
          h('div',{className:'atelier__views',role:'group','aria-label':'Choose product image'},(detail ? ['pack','back','ritual'] : ['pack','back']).map(item=>h('button',{type:'button',key:item,'aria-pressed':view===item,onClick:()=>{setView(item);setFailed(false);}},item==='pack'?'Pouch & tea':item==='back'?'Back of pouch':'Tea ritual'))),
          h('p',{className:'atelier__caption'},'Whole leaves. Beautiful cups. Everyday rituals.')
        ),
        h('div',{className:'atelier__copy'},
          h('p',{className:'lux-eyebrow'},'ONE ORIGIN. YOUR EXPRESSION.'),
          h('h2',{id:'atelier-title'},'A leaf from Assam.',h('br'),h('em',null,'A ritual of your own.')),
          h('p',{className:'atelier__intro'},'Explore the collection, find your flavour, and try a cup that fits your day.'),
          h('div',{className:'atelier__choices',role:'group','aria-label':'Choose your tea'},teas.map((item,index)=>h('button',{type:'button',key:item.key,'aria-pressed':index===selected,onClick:()=>choose(index)},item.name.replace(' Green Tea','').replace(' Oolong Tea',' Oolong')))),
          h('div',{className:'atelier__profile','aria-live':'polite'},h('h3',null,tea.name),h('p',null,tea.notes),h('dl',null,h('div',null,h('dt',null,'Water'),h('dd',null,tea.water)),h('div',null,h('dt',null,'First steep'),h('dd',null,tea.time)),h('div',null,h('dt',null,'Pack'),h('dd',null,'50g · ₹499')))),
          h('a',{className:'lux-button lux-button--ivory',href:`/products/${tea.slug}/`},'Explore this tea ↗'),
          h('p',{className:'atelier__footnote'},'Follow the brewing guide on your pack, then adjust to taste. Green and oolong teas naturally contain caffeine.')
        )
      )
    );
  }
  window.NevisanAtelier = { ProductAtelier };
})();
