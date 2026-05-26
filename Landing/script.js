/* =========================================================
   IT NICHE — Landing JS
   - Year stamp
   - Mobile menu toggle
   - Password visibility toggle
   - Stat counter (IntersectionObserver)
   - Reveal-on-scroll animations
   - Smooth scroll polish
   ========================================================= */

(function () {
  'use strict';

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile menu toggle ----
  const burger = document.querySelector('[data-testid="nav-burger"]');
  const navLinks = document.querySelector('.nav__links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      const open = navLinks.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      navLinks.style.display = open ? 'flex' : '';
      navLinks.style.flexDirection = open ? 'column' : '';
      navLinks.style.position = open ? 'absolute' : '';
      navLinks.style.top = open ? '64px' : '';
      navLinks.style.left = open ? '0' : '';
      navLinks.style.right = open ? '0' : '';
      navLinks.style.padding = open ? '20px 24px' : '';
      navLinks.style.background = open ? '#fff' : '';
      navLinks.style.borderBottom = open ? '1px solid #ececea' : '';
      navLinks.style.gap = open ? '14px' : '';
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('is-open');
        navLinks.removeAttribute('style');
      }
    });
  }

  // ---- Password show/hide ----
  const pwToggle = document.querySelector('[data-testid="login-password-toggle"]');
  const pwInput = document.getElementById('password');
  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', function () {
      const isPw = pwInput.type === 'password';
      pwInput.type = isPw ? 'text' : 'password';
      pwToggle.setAttribute('aria-label', isPw ? 'Hide password' : 'Show password');
      pwToggle.style.color = isPw ? '#e57119' : '';
    });
  }

  // ---- Stat counters ----
  const stats = document.querySelectorAll('.stat__num[data-count]');
  const animateCount = function (el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;
    const step = function (now) {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased).toString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && stats.length) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { obs.observe(s); });
  } else {
    stats.forEach(animateCount);
  }

  // ---- Reveal on scroll ----
  const revealTargets = document.querySelectorAll(
    '.section-head, .service, .timeline__step, .solution, .quote, .login__form, .login__copy, .stat, .cta-strip__inner'
  );
  revealTargets.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 6) * 60) + 'ms';
  });

  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { ro.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Login submit (UI-only) ----
  const form = document.querySelector('[data-testid="login-form"]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // UI-only — no submission logic per requirements
    });
  }

  // ---- Subtle parallax on hero orbit (mouse) ----
  const orbit = document.querySelector('.orbit');
  const heroVisual = document.querySelector('.hero__visual');
  if (orbit && heroVisual && window.matchMedia('(pointer:fine)').matches) {
    heroVisual.addEventListener('mousemove', function (e) {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      orbit.style.transform = 'translate(' + (x * 10) + 'px,' + (y * 10) + 'px)';
    });
    heroVisual.addEventListener('mouseleave', function () {
      orbit.style.transform = '';
    });
  }

})();
