// CWS Lawn and Garden Care — site interactions
(function () {
  // hover / focus style attributes from the design system
  function parseCss(str) {
    var out = {};
    (str || '').split(';').forEach(function (d) {
      var i = d.indexOf(':');
      if (i > 0) out[d.slice(0, i).trim()] = d.slice(i + 1).trim();
    });
    return out;
  }
  document.querySelectorAll('[style-hover]').forEach(function (el) {
    var hover = parseCss(el.getAttribute('style-hover'));
    var prev = {};
    el.addEventListener('mouseenter', function () {
      for (var k in hover) { prev[k] = el.style.getPropertyValue(k); el.style.setProperty(k, hover[k]); }
    });
    el.addEventListener('mouseleave', function () {
      for (var k in hover) { el.style.setProperty(k, prev[k] || ''); }
    });
  });
  document.querySelectorAll('[style-focus]').forEach(function (el) {
    var focus = parseCss(el.getAttribute('style-focus'));
    var prev = {};
    el.addEventListener('focus', function () {
      for (var k in focus) { prev[k] = el.style.getPropertyValue(k); el.style.setProperty(k, focus[k]); }
    });
    el.addEventListener('blur', function () {
      for (var k in focus) { el.style.setProperty(k, prev[k] || ''); }
    });
  });

  // mobile nav
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // quote modal
  var modal = document.getElementById('quote-modal');
  function openQuote(e) { if (e) e.preventDefault(); if (modal) { modal.hidden = false; document.body.style.overflow = 'hidden'; } }
  function closeQuote() { if (modal) { modal.hidden = true; document.body.style.overflow = ''; } }
  document.querySelectorAll('[data-open-quote]').forEach(function (b) { b.addEventListener('click', openQuote); });
  document.querySelectorAll('[data-close-quote]').forEach(function (b) { b.addEventListener('click', closeQuote); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeQuote(); });
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal.firstElementChild) closeQuote(); });

  // Quote forms submit natively (GHL external tracking captures the submit
  // event and syncs data-ghl-field/name fields to contact fields — do not
  // preventDefault) and redirect to thank-you.html via the form action.
  // A sessionStorage copy backs up personalisation on the thank-you page.
  document.querySelectorAll('form[data-quote-form], form[data-page-form]').forEach(function (form) {
    form.addEventListener('submit', function () {
      try {
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        sessionStorage.setItem('cws_quote', JSON.stringify(data));
      } catch (e) { /* storage unavailable — thank-you page falls back to URL params */ }
    });
  });
})();
