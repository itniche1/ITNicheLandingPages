/* =========================================================
   IT Niche — Landing interactions
   Vanilla JS only. No frameworks.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('has-menu');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // close menu when clicking a link
    $$('.nav__links a', nav).forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('has-menu');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- sticky nav shadow on scroll ---------- */
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- smooth-scroll for hash links (offset for sticky nav) ---------- */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (nav?.offsetHeight || 72) + 12;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ---------- reveal-on-scroll ---------- */
  const revealTargets = $$(
    'section, .card, .stat, .timeline__item, .hero__content, .hero__visual, .wap__visual, .wap__copy, .go-online__copy, .stats'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- counter animation ---------- */
  const counters = $$('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const val = Math.round(startVal + (target - startVal) * eased);
      el.textContent = String(val);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => countObs.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- subtle parallax on hero visual ---------- */
  const hero = $('.hero__visual');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 800) hero.style.transform = `translateY(${y * 0.04}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

})();
