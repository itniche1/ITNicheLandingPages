/* ============================================================
   VCO Landing — script.js
   - Mobile nav toggle
   - Scroll-aware nav
   - Reveal-on-scroll (IntersectionObserver)
   - Animated counters
   - Bars + ring fill animation on entry
   - CTA form (front-end only, no backend)
   ============================================================ */

(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const yearEl = $('[data-testid="footer-year"]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const burger = $('[data-testid="mobile-menu-button"]');
  const mobile = $('[data-testid="mobile-menu"]');
  if (burger && mobile) {
    const toggle = (force) => {
      const open = typeof force === 'boolean' ? force : mobile.hasAttribute('hidden');
      if (open) {
        mobile.removeAttribute('hidden');
        burger.setAttribute('aria-expanded', 'true');
      } else {
        mobile.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
      }
    };
    burger.addEventListener('click', () => toggle());
    mobile.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') toggle(false);
    });
  }

  /* ---------- Scroll-aware nav ---------- */
  const nav = $('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for siblings
          const el = entry.target;
          el.style.transitionDelay = `${Math.min(i * 40, 200)}ms`;
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Animated counters ---------- */
  const counters = $$('.stat__num');
  if ('IntersectionObserver' in window && counters.length) {
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (el) => {
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const v = Math.round(target * ease(p));
        el.textContent = `${prefix}${v}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => io2.observe(el));
  }

  /* ---------- Bars + Ring (Why section) ---------- */
  const bars = $$('.bars__fill');
  const ringArc = $('.ring__arc');
  if ('IntersectionObserver' in window) {
    const io3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bars.forEach((b) => b.classList.add('is-in'));
          if (ringArc) {
            // dasharray 402 → fill 75% => offset = 402 * 0.25 = ~100
            ringArc.setAttribute('stroke-dashoffset', '100');
          }
          io3.disconnect();
        }
      });
    }, { threshold: 0.3 });
    const whySection = $('#why');
    if (whySection) io3.observe(whySection);
  } else {
    bars.forEach((b) => b.classList.add('is-in'));
  }

  /* ---------- CTA form (front-end submit) ---------- */
  window.__vcoSubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    const note = form.querySelector('.cta__note');
    const ok = form.querySelector('.cta__success');
    if (!input || !input.value) return false;

    // Simulated successful submission
    if (note) note.setAttribute('hidden', '');
    if (ok) ok.removeAttribute('hidden');
    input.value = '';
    setTimeout(() => {
      if (ok) ok.setAttribute('hidden', '');
      if (note) note.removeAttribute('hidden');
    }, 4500);
    return false;
  };
})();
