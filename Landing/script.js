/* e-Restaurant — landing interactions
   Vanilla JS only — no dependencies.
*/

(function () {
  'use strict';

  /* ---------- Year ---------- */
  const yearEl = document.querySelector('[data-testid="foot-year"]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav shadow on scroll ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth-scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(
    '.features .section__head, .feature, .cta__inner > *, .ticker'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
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
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Animated counters in hero ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = el.getAttribute('data-counter');
    });
  }

  /* ---------- Mobile burger (simple anchor scroll fallback) ---------- */
  const burger = document.querySelector('[data-testid="nav-burger"]');
  if (burger) {
    burger.addEventListener('click', () => {
      const cta = document.querySelector('#cta');
      if (cta) cta.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------- CTA form (no backend — UX feedback only) ---------- */
  const form = document.querySelector('[data-testid="cta-form"]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[data-testid="form-name"]');
      const email = form.querySelector('[data-testid="form-email"]');
      const submit = form.querySelector('[data-testid="form-submit"]');
      const note = form.querySelector('[data-testid="form-note"]');

      if (!name.value.trim() || !email.value.trim()) {
        note.textContent = 'Please add your restaurant name and email.';
        note.style.color = '#e57119';
        return;
      }

      submit.disabled = true;
      submit.style.opacity = '.7';
      submit.innerHTML =
        'Sending… <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/></svg>';

      setTimeout(() => {
        form.reset();
        submit.disabled = false;
        submit.style.opacity = '';
        submit.innerHTML =
          'Proposal requested ✓ <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
        note.textContent =
          'Thanks! We\u2019ve received your details. A real human replies within 24h.';
        note.style.color = '';
      }, 900);
    });
  }

  /* ---------- Tilt effect on hero art (subtle, respects reduced motion) ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const art = document.querySelector('[data-testid="hero-art"]');
  const window_ = document.querySelector('.art-window');
  if (art && window_ && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    art.addEventListener('mousemove', (e) => {
      const rect = art.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      window_.style.transform = `rotate(${-1.2 + x * 1.5}deg) translateY(${y * -6}px)`;
    });
    art.addEventListener('mouseleave', () => {
      window_.style.transform = '';
    });
  }
})();
