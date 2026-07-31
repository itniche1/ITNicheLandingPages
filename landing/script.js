/* ============================================================
   IT Niche Landing — minimal vanilla JS
   Progressive enhancement only. Page is fully usable without JS.
   ============================================================ */
(function () {
  'use strict';

  // Flag that JS is active
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    // 1) Kinetic hero reveal on load (CSS-driven signature moment)
    requestAnimationFrame(function () {
      document.body.classList.add('hero-loaded');
    });

    // 2) Sticky header state
    var header = document.getElementById('siteHeader');
    function onScroll() {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // 3) Contact form — visual only (no backend)
    var form = document.getElementById('appointmentForm');
    var success = document.getElementById('formSuccess');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        success.hidden = false;
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { success.hidden = true; }, 6000);
      });
    }

    // 5) Footer year
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
