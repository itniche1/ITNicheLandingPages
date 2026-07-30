/* ============================================================
   RestaurantWebBuilder — interactions
   Lenis smooth scroll + GSAP reveals + micro-interactions
   All vanilla JS.
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  /* ---------- Current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (hasLenis && !prefersReduced) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.09 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
    }
  }

  /* ---------- Anchor links via Lenis ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Nav stuck state + scroll progress ---------- */
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.scroll-progress span');
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-stuck', y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
    });
    function ringLoop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(ringLoop);
    }
    ringLoop();
    document.querySelectorAll('a,button,.card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ---------- Card spotlight follow ---------- */
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  /* ---------- Scroll reveals (IntersectionObserver — reliable) ---------- */
  if (!prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal-up').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal-up').forEach((el) => el.classList.add('is-inview'));
  }

  /* ---------- Optional GSAP parallax (progressive enhancement) ---------- */
  if (hasGSAP && !prefersReduced && window.ScrollTrigger) {
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);
    if (lenis) lenis.on('scroll', window.ScrollTrigger.update);
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      gsap.to(el, {
        yPercent: speed * 45, ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }

  /* ---------- Animated stat counters ---------- */
  const stats = document.querySelectorAll('.stat__num');
  function animateStat(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const text = el.getAttribute('data-text');
    if (text) { el.textContent = text; return; }
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1400; const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if (stats.length) {
    const runIfVisible = (el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) animateStat(el);
    };
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateStat(e.target); so.unobserve(e.target); } });
    }, { threshold: 0.25 });
    stats.forEach((s) => so.observe(s));
    // Safety: animate any stat already visible on load
    stats.forEach(runIfVisible);
  }

  /* ---------- CTA form ---------- */
  const form = document.querySelector('.cta__form');
  if (form) {
    const input = form.querySelector('input[type="email"]');
    const msg = form.querySelector('.cta__msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (input.value || '').trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#ff6b5c';
        input.focus();
        return;
      }
      msg.style.color = '';
      msg.textContent = 'Thanks! Your free e-book is on its way to ' + val + '.';
      input.value = '';
    });
  }
})();
