/* OPTIONAL AD PIXELS — safely independent from the website's essential functionality.
   If this file is deleted, or either pixel is disabled in config.js, the site still works.
   PageView and CTA-click events are sent when enabled. Consent/privacy requirements apply. */
(function () {
  'use strict';
  const c = window.DFC_CONFIG || {};
  const meta = c.enableMetaPixel && /^\d{8,25}$/.test(String(c.metaPixelId || ''));
  const tik = c.enableTikTokPixel && /^[A-Za-z0-9]{8,40}$/.test(String(c.tiktokPixelId || ''));
  try {
    if (meta) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', String(c.metaPixelId)); window.fbq('track','PageView');
    }
  } catch (e) { console.warn('Meta tracking unavailable.'); }
  try {
    if (tik) {
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js',o=n&&n.partner;ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var a=d.createElement('script');a.type='text/javascript';a.async=!0;a.src=r+'?sdkid='+e+'&lib='+t;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(a,s)};ttq.load(String(c.tiktokPixelId));ttq.page()}(window,document,'ttq');
    }
  } catch (e) { console.warn('TikTok tracking unavailable.'); }
  document.addEventListener('dfc:whatsapp-click', function () {
    try { if (meta && typeof window.fbq === 'function') window.fbq('trackCustom','WhatsAppButtonClick'); } catch (e) {}
    try { if (tik && window.ttq && typeof window.ttq.track === 'function') window.ttq.track('ClickButton', {content_name:'WhatsApp Class'}); } catch (e) {}
    // Source details can be measured by independent analytics if later connected.
  });
})();
