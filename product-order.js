/* A packet count shared by every WhatsApp action on a product page. */
(function () {
  'use strict';
  function start() {
    const input = document.querySelector('[data-packet-quantity]');
    if (!input) return;
    const name = document.querySelector('h1').textContent.trim();
    const links = Array.from(document.querySelectorAll('a[href*="wa.me/"]'));
    function update() {
      const count = Number(input.value);
      const valid = Number.isSafeInteger(count) && count >= 1;
      input.setCustomValidity(valid ? '' : 'Enter a whole number of packets, at least 1.');
      if (!valid) return;
      const message = `Hi Nevisan! I would like to order ${name}.\nQuantity: ${count} packet${count === 1 ? '' : 's'} × 50g each.\nPlease confirm availability, price and delivery details.`;
      links.forEach(link => { link.href = 'https://wa.me/919864245687?text=' + encodeURIComponent(message); });
    }
    input.addEventListener('input', update);
    links.forEach(link => link.addEventListener('click', event => {
      update();
      if (!input.reportValidity()) { event.preventDefault(); input.focus(); }
    }));
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();
