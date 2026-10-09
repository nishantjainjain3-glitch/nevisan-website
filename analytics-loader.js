/* Queue measurement immediately; download analytics after the initial render. */
(function () {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-W3Q7DNWTKP');
  var started = false;
  function start() {
    if (started) return;
    started = true;
    window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
    ['https://www.googletagmanager.com/gtm.js?id=GTM-WN76CRVR',
      'https://www.googletagmanager.com/gtag/js?id=G-W3Q7DNWTKP'].forEach(function (url) {
      var script = document.createElement('script');
      script.async = true;
      script.src = url;
      document.head.appendChild(script);
    });
  }
  function schedule() {
    setTimeout(function () {
      if (window.requestIdleCallback) window.requestIdleCallback(start, {timeout: 2000});
      else start();
    }, 1500);
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once: true});
})();
