/* IT Niche — Refund Policy Landing | vanilla JS */
(function () {
  'use strict';

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Smooth scroll w/ sticky nav offset ----------
  const nav = document.querySelector('.nav');
  const navHeight = () => (nav ? nav.offsetHeight : 0);
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight() + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Reveal on scroll ----------
  const reveals = [
    '.section__head',
    '.stat',
    '.card',
    '.tl-step',
    '.step',
    '.contact-list li',
    '.cta__form'
  ];
  const targets = document.querySelectorAll(reveals.join(','));
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });

  if ('IntersectionObserver' in window) {
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
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Animated count-up for stats ----------
  const stats = document.querySelectorAll('.stat__num');
  const animateNum = (el) => {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;
    const end = parseInt(match[1], 10);
    const suffixHTML = el.querySelector('span') ? el.querySelector('span').outerHTML : match[2];
    const dur = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(end * eased);
      el.innerHTML = val + suffixHTML;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNum(entry.target);
            so.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((el) => so.observe(el));
  }

  // ---------- Form submission ----------
  const form = document.querySelector('[data-testid="refund-form"]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form__note');
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const reason = form.querySelector('[name="reason"]').value.trim();
      const valid = name && /^\S+@\S+\.\S+$/.test(email) && reason;
      if (!valid) {
        note.textContent = 'Please complete all required fields.';
        note.className = 'form__note error';
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Submitting…';
      // Simulated submit — demo only
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = original;
        note.textContent = '✓ Request received. Our Memphis office will contact you shortly.';
        note.className = 'form__note success';
      }, 900);
    });
  }
})();
