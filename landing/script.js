/* =========================================================
   Spotlight Studio — interactions (vanilla JS)
   ========================================================= */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 901px)').matches;

  /* ---------- Lenis smooth momentum scroll ---------- */
  let lenis = null;
  if (window.Lenis && !prefersReduced) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- Smooth-scroll for in-page anchors ---------- */
  function scrollToTarget(target) {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        scrollToTarget(href);
        closeMobileMenu();
      }
    });
  });

  /* ---------- Nav scroll state + progress ---------- */
  const nav = document.querySelector('[data-nav]');
  const progress = document.querySelector('[data-progress]');
  function onScroll(y) {
    const scrollY = y != null ? y : window.scrollY;
    if (nav) nav.classList.toggle('scrolled', scrollY > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    }
  }
  if (lenis) lenis.on('scroll', (e) => onScroll(e.scroll));
  else window.addEventListener('scroll', () => onScroll(), { passive: true });
  onScroll(0);

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  function closeMobileMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (toggle) { toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ---------- Reveal on view (hero + all sections) ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const d = el.getAttribute('data-delay');
        if (d) el.style.animationDelay = d + 's';
        el.classList.add('in');
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal, .reveal-fade, .hero-title').forEach((el) => revealObserver.observe(el));

  /* Guarantee above-the-fold hero reveals even if the observer is delayed */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal-fade, .hero-title').forEach((el) => el.classList.add('in'));
  });

  /* ---------- SVG draw-in on view ---------- */
  const drawObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.draw').forEach((path, i) => {
        try {
          const len = path.getTotalLength ? path.getTotalLength() : 300;
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
          path.style.transition = 'stroke-dashoffset 1.2s ' + (0.08 * i + 0.1) + 's cubic-bezier(0.22,1,0.36,1)';
          requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });
        } catch (e) { path.style.strokeDashoffset = '0'; }
      });
      drawObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.hero-art, .chapter-art').forEach((el) => drawObserver.observe(el));

  /* ---------- Number counters ---------- */
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1500; const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.count').forEach((el) => countObserver.observe(el));

  /* ---------- Parallax ---------- */
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if (parallaxEls.length && !prefersReduced) {
    function parallax(scrollY) {
      const y = scrollY != null ? scrollY : window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax'));
        el.style.transform = 'translate3d(0,' + (y * speed) + 'px,0)';
      });
    }
    if (lenis) lenis.on('scroll', (e) => parallax(e.scroll));
    else window.addEventListener('scroll', () => parallax(), { passive: true });
  }

  /* ---------- Custom cursor ---------- */
  if (isDesktop && !prefersReduced) {
    const cursor = document.querySelector('[data-cursor]');
    const dot = document.querySelector('[data-cursor-dot]');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });
    function follow() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      if (cursor) cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(follow);
    }
    follow();
    document.querySelectorAll('[data-cursor-hover], a, button, input, textarea, select').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor && cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('is-hover'));
    });
  }

  /* ---------- Marquee (JS-driven, seamless) ---------- */
  const track = document.querySelector('[data-marquee]');
  if (track && !prefersReduced) {
    let offset = 0; let last = performance.now();
    const speed = 40; // px per second
    function loop(now) {
      const dt = (now - last) / 1000; last = now;
      offset -= speed * dt;
      const first = track.children[0];
      if (first && Math.abs(offset) >= first.offsetWidth) offset += first.offsetWidth;
      track.style.transform = 'translateX(' + offset + 'px)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---------- Contact form (non-functional demo) ---------- */
  const form = document.querySelector('[data-form]');
  const note = document.querySelector('[data-form-note]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      if (!name.value.trim() || !email.value.trim()) {
        if (note) { note.style.color = '#ff8a5c'; note.textContent = 'Please add your name and email.'; }
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setTimeout(() => {
        btn.innerHTML = '✓ Request received';
        if (note) { note.style.color = '#e57119'; note.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] + '! An expert will reach out shortly.'; }
        form.reset();
        setTimeout(() => { btn.disabled = false; btn.innerHTML = original; }, 2600);
      }, 900);
    });
  }
})();
