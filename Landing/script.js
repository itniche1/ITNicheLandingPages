/* ============================================================================
   IT Niche — Careers Landing Page
   script.js — Vanilla JavaScript
   - Auto year footer
   - Mobile menu toggle
   - Close mobile menu on link click
   - Scroll-reveal via IntersectionObserver (opt-in via .js-ready)
   - Animated stat counters via IntersectionObserver
   ============================================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------ */
  /*  Year (footer)                                                           */
  /* ------------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------ */
  /*  Mobile menu                                                             */
  /* ------------------------------------------------------------------------ */
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMenuIcon = (open) => {
    if (!toggle) return;
    const icon = toggle.querySelector('i');
    if (!icon) return;
    if (open) {
      icon.classList.remove('ph-list');
      icon.classList.add('ph-x');
    } else {
      icon.classList.remove('ph-x');
      icon.classList.add('ph-list');
    }
  };

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      setMenuIcon(mobileMenu.classList.contains('open'));
    });

    // Close on link click
    document.querySelectorAll('#mobile-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        setMenuIcon(false);
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /*  Scroll reveal (opt-in)                                                  */
  /* ------------------------------------------------------------------------ */
  document.documentElement.classList.add('js-ready');

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: make everything visible
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ------------------------------------------------------------------------ */
  /*  Animated stat counters                                                  */
  /* ------------------------------------------------------------------------ */
  const counters = document.querySelectorAll('[data-count]');

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => counterIO.observe(c));
  } else {
    // Fallback: render final value
    counters.forEach((el) => {
      el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '');
    });
  }
})();
