/* =========================================================
   e-Church Landing — Interactions
   ========================================================= */

(function () {
  'use strict';

  // ----- Year in footer -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Sticky nav shadow on scroll -----
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Smooth scroll for in-page anchors (with offset) -----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ----- Mobile menu (simple toggle for nav links) -----
  const menuBtn = document.getElementById('navMenu');
  const navLinks = document.querySelector('.nav__links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      navLinks.style.display = open ? 'flex' : '';
    });
    // close on link click (mobile)
    navLinks.querySelectorAll('a').forEach((l) =>
      l.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('is-open');
          navLinks.style.display = '';
        }
      })
    );
  }

  // ----- Reveal-on-scroll using IntersectionObserver -----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
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

  // ----- Animated counters (hero stats) -----
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const end = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * end).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = end.toString();
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
      { threshold: 0.5 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  // ----- CTA form (client-side validation only) -----
  const form = document.getElementById('ctaForm');
  const note = document.getElementById('ctaNote');
  const defaultNote = note ? note.textContent : '';

  const isEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim().toLowerCase());

  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const value = input ? input.value.trim() : '';

      note.classList.remove('is-success', 'is-error');

      if (!isEmail(value)) {
        note.textContent = 'Please enter a valid email address.';
        note.classList.add('is-error');
        if (input) input.focus();
        return;
      }

      // Demo success state — replace with real submission as needed
      note.textContent = "Thanks! We'll reach out within 24 hours.";
      note.classList.add('is-success');
      form.reset();

      // restore default note after a moment
      setTimeout(() => {
        if (!note.classList.contains('is-error')) {
          note.classList.remove('is-success');
          note.textContent = defaultNote;
        }
      }, 6000);
    });
  }
})();
