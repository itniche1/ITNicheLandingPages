/* ===========================================================
   IT Niche — Landing Page interactions
   =========================================================== */
(function () {
  'use strict';

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav ----------
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
  const nav = document.querySelector('.nav');
  if (burger && mobile && nav) {
    burger.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('is-open');
      nav.classList.toggle('is-open', isOpen);
      mobile.setAttribute('aria-hidden', String(!isOpen));
    });
    mobile.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobile.classList.remove('is-open');
        nav.classList.remove('is-open');
        mobile.setAttribute('aria-hidden', 'true');
      })
    );
  }

  // ---------- Reveal on scroll ----------
  const revealTargets = document.querySelectorAll(
    '.section__head, .goal-card, .timeline__item, .channel, .pill, .stat, .roi, .contact__form, .contact__left'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  // ---------- Animated stats counter ----------
  const stats = document.querySelectorAll('.stat__num[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffixSpan = el.querySelector('span');
    const suffix = suffixSpan ? suffixSpan.outerHTML : '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.innerHTML = value + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && stats.length) {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    stats.forEach((s) => statIO.observe(s));
  } else {
    stats.forEach(animateCount);
  }

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      [name, email, message].forEach((f) => f.classList.remove('is-error'));
      note.classList.remove('is-success', 'is-error');
      note.textContent = '';

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let invalid = false;

      if (!name.value.trim()) { name.classList.add('is-error'); invalid = true; }
      if (!emailRe.test(email.value.trim())) { email.classList.add('is-error'); invalid = true; }
      if (!message.value.trim()) { message.classList.add('is-error'); invalid = true; }

      if (invalid) {
        note.classList.add('is-error');
        note.textContent = 'Please complete the highlighted fields.';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '.7';

      // Simulated submission (static page — no backend)
      setTimeout(() => {
        note.classList.add('is-success');
        note.textContent = "Thanks! We'll get back to you within one business day.";
        form.reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }, 700);
    });
  }

  // ---------- Smooth anchor offset for sticky nav ----------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
