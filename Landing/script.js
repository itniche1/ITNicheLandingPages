/* =============================================================
   e-Restaurant Landing — script.js
   - Reveal on scroll (IntersectionObserver)
   - Animated number counters
   - Light parallax on data-parallax elements
   - Smooth in-page anchor scroll
   - CTA form micro-interaction
   ============================================================= */

(function () {
  'use strict';

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Animated counters ---------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count') || '0');
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = performance.now();

    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var v = target * easeOutCubic(p);
      var display = (target % 1 === 0) ? Math.round(v) : v.toFixed(1);
      el.textContent = prefix + display + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var ioCount = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { ioCount.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Parallax (subtle) ---------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  var ticking = false;

  function applyParallax() {
    var viewportH = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      // Distance from viewport center
      var centerOffset = (rect.top + rect.height / 2) - viewportH / 2;
      var translate = centerOffset * -speed;
      // Clamp to avoid extreme shifts
      translate = Math.max(Math.min(translate, 60), -60);
      el.style.transform = 'translate3d(0,' + translate.toFixed(1) + 'px,0)';
    });
    ticking = false;
  }

  function onScrollParallax() {
    if (!ticking) {
      window.requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }

  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    window.addEventListener('resize', onScrollParallax);
    applyParallax();
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id && id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- CTA form ---------- */
  var form = document.querySelector('.cta__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var note = document.querySelector('.cta__note');

      if (!name.value.trim() || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        if (note) {
          note.textContent = 'Please enter your name and a valid email.';
          note.style.color = '#ffb480';
        }
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        var original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Sending…';
        setTimeout(function () {
          btn.innerHTML = 'Thanks — we\'ll be in touch ✓';
          if (note) {
            note.textContent = 'Got it! A specialist will reach out within 1 business day.';
            note.style.color = '#ffffffb0';
          }
          form.reset();
          setTimeout(function () {
            btn.disabled = false;
            btn.innerHTML = original;
          }, 2800);
        }, 900);
      }
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY || window.pageYOffset;
      if (y > 8) nav.style.boxShadow = '0 8px 24px rgba(10,10,10,.06)';
      else nav.style.boxShadow = 'none';
      lastY = y;
    }, { passive: true });
  }
})();
