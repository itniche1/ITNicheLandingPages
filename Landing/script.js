/* =========================================================
   IT Niche — Landing Page · vanilla JS
   ========================================================= */
(function () {
  'use strict';

  // ---------- Year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Sticky nav shadow ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('mobileMenu');
  if (toggle && mobile) {
    const setOpen = (open) => {
      toggle.classList.toggle('is-open', open);
      mobile.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open) mobile.removeAttribute('hidden');
      else mobile.setAttribute('hidden', '');
    };
    toggle.addEventListener('click', () => setOpen(!toggle.classList.contains('is-open')));
    mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 720) setOpen(false); });
  }

  // ---------- Reveal on scroll ----------
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            // Stagger siblings slightly
            setTimeout(() => e.target.classList.add('in-view'), Math.min(i * 60, 240));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in-view'));
  }

  // ---------- Stats counter ----------
  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(startVal + (target - startVal) * eased);
      el.textContent = `${prefix}${val}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const ioC = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target);
            ioC.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => ioC.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  const hint = document.getElementById('formHint');
  if (form && hint) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        hint.textContent = 'Please enter a valid email address.';
        hint.style.color = '#ffd0a8';
        form.email.focus();
        return;
      }
      hint.style.color = '';
      hint.textContent = `Thanks — we'll be in touch at ${email} within 24 hours.`;
      form.reset();
    });
  }

  // ---------- Smooth in-page nav offset compensation (sticky header) ----------
  // Native smooth scroll handles this; nothing else required.
})();
