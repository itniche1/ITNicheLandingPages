/* =========================================================
   RESTAURANT WEB BUILDER — Interactions
   Vanilla ES6 · Lenis smooth scroll · IntersectionObserver
   ========================================================= */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !prefersReduced) {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- HERO ON-LOAD REVEAL (safety net) ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('is-loaded');
    // Guarantee the masked title can never stay hidden (e.g. throttled tab)
    setTimeout(() => hero.classList.add('hero--settled'), 2600);
  }

  /* ---------- SCROLL-DRIVEN: NAV + PROGRESS ---------- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');

  function onScroll(scrollY) {
    const y = scrollY !== undefined ? scrollY : window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  if (lenis) { lenis.on('scroll', (e) => onScroll(e.scroll)); } else { window.addEventListener('scroll', () => onScroll()); }
  onScroll();

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal, .timeline__item');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = Array.from(el.parentElement.children).indexOf(el);
          el.style.transitionDelay = Math.min(siblings * 60, 300) + 'ms';
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- ANIMATED STAT COUNTERS ---------- */
  const counters = document.querySelectorAll('.stats__num[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObserver.observe(c));

  /* ---------- PARALLAX (subtle) ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReduced) {
    function applyParallax(y) {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = 'translateY(' + (y * speed * -1) + 'px)';
      });
    }
    if (lenis) { lenis.on('scroll', (e) => applyParallax(e.scroll)); }
    else { window.addEventListener('scroll', () => applyParallax(window.scrollY)); }
  }

  /* ---------- MOBILE MENU ---------- */
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() {
    toggle && toggle.classList.remove('is-open');
    mobileMenu && mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  /* ---------- SMOOTH ANCHOR SCROLLING ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) { lenis.scrollTo(target, { offset: -70 }); }
      else { target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' }); }
    });
  });

  /* ---------- CONTACT FORM ---------- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const formError = document.getElementById('formError');
  const resetBtn = document.getElementById('resetForm');

  function showError(msg) {
    if (!formError) return;
    formError.textContent = msg;
    formError.hidden = false;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formError.hidden = true;

      const required = form.querySelectorAll('[required]');
      let firstInvalid = null;
      required.forEach((field) => {
        const valid = field.value.trim() !== '' && field.checkValidity();
        field.classList.toggle('invalid', !valid);
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      const email = form.querySelector('#email');
      if (email && email.value && !email.checkValidity()) {
        email.classList.add('invalid');
        if (!firstInvalid) firstInvalid = email;
      }

      if (firstInvalid) {
        showError('Please fill in all required fields correctly.');
        firstInvalid.focus();
        return;
      }

      // Front-end only: transition to success state (no backend)
      form.hidden = true;
      if (success) {
        success.hidden = false;
        if (lenis) lenis.scrollTo(success, { offset: -120 });
      }
    });

    // clear invalid state on input
    form.querySelectorAll('input, textarea').forEach((f) => {
      f.addEventListener('input', () => f.classList.remove('invalid'));
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.hidden = false;
      success.hidden = true;
      formError.hidden = true;
    });
  }

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
