/* =========================================================
   IT Niche — SEO Site Audit Landing
   Vanilla JS interactions
   ========================================================= */

(() => {
  'use strict';

  // ---------- Year ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Nav: scroll state + mobile toggle ----------
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.getElementById('navMobile');

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
    mobile.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobile.classList.remove('is-open'))
    );
  }

  // ---------- Smooth anchor scroll w/ offset ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Reveal on scroll ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');

  if (reduceMotion) {
    reveals.forEach(el => el.classList.add('is-in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger if multiple in same view
          setTimeout(() => entry.target.classList.add('is-in'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // ---------- Count-up numbers ----------
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(eased * target);
      el.textContent = val.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // ---------- Hero ring + bars activation ----------
  const ring = document.querySelector('.ring');
  const dashBody = document.querySelector('.dash__body');
  if ('IntersectionObserver' in window && dashBody) {
    const dio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dashBody.classList.add('is-in');
          if (ring) ring.classList.add('is-in');
          dio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    dio.observe(dashBody);
  } else {
    dashBody && dashBody.classList.add('is-in');
    ring && ring.classList.add('is-in');
  }

  // ---------- Form submission ----------
  const form = document.getElementById('auditForm');
  const success = document.getElementById('auditSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = form.querySelectorAll('input[required]');
      let valid = true;
      fields.forEach(f => {
        const ok = f.checkValidity() && f.value.trim().length > 0;
        f.classList.toggle('is-invalid', !ok);
        if (!ok && valid) f.focus();
        if (!ok) valid = false;
      });
      if (!valid) return;

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.innerHTML;
        btn.innerHTML = 'Sending…';
      }

      // simulate request
      setTimeout(() => {
        form.reset();
        if (success) success.classList.add('is-visible');
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = btn.dataset.label || 'Send My Free Report';
        }
        // hide success after a while
        setTimeout(() => success && success.classList.remove('is-visible'), 6000);
      }, 700);
    });

    // clear invalid on input
    form.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => inp.classList.remove('is-invalid'));
    });
  }
})();
