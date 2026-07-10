(() => {
  'use strict';

  // ==== Year ====
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ==== Sticky nav shadow on scroll ====
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ==== Mobile menu ====
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      menu.classList.toggle('is-open', open);
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        menu.classList.remove('is-open');
        menu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==== Reveal on scroll ====
  const revealTargets = document.querySelectorAll(
    '.section__head, .feature, .timeline__item, .demo__copy, .demo__visual, .ebook__copy, .ebook__visual, .faq__item, .cta-banner__inner, .stat'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const el = e.target;
          setTimeout(() => el.classList.add('is-visible'), i * 40);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach(el => io.observe(el));

  // ==== Count-up stats ====
  const stats = document.querySelectorAll('.stat__num');
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target || '0', 10);
    const suffix = el.dataset.suffix || (target >= 100 ? '+' : '');
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const val = Math.floor(easeOutCubic(p) * target);
      el.textContent = val + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        statsIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach(s => statsIo.observe(s));

  // ==== Smooth scroll (offset for sticky nav) ====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ==== Close details when clicking outside (single-open behavior) ====
  const faqs = document.querySelectorAll('.faq__item');
  faqs.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqs.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });
})();
