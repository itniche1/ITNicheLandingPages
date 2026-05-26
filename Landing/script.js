/* IT Niche — Thank You Landing
   Vanilla JS for scroll effects, counters, and micro-interactions */

(function () {
  'use strict';

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Sticky nav shadow ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Reveal on scroll ----------
  const revealTargets = document.querySelectorAll(
    '.hero-copy, .hero-art, .thanks .split-left, .thanks .split-right, .section-head, .card, .step, .stat, .lunch-inner, .cta-inner'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // Stagger siblings slightly
            const delay = el.classList.contains('card') || el.classList.contains('step') || el.classList.contains('stat')
              ? Array.from(el.parentElement.children).indexOf(el) * 90
              : 0;
            setTimeout(() => el.classList.add('in'), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  // ---------- Animated counters ----------
  const counters = document.querySelectorAll('.stat strong[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            countObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => countObserver.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // ---------- Smooth scroll for hash links ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- CTA buttons (visual feedback only — no destination per spec) ----------
  const ctaButtons = document.querySelectorAll(
    '[data-testid="cta-contact-btn"], [data-testid="cta-contact-main-btn"], [data-testid="cta-lunch-learn-btn"], [data-testid="lunch-learn-cta"]'
  );
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Ripple effect
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;
        width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.35);
        transform:scale(0);pointer-events:none;animation:ripple .6s ease-out forwards;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  // Inject keyframes for ripple once
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(2.4); opacity: 0; } }`;
  document.head.appendChild(style);

  // ---------- Subtle parallax on hero infographic ----------
  const orbit = document.querySelector('.orbit');
  if (orbit && window.matchMedia('(min-width: 1025px)').matches) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      orbit.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
    });
    hero.addEventListener('mouseleave', () => {
      orbit.style.transform = 'translate3d(0,0,0)';
    });
  }
})();
