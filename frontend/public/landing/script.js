/* ============================================================
   RestaurantWebBuilder — interactions
   Vanilla JS: Lenis smooth scroll, reveal on scroll, counters,
   parallax, magnetic buttons, custom cursor, nav.
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* Enable JS-gated animations only when scripting is active */
  if (!prefersReduced) document.documentElement.classList.add('js');

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Lenis smooth scroll (init when available, non-blocking) ---------- */
  let lenis = null;
  function initLenis() {
    if (lenis || prefersReduced || typeof Lenis === 'undefined') return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.09 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
  initLenis();
  window.addEventListener('load', initLenis);

  /* ---------- Anchor smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const nav = document.querySelector('.nav');
      if (nav) nav.classList.remove('open');
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Hero reveal (run immediately, don't wait for load) ---------- */
  function revealHero() {
    const title = document.querySelector('.hero-title');
    if (title) title.classList.add('in');
    document.querySelectorAll('.hero .reveal-fade, .hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 120 + i * 90);
    });
    const g = document.querySelector('.hero-graphic');
    if (g) setTimeout(() => g.classList.add('in'), 380);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHero);
  } else {
    revealHero();
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  const revealEls = Array.from(document.querySelectorAll('.reveal-up, .reveal-fade'))
    .filter((el) => !el.closest('.hero'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  // Stagger siblings inside grid containers
  document.querySelectorAll('.overview-cards, .tech-grid, .goals-grid, .timeline, .stats').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--d', (i * 0.08) + 's');
    });
  });
  revealEls.forEach((el) => io.observe(el));

  /* Safety fallback: never leave content hidden if something stalls */
  setTimeout(() => {
    revealHero();
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in');
    });
  }, 2500);

  /* ---------- Trigger chart / funnel animations ---------- */
  const chart = document.querySelector('.roi-chart');
  if (chart) {
    const cio = new IntersectionObserver((e) => {
      e.forEach((en) => { if (en.isIntersecting) { chart.classList.add('in'); cio.unobserve(chart); } });
    }, { threshold: 0.3 });
    cio.observe(chart);
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  document.querySelectorAll('.stat-num[data-count]').forEach((el) => {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { animateCount(el); co.unobserve(el); }
      });
    }, { threshold: 0.6 });
    co.observe(el);
  });

  /* ---------- Nav scrolled state + progress ---------- */
  const nav = document.querySelector('.nav');
  const bar = document.getElementById('progress-bar');
  function onScroll(scrollY) {
    const y = scrollY != null ? scrollY : window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    // Parallax
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax);
      el.style.transform = 'translate3d(0,' + (y * speed) + 'px,0)';
    });
  }
  const parallaxEls = prefersReduced ? [] : document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => onScroll(), { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById('nav-toggle');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  /* ---------- Custom cursor + magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    const cursor = document.getElementById('cursor');
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
    });
    function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      if (cursor) cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, [data-magnetic]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor && cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('active'));
    });

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + mx * 0.25 + 'px,' + my * 0.35 + 'px)';
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
    });
  }
})();
