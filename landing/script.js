/* ─────────────────────────────────────────────────────────────────
   Custom Church Website — Vol. 01 · The Process
   Vanilla JS · Lenis smooth scroll · IntersectionObserver reveals
   ───────────────────────────────────────────────────────────────── */

(() => {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ── Year in footer ─────────────────────────────────────────── */
  const yearEl = $('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Clock in hero corner ───────────────────────────────────── */
  const clockEl = $('[data-clock]');
  const tickClock = () => {
    if (!clockEl) return;
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tickClock();
  setInterval(tickClock, 1000);

  /* ── Loader ─────────────────────────────────────────────────── */
  const loader   = $('[data-loader]');
  const bar      = $('[data-loader-bar]');
  const percent  = $('[data-loader-percent]');

  const runLoader = () => new Promise(resolve => {
    if (reduce) {
      if (bar) bar.style.width = '100%';
      if (percent) percent.textContent = '100';
      resolve();
      return;
    }
    let p = 0;
    const step = () => {
      p += Math.random() * 14 + 4;
      if (p >= 100) p = 100;
      if (bar) bar.style.width = p + '%';
      if (percent) percent.textContent = String(Math.floor(p)).padStart(3, '0');
      if (p < 100) setTimeout(step, 90 + Math.random() * 90);
      else setTimeout(resolve, 260);
    };
    step();
  });

  window.addEventListener('load', async () => {
    await runLoader();
    document.body.classList.remove('is-loading');
    // trigger hero reveal after loader slides away
    requestAnimationFrame(() => {
      document.body.classList.add('is-ready');
    });
  });

  /* ── Lenis smooth scroll ────────────────────────────────────── */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true
    });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Anchor links → Lenis scrollTo
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -40, duration: 1.4 });
      });
    });
  }

  /* ── Nav scroll behavior ────────────────────────────────────── */
  const nav = $('[data-nav]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (!nav) return;
    nav.classList.toggle('is-scrolled', y > 20);
    // hide on scroll down after some distance
    if (y > 240 && y > lastY + 6) nav.classList.add('is-hidden');
    else if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Reveal on scroll ───────────────────────────────────────── */
  const revealEls = $$('.reveal, .chapter, [data-timeline]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.revealDelay || '0', 10);
      setTimeout(() => el.classList.add('is-in'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ── Metric counters ────────────────────────────────────────── */
  const counters = $$('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const dur = 1600 + Math.random() * 400;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 4);
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * ease(t)).toString().padStart(target >= 10 ? 2 : 1, '0');
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = String(target).padStart(target >= 10 ? 2 : 1, '0');
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterIO.observe(c));

  /* ── Parallax on hero art ───────────────────────────────────── */
  const parallaxEls = $$('[data-parallax]');
  const heroArt = $('.hero__art');
  const heroSection = $('.hero');
  const applyParallax = () => {
    if (reduce) return;
    const y = window.scrollY;
    parallaxEls.forEach(el => {
      const rate = parseFloat(el.dataset.parallax) || 0.1;
      el.style.transform = `translate3d(0, ${y * rate * -1}px, 0)`;
    });
    if (heroArt && heroSection) {
      const rect = heroSection.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, -rect.top / rect.height));
      heroArt.style.transform = `translate3d(${p * 30}px, ${p * -40}px, 0) rotate(${p * 3}deg)`;
    }
  };
  window.addEventListener('scroll', applyParallax, { passive: true });
  window.addEventListener('resize', applyParallax);
  applyParallax();

  /* ── Custom cursor ──────────────────────────────────────────── */
  if (!isTouch && !reduce) {
    const cursor = $('[data-cursor]');
    const dot    = $('[data-cursor-dot]');
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });

    const raf = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (cursor) cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(raf);
    };
    raf();

    $$('[data-cursor-hover], a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor && cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('is-hover'));
    });

    document.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.opacity = '0';
      if (dot) dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.opacity = '1';
      if (dot) dot.style.opacity = '1';
    });
  }

  /* ── Marquee — pause on hover ───────────────────────────────── */
  const track = $('[data-marquee]');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  /* ── Fallback hero reveal if load fires slow ────────────────── */
  setTimeout(() => {
    if (document.body.classList.contains('is-loading')) {
      document.body.classList.remove('is-loading');
      requestAnimationFrame(() => document.body.classList.add('is-ready'));
    }
  }, 4200);

})();
