/* Native disclosure navigation, with keyboard and outside-click dismissal. */
(function(){
 'use strict';
 const menu=document.querySelector('.brand-menu');
 if(!menu)return;
 const summary=menu.querySelector('summary');
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;summary.focus();}});
 document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false;});
 menu.addEventListener('click',event=>{if(event.target.closest('a'))menu.open=false;});
 function current(){document.querySelectorAll('.brand-header a:not(.brand-wordmark)').forEach(link=>{
  const url=new URL(link.href,location.href);link.removeAttribute('aria-current');
  if(url.origin===location.origin&&url.pathname===location.pathname&&url.hash===location.hash)link.setAttribute('aria-current','page');
 });}
 current();window.addEventListener('hashchange',current);
})();
