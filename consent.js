/** Nevisan cookie consent, Google Consent Mode v2 and Meta Pixel. */
(function () {
  'use strict';
  var key = 'nevisan_cookie_consent';
  var userConsent = readConsent();
  var pixelStarted = false;
  var bannerTimer;

  function readConsent() {
    try {
      var value = localStorage.getItem(key);
      return value === 'accepted' || value === 'declined' ? value : null;
    } catch (e) {
      return null;
    }
  }

  window.hasNevisanConsent = function () { return userConsent === 'accepted'; };
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function googleConsent(command) {
    var state = window.hasNevisanConsent() ? 'granted' : 'denied';
    var settings = {
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state
    };
    if (command === 'default') settings.wait_for_update = 500;
    window.gtag('consent', command, settings);
  }
  googleConsent('default');

  function updatePixel() {
    // Do not request the Meta library or queue events before acceptance.
    if (!window.hasNevisanConsent()) {
      if (pixelStarted) window.fbq('consent', 'revoke');
      return;
    }
    if (pixelStarted) {
      window.fbq('consent', 'grant');
      return;
    }
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    pixelStarted = true;
    window.fbq('consent', 'grant');
    window.fbq('init', '1600935891006535');
    window.fbq('track', 'PageView');
  }
  updatePixel();

  function hideBanners() {
    clearTimeout(bannerTimer);
    var existing = document.getElementById('cookie-consent-banner');
    if (existing) existing.style.display = 'none';
    var injected = document.getElementById('nevisan-injected-consent-banner');
    if (injected) injected.remove();
  }

  function applyConsent() {
    googleConsent('update');
    updatePixel();
    hideBanners();
    window.dispatchEvent(new CustomEvent('nevisan-consent-change'));
  }

  window.updateNevisanConsent = function (accepted) {
    userConsent = accepted === true ? 'accepted' : 'declined';
    // Storage failure must not prevent the current choice from taking effect.
    try { localStorage.setItem(key, userConsent); } catch (e) {}
    applyConsent();
  };

  function showBanner() {
    hideBanners();
    var existing = document.getElementById('cookie-consent-banner');
    if (existing) {
      existing.style.display = 'block';
      return;
    }
    var div = document.createElement('div');
    div.id = 'nevisan-injected-consent-banner';
    div.setAttribute('role', 'region');
    div.setAttribute('aria-label', 'Cookie Consent');
    div.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;max-width:480px;background:#15271B;color:#F8F6F2;padding:18px 22px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.35);z-index:99999;border:1px solid rgba(201,168,76,0.3);font-family:Inter,sans-serif;font-size:14px;line-height:1.5;';
    div.innerHTML = '<p style="margin:0 0 12px;color:#E0DDD5;">We use optional cookies for analytics and advertising. Choose whether to allow them. Read our <a href="/privacy-policy.html" style="color:#C9A84C;text-decoration:underline;">Privacy Policy</a>.</p>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
      '<button type="button" data-consent="decline" style="background:transparent;border:1px solid rgba(255,255,255,0.3);color:#fff;padding:8px 16px;border-radius:6px;cursor:pointer;">Decline</button>' +
      '<button type="button" data-consent="accept" style="background:#C9A84C;border:none;color:#15271B;font-weight:700;padding:8px 18px;border-radius:6px;cursor:pointer;">Accept All</button></div>';
    div.querySelector('[data-consent="decline"]').addEventListener('click', function () { window.updateNevisanConsent(false); });
    div.querySelector('[data-consent="accept"]').addEventListener('click', function () { window.updateNevisanConsent(true); });
    document.body.appendChild(div);
  }
  window.showNevisanConsent = showBanner;

  window.addEventListener('storage', function (event) {
    if (event.key !== key && event.key !== null) return;
    userConsent = readConsent();
    applyConsent();
    if (!userConsent) showBanner();
  });

  function initBanner() {
    if (userConsent) return;
    // The homepage React banner is present on every internal page.
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') return;
    bannerTimer = setTimeout(function () {
      if (!userConsent) showBanner();
    }, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBanner);
  else initBanner();
})();
