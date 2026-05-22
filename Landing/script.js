/* ================================================================
   Ongoing Enhancements & Support — Landing Page
   Vanilla JS: reveal-on-scroll, sticky nav, smooth scroll, form toast
   ================================================================ */

(function () {
  'use strict';

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Sticky nav shadow on scroll ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Reveal on scroll ----------
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

  // ---------- Smooth anchor scroll (offset for sticky nav) ----------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Toast (used by CTA form) ----------
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('data-testid', 'cta-toast');
      toast.innerHTML = '<span class="toast__icon" aria-hidden="true">✓</span><span class="toast__msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast__msg').textContent = message;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 3600);
  }

  // ---------- CTA form handler (exposed for inline onsubmit) ----------
  window.handleCTASubmit = function (form) {
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    if (!name) return;
    form.reset();
    showToast(`Thanks, ${name.split(' ')[0]} — we’ll be in touch within 48h.`);
  };
})();
