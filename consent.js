/**
 * Nevisan Tea — Universal Cookie Consent & Analytics Gating
 * Google Consent Mode v2 & Meta Pixel Bootstrap
 */
(function() {
  var userConsent = null;
  try {
    userConsent = localStorage.getItem('nevisan_cookie_consent');
  } catch(e) {}

  // 1. Google Consent Mode v2 Default (MUST run before any tags fire)
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    'ad_storage': userConsent === 'accepted' ? 'granted' : 'denied',
    'analytics_storage': userConsent === 'accepted' ? 'granted' : 'denied',
    'ad_user_data': userConsent === 'accepted' ? 'granted' : 'denied',
    'ad_personalization': userConsent === 'accepted' ? 'granted' : 'denied',
    'wait_for_update': 500
  });

  // 2. Official Meta Pixel Bootstrap & Prior-Consent Gating
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  // Enforce consent gating before any tracking events
  if (userConsent === 'accepted') {
    window.fbq('consent', 'grant');
  } else {
    window.fbq('consent', 'revoke');
  }

  // Centralized Meta Pixel initialization & PageView
  window.fbq('init', '1600935891006535');
  window.fbq('track', 'PageView');

  // 3. Global Consent Update Handler
  window.updateNevisanConsent = function(accepted) {
    try {
      localStorage.setItem('nevisan_cookie_consent', accepted ? 'accepted' : 'declined');
      gtag('consent', 'update', {
        'ad_storage': accepted ? 'granted' : 'denied',
        'analytics_storage': accepted ? 'granted' : 'denied',
        'ad_user_data': accepted ? 'granted' : 'denied',
        'ad_personalization': accepted ? 'granted' : 'denied'
      });
      if (typeof window.fbq === 'function') {
        window.fbq('consent', accepted ? 'grant' : 'revoke');
      }
    } catch(e) {}

    var b = document.getElementById('cookie-consent-banner');
    if (b) b.style.display = 'none';
    var dyn = document.getElementById('nevisan-injected-consent-banner');
    if (dyn) dyn.remove();
  };

  // 4. Standalone Pages Banner Display & Injection
  function initBanner() {
    if (userConsent) return;

    // React CookieConsentBanner in app.js manages the homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      return;
    }

    var existingBanner = document.getElementById('cookie-consent-banner');
    if (existingBanner) {
      setTimeout(function() {
        existingBanner.style.display = 'block';
      }, 1000);
      return;
    }

    // Inject accessible banner on pages without a pre-rendered banner (e.g. /reviews/)
    setTimeout(function() {
      if (document.getElementById('nevisan-injected-consent-banner') || localStorage.getItem('nevisan_cookie_consent')) return;
      var div = document.createElement('div');
      div.id = 'nevisan-injected-consent-banner';
      div.setAttribute('role', 'region');
      div.setAttribute('aria-label', 'Cookie Consent');
      div.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;max-width:480px;background:#15271B;color:#F8F6F2;padding:18px 22px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.35);z-index:99999;border:1px solid rgba(201,168,76,0.3);font-family:\'Inter\',sans-serif;font-size:14px;line-height:1.5;';
      div.innerHTML = '<p style="margin:0 0 12px 0;color:#E0DDD5;">We use cookies to improve your browsing experience, analyze traffic, and support secure order processing in accordance with our <a href="/privacy-policy.html" style="color:#C9A84C;text-decoration:underline;">Privacy Policy</a>.</p>' +
        '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
        '<button onclick="window.updateNevisanConsent(false)" style="background:transparent;border:1px solid rgba(255,255,255,0.3);color:#fff;padding:8px 16px;border-radius:6px;font-size:13px;cursor:pointer;">Decline</button>' +
        '<button onclick="window.updateNevisanConsent(true)" style="background:#C9A84C;border:none;color:#15271B;font-weight:700;padding:8px 18px;border-radius:6px;font-size:13px;cursor:pointer;">Accept All</button>' +
        '</div>';
      document.body.appendChild(div);
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();
