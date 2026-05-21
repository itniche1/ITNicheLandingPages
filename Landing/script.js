/* =========================================================
   IT Niche Landing — interactions
   - Counters
   - Reveal on scroll
   - Parallax
   - Marquee duplication safety
   ========================================================= */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* -------- Year -------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Reveal on scroll -------- */
  // Tag elements that should animate in
  const revealTargets = [
    '.hero__copy > *',
    '.hero__art',
    '.stat',
    '.section__head > *',
    '.cards .card',
    '.timeline .timeline__step',
    '.cta__inner > *',
  ];
  revealTargets.forEach((sel) => {
    $$(sel).forEach((el, idx) => {
      el.classList.add('reveal');
      // Stagger using nth-of-type-like delay
      el.dataset.delay = String((idx % 6) + 1);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach((el) => io.observe(el));

  /* -------- Counters -------- */
  const counterEls = $$('[data-count]');
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOutCubic(progress);
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };

  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counterEls.forEach((el) => counterIO.observe(el));

  /* -------- Parallax -------- */
  const parallaxEls = $$('[data-parallax]');
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          el.style.transform = `translate3d(0, ${y * speed * -1}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  };
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------- Marquee: duplicate content if needed for seamless loop -------- */
  // (Content already duplicated in markup. No-op fallback.)

  /* -------- Smooth anchor focus management -------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.setAttribute('tabindex', '-1');
          setTimeout(() => target.focus({ preventScroll: true }), 700);
        }
      }
    });
  });
})();
