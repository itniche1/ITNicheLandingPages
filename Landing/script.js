/* ==========================================================
   IT Niche landing — vanilla JS
   - Sticky nav state
   - Mobile menu toggle
   - Smooth scroll for in-page anchors
   - Animated stat counters
   - IntersectionObserver reveal animations
   - Simple email validation on CTA
   ========================================================== */

(function () {
  'use strict';

  /* --------- Footer year --------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------- Nav: scrolled state + mobile toggle --------- */
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('navToggle');

  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close on link click (mobile)
    document.querySelectorAll('.nav__links a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------- Smooth scroll for #anchors --------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --------- Reveal on scroll --------- */
  const revealCandidates = document.querySelectorAll(
    '.hero__copy, .hero__visual, .stat, .card, .partner, .timeline__step, .section-head, .cta__content, .trust'
  );
  revealCandidates.forEach((el) => el.classList.add('reveal'));

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
      { threshold: 0.12 }
    );
    revealCandidates.forEach((el) => io.observe(el));
  } else {
    revealCandidates.forEach((el) => el.classList.add('is-visible'));
  }

  /* --------- Stat counters --------- */
  const counters = document.querySelectorAll('.stat__num[data-count]');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => countObserver.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* --------- CTA form (no backend) --------- */
  const form = document.querySelector('.cta__form');
  const note = document.querySelector('[data-testid="cta-note"]');
  const defaultNote = note ? note.textContent : '';

  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[name="email"]');
      const val = (input && input.value || '').trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

      note.classList.remove('cta__note--error', 'cta__note--success');

      if (!isValid) {
        note.textContent = 'Please enter a valid email address.';
        note.classList.add('cta__note--error');
        if (input) input.focus();
        return;
      }

      note.textContent = "Thanks — we'll reach out within one business day.";
      note.classList.add('cta__note--success');
      form.reset();

      // restore default note after a moment
      setTimeout(() => {
        note.textContent = defaultNote;
        note.classList.remove('cta__note--success');
      }, 5000);
    });
  }
})();
