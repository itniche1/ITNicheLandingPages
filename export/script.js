/* ITNiche Landing — Vanilla JS enhancements
   - Scroll reveal via IntersectionObserver
   - Defensive, no dependencies
   ------------------------------------------------------------------ */

(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    document.documentElement.classList.add('reduce-motion');
    return; // CSS already shows everything immediately
  }

  // ---- IntersectionObserver for .reveal and .scale-in elements ----
  const targets = document.querySelectorAll('.reveal, .scale-in');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach((el) => io.observe(el));

  // ---- Header glass shadow on scroll ----
  const header = document.querySelector('[data-testid="site-header"]');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 4) header.classList.add('shadow-sm');
      else header.classList.remove('shadow-sm');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Year stamp in footer ----
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
