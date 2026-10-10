/* Nevisan's cinematic storefront. React and the existing Three.js r128 load first. */
(function () {
  'use strict';
  const h = React.createElement;
  const { useEffect, useRef, useState } = React;
  const ritualTeas = [
    { name: 'GABA Oolong Tea', slug: 'gaba-oolong-tea', image: 'gaba', colour: '#ba671b', notes: 'Toasty amber · smooth honey', temp: '85°C', time: '2–3 minutes' },
    { name: 'Spearmint Green Tea', slug: 'spearmint-green-tea', image: 'spearmint', colour: '#b6a43c', notes: 'Fresh mint · clean finish', temp: '85°C', time: '2 minutes' },
    { name: 'Blue Flower Green Tea', slug: 'blue-flower-green-tea', image: 'blue-flower', colour: '#3658be', notes: 'Soft floral · a vivid blue cup', temp: '85°C', time: '2–3 minutes' },
    { name: 'Ginger Green Tea', slug: 'ginger-green-tea', image: 'ginger', colour: '#ad8226', notes: 'Ginger warmth · mellow green tea', temp: '85°C', time: '2–3 minutes' }
  ];
  function useReducedMotion() {
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(media.matches);
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }, []);
    return reduced;
  }
  function useTilt(ref) {
    useEffect(() => {
      const node = ref.current;
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      let frame = 0;
      const clear = () => {
        cancelAnimationFrame(frame);
        node.style.setProperty('--tilt-x', '0deg');
        node.style.setProperty('--tilt-y', '0deg');
      };
      const move = event => {
        if (!fine.matches || reduced.matches) return;
        const box = node.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          node.style.setProperty('--tilt-x', `${-y * 3}deg`);
          node.style.setProperty('--tilt-y', `${x * 3}deg`);
        });
      };
      node.addEventListener('pointermove', move);
      node.addEventListener('pointerleave', clear);
      reduced.addEventListener('change', clear);
      return () => {
        node.removeEventListener('pointermove', move);
        node.removeEventListener('pointerleave', clear);
        reduced.removeEventListener('change', clear);
        cancelAnimationFrame(frame);
      };
    }, [ref]);
  }
  function Hero({ setPage }) {
    const reduced = useReducedMotion();
    const [wide, setWide] = useState(() => window.matchMedia('(min-width: 769px)').matches);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const root = useRef(null), video = useRef(null);
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    const showVideo = wide && !reduced && !saveData;
    useEffect(() => {
      const media = window.matchMedia('(min-width: 769px)');
      const update = () => setWide(media.matches);
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }, []);
    useEffect(() => {
      const media = video.current;
      if (!media || !showVideo) return;
      let visible = true;
      const sync = () => {
        if (!visible || document.hidden || paused) media.pause();
        else { const play = media.play(); if (play && play.catch) play.catch(() => setPlaying(false)); }
      };
      const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }) : null;
      if (observer) observer.observe(root.current);
      document.addEventListener('visibilitychange', sync);
      sync();
      return () => { if (observer) observer.disconnect(); document.removeEventListener('visibilitychange', sync); media.pause(); };
    }, [showVideo, paused]);
    return h('section', { ref: root, className: 'cinematic-hero', 'aria-labelledby': 'cinematic-title' },
      h('picture', { className: 'cinematic-hero__backdrop' },
        h('source', { media: '(max-width: 768px)', srcSet: '/hero-mobile-fast.webp?v=1' }),
        h('img', { src: '/hero-bg.webp', alt: '', fetchPriority: 'high', width: 1280, height: 720 })
      ),
      showVideo && h('video', { ref: video, className: 'cinematic-hero__video', muted: true, loop: true, playsInline: true, preload: 'none', poster: '/hero-bg.webp', 'aria-hidden': 'true', onPlay: () => setPlaying(true), onPause: () => setPlaying(false) }, h('source', { src: '/tea-garden.mp4', type: 'video/mp4' })),
      h('div', { className: 'cinematic-hero__shade', 'aria-hidden': 'true' }),
      h('div', { className: 'cinematic-hero__content' },
        h('p', { className: 'lux-eyebrow' }, 'NEVISAN · GOLAGHAT, ASSAM'),
        h('h1', { id: 'cinematic-title' }, 'Rooted in Assam.', h('br'), h('em', null, 'Made for your ritual.')),
        h('p', { className: 'cinematic-hero__description' }, 'One origin. Ten expressions of whole-leaf tea. Discover a slower, more flavourful way to enjoy your everyday cup.'),
        h('div', { className: 'lux-actions' },
          h('button', { type: 'button', className: 'lux-button lux-button--ivory', onClick: () => setPage('Collection') }, 'Explore the Collection', h('span', { 'aria-hidden': 'true' }, ' ↗')),
          h('button', { type: 'button', className: 'lux-text-button', onClick: () => setPage('Our Story') }, 'Our Assam Story')
        )
      ),
      h('div', { className: 'cinematic-hero__footer' },
        h('a', { href: '#premium-collection', className: 'cinematic-hero__scroll' }, 'DISCOVER NEVISAN', h('span', { 'aria-hidden': 'true' }, ' ↓')),
        showVideo && h('button', { type: 'button', className: 'cinematic-hero__video-control', onClick: () => {
          setPaused(playing);
          if (video.current) {
            if (playing) video.current.pause();
            else { const play = video.current.play(); if (play && play.catch) play.catch(() => setPlaying(false)); }
          }
        }, 'aria-label': playing ? 'Pause garden video' : 'Play garden video' }, playing ? 'Ⅱ Pause film' : '▷ Play film')
      )
    );
  }
  function OriginStrip() {
    return h('div', { className: 'origin-strip', 'aria-label': 'Nevisan tea essentials' }, ['Whole leaf', 'Single-origin Assam', 'Ten distinctive varieties', 'Packed with care in Guwahati'].map(text => h('span', { key: text }, text)));
  }
  function TeaCard({ tea, onView, onImageClick, BuyModal }) {
    const [buy, setBuy] = useState(false);
    const root = useRef(null);
    useTilt(root);
    const productUrl = `/products/${tea.name.toLowerCase().replace(/\s+/g, '-')}/`;
    const notes = {
      'GABA Oolong Tea':'Toasty amber, stone fruit and smooth honey.',
      'Spearmint Green Tea':'Refreshing mint with a clean, bright finish.',
      'Blue Flower Green Tea':'Delicate florals and a vivid blue cup.',
      'Ginger Green Tea':'Ginger warmth with a mellow green-tea finish.',
      'Organic Green Tea':'Fresh, grassy notes and whole-leaf character.',
      'Tulsi Green Tea':'Herbaceous warmth with a fragrant tulsi note.',
      'Lemongrass Green Tea':'Bright citrus with a gentle grassy finish.',
      'Chamomile Green Tea':'Soft florals with honeyed apple notes.',
      'Rum Green Tea':'Sugarcane warmth, spices and oak notes.',
      'Whiskey Green Tea':'A bold cup with malt and smoky oak notes.'
    };
    return h('article', { ref: root, className: 'lux-tea-card', id: tea.name.toLowerCase().replace(/\s+/g, '-') },
      h('button', { type: 'button', className: 'lux-tea-card__image', onClick: () => onImageClick ? onImageClick(tea.img, tea.name) : onView(tea), 'aria-label': `Enlarge ${tea.name} photograph` },
        h('img', { src: tea.img, srcSet: `${tea.img.replace('.webp', '-640.webp')} 640w, ${tea.img} 1254w`, sizes: '(max-width: 520px) calc(100vw - 48px), (max-width: 900px) calc((100vw - 80px) / 2), 400px', alt: `${tea.name} — Nevisan whole-leaf Assam tea`, width: 1254, height: 1254, loading: 'lazy', decoding: 'async' }),
        h('span', { className: 'lux-tea-card__zoom', 'aria-hidden': 'true' }, '+')
      ),
      h('div', { className: 'lux-tea-card__body' },
        h('p', { className: 'lux-tea-card__origin' }, tea.name === 'GABA Oolong Tea' ? 'ASSAM · OOLONG' : 'ASSAM · GREEN TEA'),
        h('h3', null, h('a', { href: productUrl }, tea.name)),
        h('p', { className: 'lux-tea-card__notes' }, notes[tea.name] || 'Whole-leaf character, from Golaghat, Assam.'),
        h('div', { className: 'lux-tea-card__bottom' },
          h('p', { className: 'lux-tea-card__price' }, `₹${tea.price || 499}`, h('span', null, ' / 50g')),
          h('a', { href: productUrl, className: 'lux-tea-card__discover', 'aria-label': `View ${tea.name} product page` }, 'View product ↗')
        ),
        h('button', { type: 'button', className: 'lux-tea-card__buy', onClick: () => setBuy(true) }, 'Choose your store'),
        buy && h(BuyModal, { tea, onClose: () => setBuy(false) })
      )
    );
  }
  function createRitualScene(host, colour, onReady, onFailure) {
    const T = window.THREE;
    if (!T) { onFailure(); return null; }
    let renderer, observer, resizeObserver, raf = 0, disposed = false, visible = false, contextIsLost = false;
    let targetAngle = .2, targetX = 0, animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const geometries = [], materials = [];
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(4.3, 3.6, 7.8); camera.lookAt(0, .4, 0);
    const group = new T.Group(); scene.add(group);
    function mesh(geometry, material, parent = group) {
      geometries.push(geometry); materials.push(material);
      const object = new T.Mesh(geometry, material); parent.add(object); return object;
    }
    const clear = new T.MeshPhysicalMaterial({ color: '#e3eee5', metalness: .05, roughness: .13, transparent: true, opacity: .2, side: T.DoubleSide, depthWrite: false });
    const teaMaterial = new T.MeshStandardMaterial({ color: colour, roughness: .24, metalness: .15, transparent: true, opacity: .88 });
    try {
      renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.5));
      renderer.outputEncoding = T.sRGBEncoding;
      renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);
      scene.add(new T.HemisphereLight('#fff3d4', '#172b1b', 1.7));
      const key = new T.DirectionalLight('#ffe5ba', 2.2); key.position.set(-3, 6, 5); scene.add(key);
      const rim = new T.DirectionalLight('#d9f2e9', 2); rim.position.set(4, 3, -3); scene.add(rim);
      const plinth = mesh(new T.CylinderGeometry(2.05, 2.1, .18, 64), new T.MeshStandardMaterial({ color: '#25382b', roughness: .82 }));
      plinth.position.y = -.78;
      const accent = mesh(new T.TorusGeometry(1.99, .018, 8, 64), new T.MeshStandardMaterial({ color: '#c9ad74', metalness: .75, roughness: .3 }));
      accent.rotation.x = Math.PI / 2; accent.position.y = -.675;
      const saucer = mesh(new T.LatheGeometry([new T.Vector2(.05, -.65), new T.Vector2(.9, -.65), new T.Vector2(1.3, -.6), new T.Vector2(1.5, -.49), new T.Vector2(1.52, -.45)], 64), clear);
      saucer.renderOrder = 3;
      const profile = [[.08,-.53],[.6,-.53],[.79,-.45],[.89,-.2],[.97,.3],[1.03,.85],[1.03,.95],[1,.97],[.98,.9],[.92,.3],[.85,-.2],[.7,-.43],[.08,-.45]];
      const cup = mesh(new T.LatheGeometry(profile.map(p => new T.Vector2(p[0], p[1])), 64), clear);
      cup.renderOrder = 3;
      const handle = mesh(new T.TorusGeometry(.43, .075, 12, 48, Math.PI * 1.55), clear);
      handle.position.set(1.01,.28,0); handle.rotation.z = -Math.PI * .775; handle.renderOrder = 3;
      const liquid = mesh(new T.LatheGeometry([[.05,-.43],[.67,-.43],[.79,-.18],[.91,.56],[.05,.56]].map(p => new T.Vector2(...p)), 48), teaMaterial);
      liquid.renderOrder = 1;
      const top = mesh(new T.CircleGeometry(.9, 48), new T.MeshStandardMaterial({ color: colour, roughness: .16, metalness: .3, side: T.DoubleSide }));
      top.rotation.x = -Math.PI / 2; top.position.y = .565;
      const lip = mesh(new T.TorusGeometry(1.015, .022, 8, 64), new T.MeshStandardMaterial({ color: '#e3eee5', transparent: true, opacity: .55, roughness: .15, metalness: .25 }));
      lip.rotation.x = Math.PI / 2; lip.position.y = .96;
      const leafGroup = new T.Group(); group.add(leafGroup);
      function leafGeometry() {
        const positions = [], indices = [], rows = 24;
        for (let row = 0; row <= rows; row++) {
          const t = row / rows, width = Math.sin(Math.PI * t) * .32;
          for (let col = 0; col < 3; col++) {
            const x = (col - 1) * width;
            positions.push(x, t * 1.4 - .7, Math.sin(Math.PI * t) * .13 + (col === 1 ? .05 : 0));
          }
        }
        for (let row = 0; row < rows; row++) for (let col = 0; col < 2; col++) {
          const i = row * 3 + col; indices.push(i,i+3,i+1,i+1,i+3,i+4);
        }
        const g = new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(positions,3)); g.setIndex(indices); g.computeVertexNormals(); return g;
      }
      const leaves = [];
      for (let i = 0; i < 3; i++) {
        const leaf = mesh(leafGeometry(), new T.MeshStandardMaterial({ color: i === 1 ? '#91a365' : '#567a46', roughness: .66, side: T.DoubleSide }), leafGroup);
        leaf.position.set(-1.15 + i * 1.1, 1.5 + (i === 1 ? .55 : 0), (i-1)*.38);
        leaf.rotation.set(.45 + i*.3, .5 + i*.75, -.55 + i*.6); leaves.push(leaf);
      }
      const resize = () => {
        if (disposed) return;
        const w = host.clientWidth, height = host.clientHeight;
        if (!w || !height) return;
        renderer.setSize(w,height,false); camera.aspect = w/height; camera.updateProjectionMatrix(); render();
      };
      let last = 0;
      function render() { if (!disposed && !contextIsLost && renderer) renderer.render(scene,camera); }
      function tick(time) {
        raf = 0;
        if (disposed || contextIsLost || !visible || document.hidden || !animate) return;
        // Limit the decorative animation to about 30fps.
        if (time-last > 32) {
          last = time;
          group.rotation.y += (targetAngle-group.rotation.y)*.06;
          group.rotation.x += (targetX-group.rotation.x)*.06;
          leaves.forEach((leaf,i) => { leaf.position.y = 1.5 + (i===1?.55:0) + Math.sin(time*.0007+i)*.055; });
          render();
        }
        raf = requestAnimationFrame(tick);
      }
      const sync = () => { cancelAnimationFrame(raf); raf=0; if (!contextIsLost && visible && !document.hidden && animate) raf=requestAnimationFrame(tick); else render(); };
      const pointer = event => {
        if (!animate || !window.matchMedia('(pointer: fine)').matches) return;
        const rect = host.getBoundingClientRect(); targetAngle = .2 + ((event.clientX-rect.left)/rect.width-.5)*.9; targetX=((event.clientY-rect.top)/rect.height-.5)*.12;
      };
      const leave = () => { targetAngle=.2; targetX=0; };
      const motionChange = () => { animate=!motion.matches; sync(); };
      const contextLost = event => { event.preventDefault(); contextIsLost=true;cancelAnimationFrame(raf);raf=0;onFailure(); };
      const contextRestored = () => { contextIsLost=false;onReady();sync(); };
      if (typeof IntersectionObserver === 'function') {
        observer = new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); }); observer.observe(host);
      } else { visible=true; }
      if (typeof ResizeObserver === 'function') { resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host); }
      window.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', sync);
      host.addEventListener('pointermove',pointer); host.addEventListener('pointerleave',leave);
      motion.addEventListener('change',motionChange);
      renderer.domElement.addEventListener('webglcontextlost',contextLost);
      renderer.domElement.addEventListener('webglcontextrestored',contextRestored);
      resize();sync();onReady();
      const dispose = () => {
        disposed=true;cancelAnimationFrame(raf);if(observer)observer.disconnect();if(resizeObserver)resizeObserver.disconnect();
        window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',sync);host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',leave);motion.removeEventListener('change',motionChange);
        renderer.domElement.removeEventListener('webglcontextlost',contextLost);renderer.domElement.removeEventListener('webglcontextrestored',contextRestored);
        new Set(geometries).forEach(g=>g.dispose());new Set(materials).forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();
      };
      return {
        setColour(value) { teaMaterial.color.set(value);top.material.color.set(value);render(); },
        rotate(value) { targetAngle=Number(value)*Math.PI/180;if(!animate){group.rotation.y=targetAngle;render();} },
        dispose
      };
    } catch (error) {
      if(renderer){renderer.dispose();renderer.domElement.remove();}
      new Set(geometries).forEach(g=>g.dispose());new Set([...materials,clear,teaMaterial]).forEach(m=>m.dispose());
      onFailure();return null;
    }
  }
  function Ritual() {
    const [selected, setSelected] = useState(0), [ready,setReady] = useState(false), [angle,setAngle]=useState(12);
    const host=useRef(null), controller=useRef(null);
    const tea=ritualTeas[selected];
    useEffect(() => {
      const target=host.current;
      let cancelled=false, observer;
      const init=()=>{if(cancelled||controller.current)return;controller.current=createRitualScene(target,ritualTeas[0].colour,()=>!cancelled&&setReady(true),()=>!cancelled&&setReady(false));};
      if (typeof IntersectionObserver==='function') { observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){observer.disconnect();init();}},{rootMargin:'180px'});observer.observe(target); }
      else init();
      return ()=>{cancelled=true;if(observer)observer.disconnect();if(controller.current){controller.current.dispose();controller.current=null;}};
    },[]);
    useEffect(()=>{if(controller.current)controller.current.setColour(tea.colour);},[selected,ready]);
    return h('section',{className:'lux-ritual',id:'brew-ritual','aria-labelledby':'lux-ritual-title'},
      h('div',{className:'lux-ritual__inner'},
        h('div',{className:'lux-ritual__visual'},
          h('p',{className:'lux-eyebrow lux-ritual__visual-label'},'THE WHOLE-LEAF EXPERIENCE'),
          h('div',{ref:host,className:`lux-ritual__stage${ready?' is-ready':''}`,'aria-label':'An artistic glass cup with tea and whole leaves'},
            h('img',{className:'lux-ritual__fallback',src:`/teas/${tea.image}-lifestyle.webp`,alt:tea.name,width:1254,height:1254,loading:'lazy'})
          ),
          ready && h('label',{className:'lux-ritual__rotation'},'Explore the cup',h('input',{type:'range',min:-70,max:70,value:angle,'aria-label':'Rotate tea cup',onChange:event=>{setAngle(Number(event.target.value));controller.current&&controller.current.rotate(event.target.value);}}))
        ),
        h('div',{className:'lux-ritual__copy'},
          h('p',{className:'lux-eyebrow'},'A MOMENT, MADE YOURS'),
          h('h2',{id:'lux-ritual-title'},'A little leaf.',h('br'),h('em',null,'A whole new ritual.')),
          h('p',{className:'lux-ritual__intro'},'Warm the water. Watch the leaves open. Give the flavour a moment to find its way into your cup.'),
          h('div',{className:'lux-ritual__choices',role:'group','aria-label':'Choose a tea for your ritual'},ritualTeas.map((item,index)=>h('button',{type:'button',key:item.slug,'aria-pressed':selected===index,onClick:()=>setSelected(index)},item.name.replace(' Green Tea','').replace(' Oolong Tea',' Oolong')))),
          h('div',{className:'lux-ritual__profile','aria-live':'polite'},
            h('h3',null,tea.name),h('p',null,tea.notes),
            h('dl',null,h('div',null,h('dt',null,'Water'),h('dd',null,tea.temp)),h('div',null,h('dt',null,'First steep'),h('dd',null,tea.time)))
          ),
          h('a',{className:'lux-button lux-button--ivory',href:`/products/${tea.slug}/`},'Discover this tea ↗'),
          h('p',{className:'lux-ritual__footnote'},'Start with the brewing guide on your pack, then adjust to taste.')
        )
      )
    );
  }
  window.NevisanPremium={Hero,TeaCard,OriginStrip,Ritual,createRitualScene};
})();
