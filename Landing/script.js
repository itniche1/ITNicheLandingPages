/* IT Niche Landing — script.js */
(function () {
  'use strict';

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = !navMobile.hasAttribute('hidden');
      if (isOpen) {
        navMobile.setAttribute('hidden', '');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMobile.removeAttribute('hidden');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
    navMobile.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navMobile.setAttribute('hidden', '');
        navToggle.classList.remove('open');
      })
    );
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(
    '.hero__copy, .hero__visual, .stat, .service, .timeline__item, .benefit, .faq__item, .dollars__copy, .dollars__visual, .cta__inner, .section-head'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            // Counter trigger
            if (entry.target.classList.contains('stat')) {
              const c = entry.target.querySelector('[data-counter]');
              if (c && !c.dataset.done) {
                c.dataset.done = '1';
                animateCount(c);
              }
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
    counters.forEach(animateCount);
  }

  /* ---------- FAQ exclusive open ---------- */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- CTA form ---------- */
  const form = document.getElementById('ctaForm');
  const success = document.getElementById('ctaSuccess');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailValid) {
        if (!emailValid) form.querySelector('#email').focus();
        else form.querySelector('#name').focus();
        return;
      }
      form.querySelectorAll('input').forEach((i) => (i.value = ''));
      success.removeAttribute('hidden');
      setTimeout(() => success.setAttribute('hidden', ''), 5000);
    });
  }

  /* ---------- Smooth anchor offset for sticky nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
