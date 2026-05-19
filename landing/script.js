/* IT Niche — Landing page interactions (Vanilla JS) */

(function () {
  'use strict';

  /* ---------- Lucide icons ---------- */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    } else {
      // try again once script loads
      setTimeout(initIcons, 120);
    }
  }
  initIcons();

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scrolled state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const navMobile = document.getElementById('navMobile');
  if (toggle && navMobile) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      navMobile.hidden = open;
    });
    navMobile.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navMobile.hidden = true;
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const ioC = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            ioC.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => ioC.observe(c));
  } else {
    counters.forEach((c) => animateCount(c));
  }

  /* ---------- Skill bars ---------- */
  const skills = document.querySelectorAll('.skill');
  if ('IntersectionObserver' in window) {
    const ioS = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pct = entry.target.dataset.percent || '0';
            const bar = entry.target.querySelector('.bar span');
            if (bar) bar.style.width = pct + '%';
            ioS.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skills.forEach((s) => ioS.observe(s));
  } else {
    skills.forEach((s) => {
      const bar = s.querySelector('.bar span');
      if (bar) bar.style.width = (s.dataset.percent || '0') + '%';
    });
  }

  /* ---------- Smooth scroll for nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Contact form (static) ---------- */
  const form = document.querySelector('.cta-form');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.className = 'form-status';
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const service = (data.get('service') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !service || !message) {
        status.textContent = 'Please complete all required fields with a valid email.';
        status.classList.add('error');
        return;
      }
      status.textContent = 'Thanks, ' + name.split(' ')[0] + '! We will get back to you within one business day.';
      status.classList.add('success');
      form.reset();
    });
  }
})();
