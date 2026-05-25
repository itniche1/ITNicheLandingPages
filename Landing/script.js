/* ============================================
   IT Niche — Landing Page Script
   Vanilla JS · no dependencies
   ============================================ */

(function () {
  'use strict';

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Mobile nav toggle -----
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('is-open'))
    );
  }

  // ----- Animated counters -----
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => counterObs.observe(c));

  // ----- Tab filtering (static HTML cards) -----
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.card[data-group]');

  const filterCards = (group) => {
    cards.forEach((card) => {
      const match = card.getAttribute('data-group') === group;
      card.hidden = !match;
      if (match) {
        // restart entrance animation
        card.style.animation = 'none';
        // force reflow
        void card.offsetWidth;
        card.style.animation = '';
      }
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      filterCards(tab.getAttribute('data-tab'));
    });
  });

  // ----- CTA form -----
  const form = document.getElementById('ctaForm');
  const msg = document.getElementById('ctaMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (form.email.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#ff8d4d';
        return;
      }
      msg.textContent = 'Thanks! We will be in touch within 24 hours.';
      msg.style.color = '#9be38a';
      form.reset();
    });
  }

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll('.timeline li, .section__head, .kpi');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    revealObs.observe(el);
  });
})();
