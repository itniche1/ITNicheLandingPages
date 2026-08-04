/* =========================================================
   Restaurant Web Builder — interactions
   Vanilla JS + Lenis (momentum scroll)
   ========================================================= */
/* global Lenis */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !prefersReduced) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- Anchor navigation ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(el, { offset: -70 });
      else el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Hero line-by-line reveal (staggered via JS) ---------- */
  const heroLines = document.querySelectorAll('.hero__title .line > span');
  heroLines.forEach((sp, i) => {
    setTimeout(() => sp.classList.add('in'), prefersReduced ? 0 : 160 + i * 130);
  });

  /* ---------- Nav scroll state + progress + parallax + timeline ---------- */
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');
  const timelineProgress = document.getElementById('timelineProgress');
  const timeline = document.querySelector('.timeline');
  const hero = document.querySelector('.hero');
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));

  // hero-mode: nav light while hero in view
  nav.classList.add('hero-mode');

  function onScroll(scrollY) {
    const y = scrollY != null ? scrollY : window.scrollY;

    nav.classList.toggle('scrolled', y > 40);

    // hero mode toggle
    if (hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight - 90;
      nav.classList.toggle('hero-mode', y < heroBottom);
    }

    // scroll progress
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (y / docH) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    // parallax
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      el.style.transform = 'translate3d(0,' + (y * speed).toFixed(1) + 'px,0)';
    });

    // timeline progress fill
    if (timeline && timelineProgress) {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.4;
      const passed = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
      timelineProgress.style.height = Math.min((passed / total) * 100, 100) + '%';
    }
  }

  if (lenis) lenis.on('scroll', (e) => onScroll(e.scroll));
  window.addEventListener('scroll', () => onScroll(), { passive: true });
  onScroll();

  /* ---------- IntersectionObserver reveals ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-fade');
  function showEl(el) {
    const delay = (parseFloat(el.getAttribute('data-delay')) || 0) * 1000;
    setTimeout(() => el.classList.add('in'), prefersReduced ? 0 : delay);
  }
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { showEl(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
    // Reveal anything already within the viewport on first paint (robust fallback)
    requestAnimationFrame(() => {
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) showEl(el);
      });
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Safety net: never let content stay hidden if observers/timers stall.
  window.addEventListener('load', () => {
    setTimeout(() => {
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.05 && r.bottom > 0) el.classList.add('in');
      });
    }, 400);
  });

  // steps highlight (num fill) when in view
  if ('IntersectionObserver' in window) {
    const stepIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.step').forEach((s) => stepIo.observe(s));
  }

  /* ---------- Count-up numbers ---------- */
  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    if (prefersReduced) { el.textContent = target; return; }
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.getAttribute('data-count')));
  }

  /* ---------- Magnetic buttons ---------- */
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.35 + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (toggle) { toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  }
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
