/* ==========================================================================
   IT Niche — Lunch & Learn
   Vanilla JS interactions: nav toggle, reveal-on-scroll, count-up stats,
   form validation, toast feedback.
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
      }
    });
  }

  // ---------- Reveal-on-scroll ----------
  const revealEls = [
    '.hero__copy',
    '.hero__visual',
    '.section__head',
    '.card',
    '.timeline__item',
    '.stat',
    '.cta__copy',
    '.form',
    '.trust',
  ]
    .flatMap((sel) => Array.from(document.querySelectorAll(sel)));

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 60, 280)}ms`;
  });

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
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Count-up stats ----------
  const statNums = document.querySelectorAll('.stat__num[data-count]');
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(easeOut(p) * target).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && statNums.length) {
    const statObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            statObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((el) => statObs.observe(el));
  } else {
    statNums.forEach(countUp);
  }

  // ---------- Toast ----------
  const toast = document.getElementById('toast');
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
  };

  // ---------- Form validation ----------
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let firstInvalid = null;

      required.forEach((field) => {
        const value = (field.value || '').trim();
        let invalid = !value;
        if (!invalid && field.type === 'email') {
          invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        field.classList.toggle('is-invalid', invalid);
        if (invalid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        showToast('Please fill in the highlighted fields.');
        return;
      }

      // Simulate successful submission
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        const original = btn.innerHTML;
        btn.innerHTML = 'Reserving…';
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = original;
          form.reset();
          showToast('Seat reserved! We’ll email you shortly.');
        }, 900);
      }
    });

    // Clear invalid state on input
    form.addEventListener('input', (e) => {
      if (e.target.classList && e.target.classList.contains('is-invalid')) {
        e.target.classList.remove('is-invalid');
      }
    });
  }

  // ---------- Smooth scroll offset for sticky nav ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
