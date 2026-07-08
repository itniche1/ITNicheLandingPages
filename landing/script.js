/* =========================================
   CustomSite — Landing interactions
   Vanilla JS only. No dependencies.
========================================= */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Year in footer ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const nav = $('.nav');
  const toggle = $('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__links a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Stat counters ---------- */
  const stats = $$('.stat__num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count || '0', 10);
    const duration = 1400;
    const start = performance.now();
    const from = 0;
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * eased).toString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && stats.length) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          so.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(s => so.observe(s));
  } else {
    stats.forEach(s => (s.textContent = s.dataset.count || '0'));
  }

  /* ---------- Form validation & Thank You ---------- */
  const form = $('#consultForm');
  const thankYou = $('#thankYou');
  const sendAnother = $('#sendAnother');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[+()\-\s\d]{7,}$/;

  const setError = (name, msg) => {
    const input = form.querySelector(`[name="${name}"]`) || form.querySelector(`#${name}`);
    const err = form.querySelector(`[data-err-for="${name}"]`);
    if (input) input.classList.toggle('is-invalid', Boolean(msg));
    if (err) err.textContent = msg || '';
  };

  const validate = () => {
    let ok = true;
    const data = new FormData(form);

    const firstName = String(data.get('firstName') || '').trim();
    const business  = String(data.get('business')  || '').trim();
    const phone     = String(data.get('phone')     || '').trim();
    const email     = String(data.get('email')     || '').trim();
    const notRobot  = form.querySelector('#notRobot')?.checked;

    if (!firstName) { setError('firstName', 'Please enter your first name.'); ok = false; } else setError('firstName');
    if (!business)  { setError('business',  'Please enter your business name.'); ok = false; } else setError('business');
    if (!phone || !PHONE_RE.test(phone)) { setError('phone', 'Please enter a valid phone.'); ok = false; } else setError('phone');
    if (!email || !EMAIL_RE.test(email)) { setError('email', 'Please enter a valid email.'); ok = false; } else setError('email');
    if (!notRobot) { ok = false; }

    return ok;
  };

  if (form) {
    // Live clear errors on input
    form.addEventListener('input', (e) => {
      const t = e.target;
      if (t && t.name) setError(t.name);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Client-side "thank you" (no backend)
      form.setAttribute('hidden', '');
      thankYou.removeAttribute('hidden');
      thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (sendAnother) {
    sendAnother.addEventListener('click', () => {
      form.reset();
      thankYou.setAttribute('hidden', '');
      form.removeAttribute('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------- Smooth scroll offset for sticky nav ---------- */
  const links = $$('a[href^="#"]');
  links.forEach(l => {
    l.addEventListener('click', (e) => {
      const id = l.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
})();
