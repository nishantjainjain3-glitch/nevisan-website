/* A native CSS 3D packaging preview using the supplied front photographs. */
(function () {
  'use strict';
  const h = React.createElement;
  const teas = [
    { key:'gaba', name:'GABA Oolong Tea', slug:'gaba-oolong-tea', notes:'Toasty amber. Stone fruit. Smooth honey.', water:'85°C', time:'2–3 minutes', accent:'#bc9445' },
    { key:'spearmint', name:'Spearmint Green Tea', slug:'spearmint-green-tea', notes:'Fresh mint. A clean, bright finish.', water:'85°C', time:'2 minutes', accent:'#288e80' },
    { key:'blue-flower', name:'Blue Flower Green Tea', slug:'blue-flower-green-tea', notes:'Soft florals. A vivid blue cup.', water:'85°C', time:'2–3 minutes', accent:'#577fa9' },
    { key:'ginger', name:'Ginger Green Tea', slug:'ginger-green-tea', notes:'Ginger warmth. Mellow green tea.', water:'85°C', time:'2–3 minutes', accent:'#a79443' }
  ];
  function ProductAtelier() {
    const [selected, setSelected] = React.useState(0);
    const [angle, setAngle] = React.useState(-14);
    const [failed, setFailed] = React.useState(false);
    const drag = React.useRef(null);
    const tea = teas[selected];
    const clamp = value => Math.max(-52, Math.min(52, value));
    const choose = index => { setSelected(index); setFailed(false); };
    const stop = event => {
      if (!drag.current || drag.current.id !== event.pointerId) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      drag.current = null;
    };
    return h('section',{className:'atelier',id:'brew-ritual','aria-labelledby':'atelier-title',style:{'--pack-accent':tea.accent}},
      h('div',{className:'atelier__inner'},
        h('div',{className:'atelier__visual'},
          h('p',{className:'lux-eyebrow'},'THE NEVISAN ATELIER'),
          h('div',{className:'atelier__stage',onPointerDown:event=>{if(event.button!==0)return;drag.current={id:event.pointerId,x:event.clientX,angle};event.currentTarget.setPointerCapture(event.pointerId);},onPointerMove:event=>{if(drag.current?.id===event.pointerId)setAngle(clamp(drag.current.angle+(event.clientX-drag.current.x)*.3));},onPointerUp:stop,onPointerCancel:stop,onLostPointerCapture:()=>{drag.current=null;}},
            h('div',{className:'atelier__halo','aria-hidden':'true'}),
            h('div',{className:'atelier__pack',style:{transform:`rotateY(${angle}deg) rotateX(-3deg)`}},
              h('div',{className:'atelier__back','aria-hidden':'true'}),
              h('div',{className:'atelier__side atelier__side--left','aria-hidden':'true'}),
              h('div',{className:'atelier__side atelier__side--right','aria-hidden':'true'}),
              h('div',{className:'atelier__front'},failed ? h('div',{className:'atelier__unavailable'},h('span',null,'NEVISAN'),h('strong',null,tea.name)) : h('img',{key:tea.key,src:`/teas/packaging/${tea.key}.webp`,width:1100,height:1100,alt:`${tea.name} — supplied front packaging artwork`,loading:'lazy',draggable:false,onError:()=>setFailed(true)}))
            ),
            h('div',{className:'atelier__plinth','aria-hidden':'true'})
          ),
          h('div',{className:'atelier__controls'},h('label',{htmlFor:'pack-rotation'},'Rotate the pouch'),h('input',{id:'pack-rotation',type:'range',min:-52,max:52,step:1,value:Math.round(angle),'aria-label':'Rotate product pouch',onChange:event=>setAngle(clamp(Number(event.target.value)))}),h('button',{type:'button',onClick:()=>setAngle(0)},'Front view')),
          h('p',{className:'atelier__caption'},'Drag to explore · Front artwork preview')
        ),
        h('div',{className:'atelier__copy'},
          h('p',{className:'lux-eyebrow'},'ONE ORIGIN. YOUR EXPRESSION.'),
          h('h2',{id:'atelier-title'},'A leaf from Assam.',h('br'),h('em',null,'A ritual of your own.')),
          h('p',{className:'atelier__intro'},'Explore the collection, find your flavour, and let the first steep become a moment worth keeping.'),
          h('div',{className:'atelier__choices',role:'group','aria-label':'Choose product packaging'},teas.map((item,index)=>h('button',{type:'button',key:item.key,'aria-pressed':index===selected,onClick:()=>choose(index)},item.name.replace(' Green Tea','').replace(' Oolong Tea',' Oolong')))),
          h('div',{className:'atelier__profile','aria-live':'polite'},h('h3',null,tea.name),h('p',null,tea.notes),h('dl',null,h('div',null,h('dt',null,'Water'),h('dd',null,tea.water)),h('div',null,h('dt',null,'First steep'),h('dd',null,tea.time)),h('div',null,h('dt',null,'Pack'),h('dd',null,'50g · ₹499')))),
          h('a',{className:'lux-button lux-button--ivory',href:`/products/${tea.slug}/`},'Explore this tea ↗'),
          h('p',{className:'atelier__footnote'},'Follow the brewing guide on your pack, then adjust to taste. Green and oolong teas naturally contain caffeine.')
        )
      )
    );
  }
  window.NevisanAtelier = { ProductAtelier };
})();
