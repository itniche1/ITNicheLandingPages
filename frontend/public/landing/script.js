/* ============================================================
   Studio Joviant — script.js
   Lenis smooth scroll + GSAP scroll animations + micro-interactions
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ----------------------------------- */
  function runPreloader(cb) {
    const el = $("#preloader");
    const bar = $(".preloader__bar span");
    const count = $("#preCount");
    let p = 0;

    if (!el) return cb && cb();

    const tick = () => {
      p += Math.max(1, Math.round((100 - p) * 0.08));
      if (p >= 100) p = 100;
      if (bar) bar.style.width = p + "%";
      if (count) count.textContent = p;
      if (p < 100) {
        setTimeout(tick, 40);
      } else {
        setTimeout(() => {
          el.classList.add("is-done");
          cb && cb();
        }, 220);
      }
    };
    tick();
  }

  /* ---------- Utilities ----------------------------------- */
  const clockEl = () => document.getElementById("clock");
  function updateClock() {
    const el = clockEl();
    if (!el) return;
    const d = new Date();
    const time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
    el.textContent = `${time} · ${zone}`;
  }

  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Init Lenis smooth scroll --------------------- */
  let lenis = null;
  function initLenis() {
    if (prefersReduced || typeof window.Lenis === "undefined") return;
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor handling
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id && id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -20, duration: 1.4 });
          }
        }
      });
    });
  }

  /* ---------- Nav scrolled state --------------------------- */
  function initNavState() {
    const nav = $(".nav");
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Custom cursor -------------------------------- */
  function initCursor() {
    const cursor = $("#cursor");
    if (!cursor) return;
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
    let tx = x,
      ty = y;

    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function loop() {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    }
    loop();

    const hoverables = 'a, button, input, .step, .chapter, .stat, .btn, .nav__cta';
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove("is-hover");
    });
  }

  /* ---------- Hero on-load reveal (line-by-line) ----------- */
  function heroReveal() {
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.add("is-ready");

    if (prefersReduced || typeof window.gsap === "undefined") return;

    // fade in meta + lower row + orb (secondary; CSS handles the title mask reveal)
    const others = $$(
      ".hero__meta, .hero__lede, .hero__cta, .hero__stage, .hero__scroll"
    );
    window.gsap.from(others, {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.35,
      stagger: 0.06,
    });
  }

  /* ---------- ScrollTrigger reveals ------------------------ */
  function initScrollReveals() {
    if (prefersReduced || typeof window.gsap === "undefined") {
      $$("[data-reveal]").forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
      return;
    }
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    $$("[data-reveal]").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Chapter numbers subtle scale on enter
    $$(".chapter").forEach((el) => {
      const no = $(".chapter__no", el);
      if (!no) return;
      gsap.from(no, {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });

    // Stats count-up
    $$(".stat [data-count]").forEach((node) => {
      const target = parseInt(node.getAttribute("data-count"), 10);
      if (Number.isNaN(target)) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 85%" },
        onUpdate: () => {
          node.textContent = Math.round(obj.v);
        },
      });
    });

    // Hero orb parallax
    const orb = $(".orb");
    if (orb) {
      gsap.to(orb, {
        yPercent: -14,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    // Hero title subtle parallax up on scroll
    const title = $(".hero__title");
    if (title) {
      gsap.to(title, {
        yPercent: -8,
        opacity: 0.9,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }

    // Editorial line word-by-word reveal
    const line = $(".editorial__line");
    if (line) {
      // wrap tokens for animation
      const parts = Array.from(line.children);
      gsap.from(parts, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: line, start: "top 82%" },
      });
    }

    // CTA mega outline word slow scroll shift
    const mega = $(".cta__mega");
    if (mega) {
      gsap.to(mega, {
        xPercent: -6,
        scrollTrigger: {
          trigger: ".cta",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }
  }

  /* ---------- CTA form (client-side only) ------------------ */
  window.handleCtaSubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    const note = document.getElementById("ctaNote");
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    if (!name || !email) {
      if (note) note.textContent = "Please add your name and email.";
      return false;
    }
    if (note)
      note.textContent = `Thanks, ${name.split(" ")[0]}. We'll be in touch within 24 hours.`;
    form.reset();
    return false;
  };

  /* ---------- Boot ---------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    updateClock();
    setInterval(updateClock, 30000);
    initNavState();
    initCursor();

    runPreloader(() => {
      // slight defer so paint is clean
      requestAnimationFrame(() => {
        initLenis();
        heroReveal();
        initScrollReveals();
      });
    });
  });
})();
