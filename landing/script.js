/* ============================================================
   RestaurantWebBuilder — Landing interactions (vanilla JS)
   Hero entrance is CSS-driven; JS handles scroll UX + form.
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Scroll progress bar + sticky header + subtle parallax
  --------------------------------------------------------- */
  var progress = document.querySelector('.scroll-progress');
  var header = document.querySelector('.site-header');
  var decorLayers = document.querySelectorAll('.decor-ring, .decor-blob, .decor-chart');
  var ticking = false;

  function onScroll() {
    var scrollTop = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (header) header.classList.toggle('scrolled', scrollTop > 20);

    if (!prefersReduced && scrollTop < window.innerHeight * 1.2) {
      for (var i = 0; i < decorLayers.length; i++) {
        var speed = (i + 1) * 0.06;
        decorLayers[i].style.transform = 'translateY(' + (scrollTop * speed) + 'px)';
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Scroll reveals via IntersectionObserver (below the fold)
     Hero entrance is handled purely in CSS.
  --------------------------------------------------------- */
  var revealEls = [];
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (!el.closest('.hero')) revealEls.push(el);
  });

  function revealAll() { revealEls.forEach(function (el) { el.classList.add('in'); }); }

  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parent = el.parentElement;
        var idx = 0;
        if (parent) {
          var sibs = parent.querySelectorAll(':scope > .reveal');
          idx = Array.prototype.indexOf.call(sibs, el);
        }
        el.style.transitionDelay = (Math.max(0, idx) * 0.08) + 's';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    // Safety net: ensure everything shows even if observer misfires
    setTimeout(revealAll, 2500);
  } else {
    revealAll();
  }

  /* ---------------------------------------------------------
     Animated counters
  --------------------------------------------------------- */
  var counters = document.querySelectorAll('.stat-num');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, startT = null;
    function step(ts) {
      if (!startT) startT = ts;
      var p = Math.min((ts - startT) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute('data-count') + (c.getAttribute('data-suffix') || ''); });
  }

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  var toggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    var closeMenu = function () {
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    };
    toggle.addEventListener('click', function () {
      var open = toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      mobileMenu.hidden = !open;
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* ---------------------------------------------------------
     Smooth anchor scrolling (native, offset for sticky header)
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------------------------------------------------------
     Contact form validation + demo success
  --------------------------------------------------------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    var setError = function (name, msg) {
      var input = form.querySelector('[name="' + name + '"]');
      var field = input ? input.closest('.field') : null;
      var errEl = field ? field.querySelector('.error') : null;
      if (field) field.classList.toggle('invalid', !!msg);
      if (errEl) errEl.textContent = msg || '';
    };
    var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var ok = true;

      if (!name) { setError('name', 'Please enter your name.'); ok = false; } else setError('name', '');
      if (!email) { setError('email', 'Please enter your email.'); ok = false; }
      else if (!emailOk(email)) { setError('email', 'Enter a valid email address.'); ok = false; }
      else setError('email', '');
      if (!message) { setError('message', 'Please tell us a little about your project.'); ok = false; } else setError('message', '');

      if (!ok) {
        var firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var btn = form.querySelector('[data-testid="submit-btn"]');
      var success = form.querySelector('[data-testid="form-success"]');
      var label = btn ? btn.querySelector('.btn-label') : null;
      if (btn) { btn.disabled = true; btn.style.opacity = '.7'; if (label) label.textContent = 'Sending…'; }

      setTimeout(function () {
        form.querySelectorAll('input, textarea, select').forEach(function (el) { el.value = ''; });
        if (success) { success.hidden = false; success.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' }); }
        if (btn) { btn.disabled = false; btn.style.opacity = '1'; if (label) label.textContent = 'Send message'; }
        setTimeout(function () { if (success) success.hidden = true; }, 6000);
      }, 900);
    });

    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        var field = el.closest('.field');
        if (field && field.classList.contains('invalid')) {
          field.classList.remove('invalid');
          var err = field.querySelector('.error');
          if (err) err.textContent = '';
        }
      });
    });
  }

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  var yearEl = document.querySelector('[data-testid="footer-year"]');
  if (yearEl) yearEl.textContent = '1998';
})();
