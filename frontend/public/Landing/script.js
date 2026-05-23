/* =========================================================
   ITNiche · Landing — Vanilla JS
   - Mobile nav toggle
   - Scroll reveal (IntersectionObserver)
   - Animated number counters
   - Back-to-top button
   - Active section highlight
   - Dynamic year
   ========================================================= */

(() => {
  'use strict';

  /* ---------- DOM helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 1. Mobile nav toggle ---------- */
  const nav    = $('.nav');
  const burger = $('.nav__burger');
  if (nav && burger) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click (mobile)
    $$('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ---------- 2. Scroll reveal ---------- */
  const revealTargets = [
    '.section__head',
    '.stat',
    '.principle',
    '.policy',
    '.timeline__item',
    '.contact-card',
    '.hero__copy',
    '.hero__visual',
    '.cta__content',
    '.hours li',
    '.footer__col',
  ];
  const revealEls = $$(revealTargets.join(','));
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 40, 280)}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- 3. Counter animation ---------- */
  const counters = $$('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toString();
    };

    requestAnimationFrame(tick);
  };

  if (counters.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => countIO.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- 4. Back to top ---------- */
  const toTop = $('.to-top');
  if (toTop) {
    const onScroll = () => {
      if (window.scrollY > 600) toTop.classList.add('show');
      else toTop.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 5. Active section highlight ---------- */
  const navLinks  = $$('.nav__links a[href^="#"]');
  const sectionMap = navLinks
    .map(a => ({ link: a, section: document.querySelector(a.getAttribute('href')) }))
    .filter(x => x.section);

  if (sectionMap.length && 'IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const match = sectionMap.find(s => s.section === entry.target);
        if (match && entry.isIntersecting) {
          navLinks.forEach(l => l.style.color = '');
          match.link.style.color = 'var(--ink-900)';
        }
      });
    }, { threshold: 0.4 });
    sectionMap.forEach(s => navIO.observe(s.section));
  }

  /* ---------- 6. Dynamic year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
