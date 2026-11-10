(function () {
  'use strict';
  const config = window.DFC_CONFIG || {};
  const groupLink = typeof config.whatsappGroupLink === 'string' ? config.whatsappGroupLink.trim() : '';
  const validLink = /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+(?:\?.*)?$/.test(groupLink);
  document.querySelectorAll('.whatsapp-cta').forEach(function (button) {
    if (validLink) {
      button.href = groupLink;
    } else {
      button.href = '#';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        alert('The WhatsApp group link has not been configured yet. Please contact the page owner.');
      });
    }
    button.addEventListener('click', function () {
      if (!validLink) return;
      // The tracking script listens for this event, but is never required for the link to work.
      document.dispatchEvent(new CustomEvent('dfc:whatsapp-click', {detail: {destination: groupLink}}));
    });
  });
  const display = document.getElementById('countdown');
  if (!display) return;
  const minutes = Number(config.countdownMinutes);
  const duration = Number.isFinite(minutes) && minutes > 0 ? Math.min(minutes, 60) * 60000 : 300000;
  const startedAt = Date.now();
  function update() {
    const left = Math.max(0, duration - (Date.now() - startedAt));
    const totalSeconds = Math.ceil(left / 1000);
    display.textContent = String(Math.floor(totalSeconds / 60)).padStart(2, '0') + ':' + String(totalSeconds % 60).padStart(2, '0');
    if (left <= 0) clearInterval(interval);
  }
  update();
  const interval = setInterval(update, 250);
})();
