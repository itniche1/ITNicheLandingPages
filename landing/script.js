/* =============================================================
   Studio landing page — vanilla JS
   ============================================================= */

(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ------------ Year ------------ */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------ Sticky nav shadow ------------ */
  const nav = $('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------ Mobile menu ------------ */
  const toggle = $('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu when a link is clicked (mobile)
    $$('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ------------ Reveal on scroll ------------ */
  const revealSelectors = [
    '.hero__content > *',
    '.hero__graphic',
    '.section-head',
    '.section-head > *',
    '.step',
    '.pillar',
    '.stat',
    '.cta__card'
  ];
  const revealEls = $$(revealSelectors.join(','));
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ------------ Number count-up ------------ */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => co.observe(el));
  } else {
    counters.forEach(runCounter);
  }
})();

/* ------------ CTA form ------------ */
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('input[type="email"]');
  const note = document.getElementById('cta-note');
  const value = (input.value || '').trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRe.test(value)) {
    note.textContent = 'Please enter a valid email address.';
    note.classList.add('is-error');
    input.focus();
    return false;
  }

  note.classList.remove('is-error');
  note.textContent = `Thanks! We'll reach out to ${value} within 24 hours.`;
  input.value = '';
  return false;
}
