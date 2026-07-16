/* =========================================================
   IT NICHE — Motion & Kinetics
   Vanilla JS + Lenis (smooth scroll) + GSAP/ScrollTrigger
========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- helpers ----------
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  // ---------- footer year ----------
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // ============================================================
  //  LOADER — signature reveal
  // ============================================================
  const loader     = document.querySelector("[data-loader]");
  const loaderBar  = document.querySelector("[data-loader-bar]");
  const loaderCnt  = document.querySelector("[data-loader-count]");
  const loaderLtrs = document.querySelectorAll("[data-loader-letter]");

  function runLoader() {
    return new Promise(resolve => {
      const DURATION = prefersReduced ? 400 : 1600;
      const start = performance.now();

      // reveal letters staggered
      loaderLtrs.forEach((l, i) => {
        l.style.transition = "transform .9s cubic-bezier(.22,.61,.36,1), opacity .6s ease";
        l.style.transitionDelay = (0.06 * i + 0.15) + "s";
        requestAnimationFrame(() => {
          l.style.transform = "translateY(0)";
          l.style.opacity = "1";
        });
      });

      function tick(now) {
        const p = Math.min((now - start) / DURATION, 1);
        if (loaderBar) loaderBar.style.width = (p * 100).toFixed(1) + "%";
        if (loaderCnt) loaderCnt.textContent = String(Math.round(p * 100)).padStart(2, "0");
        if (p < 1) requestAnimationFrame(tick);
        else {
          setTimeout(() => {
            loader && loader.classList.add("is-done");
            document.body.classList.remove("no-scroll");
            document.body.classList.add("is-ready");
            setTimeout(() => loader && loader.remove(), 1300);
            resolve();
          }, prefersReduced ? 0 : 200);
        }
      }
      requestAnimationFrame(tick);
    });
  }

  // ============================================================
  //  LENIS — smooth scroll (progressive enhancement)
  // ============================================================
  let lenis = null;
  function initLenis() {
    if (prefersReduced || !window.Lenis) return;
    lenis = new window.Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // hash links go through Lenis for smooth momentum
    $$('a[href^="#"]').forEach(a => {
      on(a, "click", e => {
        const id = a.getAttribute("href");
        if (id && id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -40, duration: 1.4 });
          }
        }
      });
    });

    // bridge to ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(t => lenis.raf(t * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }
  }

  // ============================================================
  //  NAV — scrolled state
  // ============================================================
  function initNav() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
    on(window, "scroll", onScroll, { passive: true });
    onScroll();
  }

  // ============================================================
  //  CURSOR — custom pointer
  // ============================================================
  function initCursor() {
    if (window.matchMedia("(hover:none)").matches || prefersReduced) return;
    const cursor = document.querySelector("[data-cursor]");
    if (!cursor) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    on(window, "pointermove", e => { tx = e.clientX; ty = e.clientY; });
    function raf() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(raf);
    }
    raf();
    const hoverables = "a, button, [data-service], .cta__button, .service, .hero__index li";
    document.addEventListener("pointerover", e => {
      if (e.target.closest(hoverables)) cursor.classList.add("is-hover");
    });
    document.addEventListener("pointerout", e => {
      if (e.target.closest(hoverables)) cursor.classList.remove("is-hover");
    });
  }

  // ============================================================
  //  HERO title masked reveal
  // ============================================================
  function initHero() {
    if (prefersReduced) return;
    const words = $$(".hero__title .word");
    words.forEach((w, i) => {
      w.style.transition = "transform 1.1s cubic-bezier(.22,.61,.36,1)";
      w.style.transitionDelay = (0.15 + i * 0.12) + "s";
    });
    // parallax hero grid
    const grid = document.querySelector(".hero__grid");
    if (grid) {
      on(window, "scroll", () => {
        const y = Math.min(window.scrollY, 800);
        grid.style.transform = `translateY(${y * 0.15}px)`;
      }, { passive: true });
    }
  }

  // ============================================================
  //  Scroll-reveal — IntersectionObserver
  // ============================================================
  function initReveals() {
    // Auto-tag key elements
    const targets = [
      ".chapter__header",
      ".spotlight__frame",
      ".wap-visual",
      ".stats li",
      ".service",
      ".timeline li",
      ".manifesto__list li",
      ".cta__inner > *",
      ".section-head",
    ];
    targets.forEach(sel => {
      $$(sel).forEach((el, i) => {
        el.setAttribute("data-reveal", "");
        if (i && i < 5) el.setAttribute("data-reveal-delay", String(i));
      });
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    $$("[data-reveal]").forEach(el => io.observe(el));
  }

  // ============================================================
  //  Counters — animate stats
  // ============================================================
  function initCounters() {
    const nums = $$("[data-count]");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const to = parseFloat(el.dataset.count) || 0;
        const dur = 1600;
        const start = performance.now();
        const fmt = (v) => (Number.isInteger(to) ? Math.round(v) : v.toFixed(1));
        function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(to * eased);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
  }

  // ============================================================
  //  Spotlight parallax + 3D tilt
  // ============================================================
  function initSpotlight() {
    if (prefersReduced) return;
    const stage = document.querySelector(".spotlight__stage");
    const art   = document.querySelector(".spotlight__art");
    if (!stage || !art) return;

    on(stage, "pointermove", e => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      art.style.transform = `perspective(1400px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(0)`;
    });
    on(stage, "pointerleave", () => {
      art.style.transform = "perspective(1400px) rotateY(0) rotateX(0)";
    });

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.to(".spotlight__spot", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 0.5 }
      });
    }
  }

  // ============================================================
  //  Marquee pause on hover
  // ============================================================
  function initMarquee() {
    const track = document.querySelector("[data-marquee]");
    if (!track) return;
    on(track, "pointerenter", () => track.style.animationPlayState = "paused");
    on(track, "pointerleave", () => track.style.animationPlayState = "running");
  }

  // ============================================================
  //  Section pinning / scroll-driven chapter fades (GSAP)
  // ============================================================
  function initScrollFX() {
    if (prefersReduced || !window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;

    // Subtle scale on hero title as you scroll away
    gsap.to(".hero__title", {
      scale: 0.94, y: -30, opacity: 0.9, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    // Chapter title kinetic entry (line-clip)
    document.querySelectorAll(".chapter__title, .section-head__title, .cta__title").forEach(t => {
      gsap.from(t, {
        yPercent: 40, opacity: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: t, start: "top 82%" }
      });
    });

    // Orbit nodes stagger — animate opacity only to preserve pentagon transform
    gsap.fromTo(".orbit__nodes li",
      { opacity: 0 },
      { opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".orbit", start: "top 70%" }
      }
    );

    // Viewport bars grow
    gsap.from(".viewport__inner i", {
      scaleX: 0, transformOrigin: "left center", duration: 1, stagger: 0.05, ease: "expo.out",
      scrollTrigger: { trigger: ".wap-visual", start: "top 75%" }
    });

    // Timeline draw
    gsap.from(".timeline li", {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: ".timeline", start: "top 75%" }
    });
  }

  // ============================================================
  //  Mobile menu toggle (simple)
  // ============================================================
  function initMenu() {
    const btn = document.querySelector("[data-nav-toggle]");
    const links = document.querySelector(".nav__links");
    if (!btn || !links) return;
    on(btn, "click", () => {
      const open = links.classList.toggle("is-open");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      links.style.display = open ? "flex" : "";
      if (open) {
        links.style.position = "absolute";
        links.style.top = "100%";
        links.style.left = "0";
        links.style.right = "0";
        links.style.flexDirection = "column";
        links.style.gap = "0";
        links.style.background = "var(--bg)";
        links.style.padding = "16px 24px";
        links.style.borderTop = "1px solid var(--line)";
      }
    });
  }

  // ============================================================
  //  Boot
  // ============================================================
  function boot() {
    initHero();
    initReveals();
    initCounters();
    initSpotlight();
    initMarquee();
    initNav();
    initCursor();
    initMenu();
    // Lenis + ScrollFX must wait for libs
    const waitLibs = () => {
      if (window.Lenis && window.gsap && window.ScrollTrigger) {
        initLenis();
        initScrollFX();
      } else {
        setTimeout(waitLibs, 60);
      }
    };
    waitLibs();
  }

  // load sequence
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => runLoader().then(boot));
  } else {
    runLoader().then(boot);
  }
})();
