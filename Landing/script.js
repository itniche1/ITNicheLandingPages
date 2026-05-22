/* =========================================================
   IT Niche — Privacy Landing Page
   Vanilla JS — nav, reveal, counters, accordion, form
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const revealables = document.querySelectorAll(
    '.hero__copy, .hero__art, .stats, .section__head, .card, .principle, .flow__step, .policy__item, .trust__pillar, .cta__copy, .cta__art'
  );
  revealables.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stats__num[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (target === 0) {
      el.textContent = '0';
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Accordion (only one open) ---------- */
  const items = document.querySelectorAll('.policy__item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- CTA form ---------- */
  const form = document.querySelector('.cta__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      const value = (input?.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!valid) {
        input.style.boxShadow = '0 0 0 2px #e57119 inset';
        input.focus();
        setTimeout(() => (input.style.boxShadow = ''), 1500);
        return;
      }

      const original = button.innerHTML;
      button.innerHTML = 'Thanks!';
      button.style.background = '#16a34a';
      input.value = '';
      setTimeout(() => {
        button.innerHTML = original;
        button.style.background = '';
      }, 2400);
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-testid="footer-year"]');
  if (year) year.textContent = new Date().getFullYear().toString();
})();
