/* =========================================================
   ITNiche Sitemap Landing — Interactions
   ========================================================= */

(function () {
  'use strict';

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- Category filters ---------- */
  function initFilters() {
    const filters = $$('.filter');
    const cards = $$('.scard');
    if (!filters.length || !cards.length) return;

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const cat = btn.dataset.filter;
        cards.forEach((c) => {
          if (cat === 'all' || c.dataset.category === cat) {
            c.classList.remove('is-hidden');
          } else {
            c.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    $$('.hero__left, .hero__right, .sitemap__head, .footer__col').forEach((el) => el.classList.add('reveal'));
    $$('.sitemap__grid').forEach((el) => el.classList.add('reveal-stagger'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
  }

  /* ---------- Mobile burger ---------- */
  function initBurger() {
    const burger = $('.burger');
    const nav = $('.main-nav');
    const cta = $('.cta-header');
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('is-open');
      if (open) {
        nav.style.display = 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '74px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.flexDirection = 'column';
        nav.style.background = '#fff';
        nav.style.padding = '20px 24px';
        nav.style.borderBottom = '1px solid var(--border)';
        nav.style.gap = '14px';
        nav.style.boxShadow = '0 12px 24px -12px rgba(15, 23, 42, 0.15)';
        if (cta) {
          cta.style.display = 'inline-flex';
          cta.style.marginTop = '10px';
        }
      } else {
        nav.style.cssText = '';
        if (cta) cta.style.cssText = '';
      }
    });

    $$('.main-nav a').forEach((a) => a.addEventListener('click', () => {
      if (window.innerWidth <= 720 && burger.classList.contains('is-open')) {
        burger.click();
      }
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initAnchors();
    initReveal();
    initBurger();
  });
})();
