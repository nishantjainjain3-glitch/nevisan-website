/* Progressive enhancement: the primary image and purchase links work without JS. */
(function () {
  'use strict';
  function start() {
    document.querySelectorAll('[data-product-gallery]').forEach(gallery => {
      const main = gallery.querySelector('.signature-gallery__main');
      const zoom = gallery.querySelector('.signature-gallery__zoom');
      const choices = Array.from(gallery.querySelectorAll('[data-gallery-src]'));
      if (!main || !zoom || !choices.length) return;
      let dialog = null, previousOverflow = '';
      const originalSrc = main.getAttribute('src');
      const originalAlt = main.alt;
      main.addEventListener('error', () => {
        if (main.getAttribute('src') !== originalSrc) {
          main.src = originalSrc; main.alt = originalAlt;
          choices.forEach((choice, index) => choice.setAttribute('aria-pressed', String(index === 0)));
          gallery.querySelector('.signature-gallery__caption').textContent = 'This view is unavailable. Showing the main product image.';
        }
      });
      function close() {
        if (dialog && dialog.open) { document.body.style.overflow = previousOverflow; dialog.close(); }
      }
      choices.forEach((button, index) => {
        button.addEventListener('keydown', event => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? choices.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + choices.length) % choices.length;
          choices[next].focus(); choices[next].click();
        });
        button.addEventListener('click', () => {
        main.src = button.dataset.gallerySrc;
        main.alt = button.dataset.galleryAlt;
        gallery.querySelector('.signature-gallery__caption').textContent = button.dataset.galleryAlt + '. Open the image to explore the detail.';
        choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
        });
      });
      zoom.addEventListener('click', () => {
        if (!('HTMLDialogElement' in window)) { window.open(main.src, '_blank', 'noopener'); return; }
        if (!dialog) {
          dialog = document.createElement('dialog');
          dialog.className = 'signature-lightbox';
          dialog.setAttribute('aria-label', 'Full product image');
          const toolbar = document.createElement('div'); toolbar.className = 'signature-lightbox__toolbar';
          const title = document.createElement('p');
          const dismiss = document.createElement('button'); dismiss.type = 'button'; dismiss.textContent = 'Close ×'; dismiss.addEventListener('click', close);
          const image = document.createElement('img');
          toolbar.append(title, dismiss); dialog.append(toolbar, image); document.body.append(dialog);
          dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
          dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
          dialog.addEventListener('close', () => { if (!dialog.open) { document.body.style.overflow = previousOverflow; zoom.focus({preventScroll:true}); } });
        }
        dialog.querySelector('p').textContent = main.alt;
        const image = dialog.querySelector('img'); image.src = main.src; image.alt = main.alt;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
        dialog.querySelector('button').focus();
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();
