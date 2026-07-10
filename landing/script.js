/* ================================================
   Landing page — vanilla JS enhancements
   - Sticky nav shadow on scroll
   - Mobile menu toggle
   - Reveal-on-scroll (IntersectionObserver)
   - Stat counters
   - Auto year in footer
   ================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initYear();
    initNavScroll();
    initMobileMenu();
    initReveal();
    initCounters();
    initSmoothAnchors();
  });

  /* Footer year */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* Nav shadow toggle */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var apply = function () {
      if (window.scrollY > 12) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
  }

  /* Mobile menu */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav__toggle');
    var links = document.querySelector('.nav__links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Reveal on scroll */
  function initReveal() {
    var targets = document.querySelectorAll(
      '.hero__content, .hero__visual, .section__head, .card, .pillar, .timeline__item, .support-card, .value, .cta__inner, .support__intro, .stat'
    );
    targets.forEach(function (t, i) {
      t.classList.add('reveal');
      t.style.transitionDelay = Math.min(i * 40, 320) + 'ms';
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* Number counters */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;

    var animate = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var duration = 1400;
      var start = performance.now();
      var initial = 0;

      var step = function (now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var value = Math.round(initial + (target - initial) * eased);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      nums.forEach(animate);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    nums.forEach(function (n) { io.observe(n); });
  }

  /* Smooth-scroll offset for sticky nav */
  function initSmoothAnchors() {
    var offset = 80;
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }
})();
