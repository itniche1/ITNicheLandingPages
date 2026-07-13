/* Custom Church Website — Privacy Policy Landing
   Vanilla JS: reveal-on-scroll, mobile nav, active TOC link, current year
*/

(function () {
  'use strict';

  // Current year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.classList.toggle('open');
      if (isOpen) {
        mobile.hidden = false;
      } else {
        mobile.hidden = true;
      }
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        mobile.hidden = true;
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Active TOC link based on section in view
  const tocLinks = document.querySelectorAll('.policy__toc .toc__item');
  const clauses = document.querySelectorAll('.clause[id]');
  if (tocLinks.length && clauses.length && 'IntersectionObserver' in window) {
    const setActive = function (id) {
      tocLinks.forEach(function (l) {
        if (l.getAttribute('href') === '#' + id) l.classList.add('is-active');
        else l.classList.remove('is-active');
      });
    };
    const io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    clauses.forEach(function (c) { io2.observe(c); });
  }

  // Smooth scroll offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const targetId = a.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
