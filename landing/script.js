/* IT Niche · Landing — vanilla JS */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- current year in footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  const nav = $('.nav');
  const toggle = $('[data-testid="nav-toggle"]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // close on link tap (mobile)
    $$('.nav__links a, .nav__cta a').forEach((a) =>
      a.addEventListener('click', () => {
        if (nav.classList.contains('nav--open')) {
          nav.classList.remove('nav--open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      })
    );
  }

  /* ---------- reveal on scroll ---------- */
  const revealables = [
    ...$$('.section__head'),
    ...$$('.card'),
    ...$$('.feat'),
    ...$$('.timeline__item'),
    ...$$('.pkg'),
    ...$$('.trust'),
    ...$$('.get__intro'),
    ...$$('.form'),
    ...$$('.cta__inner > *'),
  ];
  revealables.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add('in'), i * 40);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('in'));
  }

  /* ---------- animate trust counters ---------- */
  const nums = $$('.trust__num');
  const parseTarget = (txt) => {
    const m = txt.match(/([\d.]+)/);
    return m ? parseFloat(m[1]) : null;
  };
  const animateNum = (el) => {
    const raw = el.textContent.trim();
    const target = parseTarget(raw);
    if (target === null) return;
    const prefix = raw.startsWith('$') ? '$' : '';
    const suffix = raw.replace(/^\$?[\d.]+/, '');
    const dur = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      const display = Number.isInteger(target) ? Math.round(val).toString() : val.toFixed(1);
      el.textContent = `${prefix}${display}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw; // ensure exact original
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && nums.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNum(entry.target);
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach((n) => io2.observe(n));
  }

  /* ---------- toast helper ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    if (msg) {
      const span = toastEl.querySelector('span');
      if (span) span.textContent = msg;
    }
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 4200);
  }

  /* ---------- form ---------- */
  const form = $('#request-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // simple validation
      let firstInvalid = null;
      const required = form.querySelectorAll('[required]');
      required.forEach((f) => {
        const ok = f.type === 'checkbox' ? f.checked : String(f.value || '').trim() !== '';
        if (!ok && !firstInvalid) firstInvalid = f;
        f.style.borderColor = ok ? '' : '#e57119';
      });

      if (firstInvalid) {
        firstInvalid.focus({ preventScroll: false });
        showToast('Please complete the required fields.');
        return;
      }

      // pretend send
      const btn = form.querySelector('[data-testid="submit-btn"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        showToast("Thanks! We'll be in touch shortly.");
      }, 700);
    });

    // clear invalid highlight on input
    $$('input, select, textarea', form).forEach((el) => {
      el.addEventListener('input', () => (el.style.borderColor = ''));
      el.addEventListener('change', () => (el.style.borderColor = ''));
    });
  }

  /* ---------- smooth-scroll offset (sticky nav) ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
