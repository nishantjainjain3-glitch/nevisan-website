/* Shared keyboard behavior for navigation drawers and application dialogs. */
(function () {
  'use strict';
  function start() {
    const toggle=document.getElementById('nevisanMobileToggle');
    const drawer=document.getElementById('nevisanMobileDrawer');
    if(toggle&&drawer) {
      toggle.setAttribute('aria-controls',drawer.id);
      const sync=()=>toggle.setAttribute('aria-expanded',String(drawer.classList.contains('is-open')));
      sync();toggle.addEventListener('click',sync);
      drawer.addEventListener('click',()=>requestAnimationFrame(sync));
      document.addEventListener('keydown',event=>{
        if(event.key==='Escape'&&drawer.classList.contains('is-open')){toggle.click();toggle.focus();}
      });
    }
    let dialog=null,restore=null;
    const selector='button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const focusable=target=>Array.from(target.querySelectorAll(selector)).filter(node=>node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');
    const syncDialog=()=>{
      const dialogs=Array.from(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).filter(node=>node.getClientRects().length);
      const next=dialogs[dialogs.length-1]||null;
      if(next===dialog)return;
      if(next){if(!dialog)restore=document.activeElement;dialog=next;const first=focusable(dialog)[0];if(first)first.focus({preventScroll:true});else{dialog.setAttribute('tabindex','-1');dialog.focus({preventScroll:true});}}
      else{dialog=null;if(restore&&restore.isConnected)restore.focus({preventScroll:true});restore=null;}
    };
    new MutationObserver(syncDialog).observe(document.body,{childList:true,subtree:true});
    syncDialog();
    document.addEventListener('keydown',event=>{
      if(!dialog||event.key!=='Tab')return;
      const nodes=focusable(dialog),first=nodes[0],last=nodes[nodes.length-1];
      if(!first){event.preventDefault();dialog.focus();return;}
      if(event.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){event.preventDefault();first.focus();}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
