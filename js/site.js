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

  // forms — show success state (CRM/GHL integration hooks preserved via data-ghl-field)
  function wireForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var scope = form.closest('[data-form-body]') ? form.closest('[data-form-body]').parentElement : form.parentElement;
      var body = scope.querySelector('[data-form-body]');
      var ok = scope.querySelector('[data-form-success]');
      if (body) body.hidden = true;
      if (ok) ok.hidden = false;
      form.reset();
    });
  }
  document.querySelectorAll('form[data-quote-form], form[data-page-form]').forEach(wireForm);
  document.querySelectorAll('[data-reset-form]').forEach(function (b) {
    b.addEventListener('click', function () {
      var scope = b.closest('[data-form-success]') ? b.closest('[data-form-success]').parentElement : document;
      var body = scope.querySelector('[data-form-body]');
      var ok = scope.querySelector('[data-form-success]');
      if (ok) ok.hidden = true;
      if (body) body.hidden = false;
    });
  });
})();
