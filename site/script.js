/* ChurchCraft — landing page interactions
   - Mobile nav toggle
   - Reveal-on-scroll
   - Stat number count-up
   - E-book form (static; shows thank-you state, no validation)
   - Footer year
*/

(function () {
  'use strict';

  // ---------- Year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav ----------
  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-links a, .nav-cta').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // ---------- Reveal on scroll ----------
  var revealTargets = document.querySelectorAll(
    '.section-head, .feature-card, .stat, .timeline-step, .bento-cell, .ebook-visual, .ebook-form-wrap, .faq-item, .cta-inner, .hero-copy, .hero-art'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Count-up stats ----------
  var statNums = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var duration = 1400;
    var start = performance.now();
    function step(now) {
      var p = Math.min(1, (now - start) / duration);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target % 1 === 0 ? target.toString() : target.toFixed(1);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          statIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statIO.observe(el); });
  } else {
    statNums.forEach(animateCount);
  }

  // ---------- E-book form (static) ----------
  var form = document.querySelector('[data-testid="ebook-form"]');
  var thanks = document.querySelector('[data-testid="ebook-thanks"]');
  if (form && thanks) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.transition = 'opacity .25s ease, transform .25s ease';
      form.style.opacity = '0';
      form.style.transform = 'translateY(-6px)';
      setTimeout(function () {
        form.hidden = true;
        thanks.hidden = false;
        // smooth scroll thanks into view if needed
        thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 240);
    });
  }

  // ---------- Active section highlight in nav ----------
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (navAnchors.length && 'IntersectionObserver' in window) {
    var idToAnchor = {};
    navAnchors.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (id) idToAnchor[id] = a;
    });
    var sectionIds = Object.keys(idToAnchor);
    var sectionEls = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var activeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = idToAnchor[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          navAnchors.forEach(function (x) { x.style.color = ''; });
          a.style.color = 'var(--color-primary)';
        }
      });
    }, { threshold: 0.4 });
    sectionEls.forEach(function (s) { activeIO.observe(s); });
  }

})();
