/* =========================================================
   ITNiche · Landing Page — Motion & Interactions
   Vanilla JS · GSAP · ScrollTrigger · Lenis
   ========================================================= */

(function () {
  'use strict';

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------
     Preloader — fake progress + release the hero animation
     ------------------------------------------------------ */
  const preloader = $('#preloader');
  const preCount = $('#preCount');
  const preBar = $('.preloader__bar span');
  const hero = $('.hero');

  function runPreloader() {
    return new Promise((resolve) => {
      if (prefersReducedMotion) {
        preloader?.classList.add('is-done');
        resolve();
        return;
      }
      let n = 0;
      const tick = () => {
        n += Math.random() * 8 + 3;
        if (n >= 100) n = 100;
        if (preCount) preCount.textContent = Math.floor(n);
        if (preBar) preBar.style.width = n + '%';
        if (n < 100) {
          setTimeout(tick, 60 + Math.random() * 80);
        } else {
          setTimeout(() => {
            preloader?.classList.add('is-done');
            resolve();
          }, 320);
        }
      };
      tick();
    });
  }

  /* ------------------------------------------------------
     Lenis — smooth momentum scroll
     ------------------------------------------------------ */
  let lenis = null;
  function initLenis() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Bridge Lenis to GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ------------------------------------------------------
     Custom cursor
     ------------------------------------------------------ */
  function initCursor() {
    const cursor = $('.cursor');
    if (!cursor) return;
    const dot = $('.cursor__dot', cursor);
    const ring = $('.cursor__ring', cursor);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    function loop() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    // Hover states
    const hoverSel = 'a, button, .service, .chip, .tier, .contact__card, .sitemap__branch';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSel)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover');
    });
  }

  /* ------------------------------------------------------
     Nav — scroll state
     ------------------------------------------------------ */
  function initNav() {
    const nav = $('.nav');
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------
     Hero — release the masked line reveal + parallax orb
     ------------------------------------------------------ */
  function releaseHero() {
    if (!hero) return;
    hero.classList.add('is-ready');
  }

  function initParallax() {
    if (prefersReducedMotion) return;
    const els = $$('[data-parallax]');
    if (!els.length) return;

    const onScroll = () => {
      const y = window.scrollY;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------
     Reveal on scroll — IntersectionObserver + CSS transitions
     Uses reveal-stagger containers so children animate from
     a single parent trigger with staggered delays.
     ------------------------------------------------------ */
  function initReveal() {
    // Section heads reveal individually
    $$('.section__head, .contact, .sitemap__root, .footer').forEach((el) => el.classList.add('reveal'));

    // Stagger containers — children animate in sequence
    $$('.manifesto__grid, .services__list, .timeline, .pricing__grid, .sitemap__grid, .contact__grid, .footer__cols')
      .forEach((el) => el.classList.add('reveal-stagger'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------
     Counter animation — for stat numbers
     ------------------------------------------------------ */
  function initCounters() {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = parseInt(el.dataset.count, 10) || 0;
        const dur = 1800;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);

        function frame(now) {
          const p = Math.min(1, (now - start) / dur);
          el.textContent = Math.floor(end * ease(p)).toLocaleString();
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = end.toLocaleString();
        }
        requestAnimationFrame(frame);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach((c) => io.observe(c));
  }

  /* ------------------------------------------------------
     Anchor scroll — with Lenis
     ------------------------------------------------------ */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -60, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ------------------------------------------------------
     Burger — simple mobile drawer via body class
     ------------------------------------------------------ */
  function initBurger() {
    const burger = $('.nav__burger');
    const menu = $('.nav__menu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => {
      const open = menu.style.display === 'flex';
      if (open) {
        menu.style.display = '';
      } else {
        menu.style.display = 'flex';
        menu.style.position = 'fixed';
        menu.style.inset = '76px 0 0 0';
        menu.style.flexDirection = 'column';
        menu.style.background = 'var(--paper)';
        menu.style.padding = '30px 24px';
        menu.style.borderTop = '1px solid var(--line)';
        menu.style.gap = '18px';
        menu.style.fontSize = '20px';
        menu.style.fontWeight = '700';
        menu.style.zIndex = '99';
      }
    });
    $$('.nav__menu a').forEach((a) => a.addEventListener('click', () => {
      if (window.innerWidth <= 780) menu.style.display = '';
    }));
  }

  /* ------------------------------------------------------
     GSAP-powered marquee direction shift
     ------------------------------------------------------ */
  function initGsap() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    // Trigger the contact title mask reveal
    ScrollTrigger.create({
      trigger: '.contact',
      start: 'top 70%',
      onEnter: () => $('.contact')?.classList.add('is-visible'),
    });

    // Marquee direction shift on scroll for extra life
    const marquee = $('.marquee__track');
    if (marquee) {
      let currentDir = 1;
      let lastY = window.scrollY;
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const dir = y > lastY ? 1 : -1;
        if (dir !== currentDir) {
          currentDir = dir;
          marquee.style.animationDirection = dir === 1 ? 'normal' : 'reverse';
        }
        lastY = y;
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------
     Boot
     ------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', async () => {
    initCursor();
    initNav();
    initReveal();
    initCounters();
    initAnchors();
    initBurger();

    await runPreloader();

    initLenis();
    releaseHero();
    initParallax();
    initGsap();

    // Trigger contact title if already in view (edge case)
    const contact = $('.contact');
    if (contact) {
      const rect = contact.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) contact.classList.add('is-visible');
    }
  });
})();
