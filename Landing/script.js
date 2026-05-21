/* ============================================
   PowerPay Landing — script.js
   Vanilla JS: nav, reveal, counters, form, FAQ
============================================ */
(function () {
  'use strict';

  // ---- Year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Sticky nav border on scroll ----
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobile.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Smooth anchor (with sticky offset) ----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- Reveal-on-scroll (mark sections) ----
  const revealSelectors = [
    '.hero__copy', '.hero__art',
    '.stat',
    '.section-head',
    '.card',
    '.why__cell',
    '.timeline__step',
    '.price',
    '.faq__item',
    '.cta__copy'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Animated counters ----
  const counters = document.querySelectorAll('.stat__num');
  const animateCount = (el) => {
    const staticVal = el.getAttribute('data-static');
    if (staticVal) { el.textContent = staticVal; return; }
    const target = parseFloat(el.getAttribute('data-count') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  // ---- FAQ: only one open at a time ----
  const faqs = document.querySelectorAll('.faq__item');
  faqs.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqs.forEach((other) => { if (other !== item) other.removeAttribute('open'); });
      }
    });
  });

  // ---- CTA form (client-side only) ----
  const form = document.getElementById('ctaForm');
  const success = document.getElementById('ctaSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      let valid = true;

      [name, email].forEach((f) => {
        if (!f.value.trim()) {
          f.style.borderColor = '#e57119';
          valid = false;
        } else {
          f.style.borderColor = '';
        }
      });

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailRe.test(email.value)) {
        email.style.borderColor = '#e57119';
        valid = false;
      }

      if (!valid) return;

      // Simulate success — replace with real endpoint when ready
      form.querySelectorAll('input, select, button').forEach((el) => el.setAttribute('disabled', 'true'));
      if (success) {
        success.hidden = false;
      }
    });
  }
})();
