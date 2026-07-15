/* =========================================================
   e-Church · Process — Landing
   Vanilla JS · GSAP + ScrollTrigger + Lenis
   ========================================================= */
(function () {
  "use strict";

  // ------- LOADER -------
  const loader = document.getElementById("loader");
  const loaderFill = document.querySelector(".loader__fill");
  const loaderCount = document.getElementById("loaderCount");

  function runLoader() {
    return new Promise((resolve) => {
      let p = 0;
      const t = setInterval(() => {
        p += Math.random() * 8 + 4;
        if (p >= 100) {
          p = 100;
          clearInterval(t);
        }
        if (loaderFill) loaderFill.style.width = p + "%";
        if (loaderCount) loaderCount.textContent = String(Math.floor(p)).padStart(3, "0");
        if (p >= 100) {
          setTimeout(() => {
            loader.classList.add("is-done");
            document.body.classList.add("is-ready");
            setTimeout(resolve, 600);
          }, 250);
        }
      }, 90);
    });
  }

  // ------- LENIS (smooth momentum scrolling) -------
  let lenis;
  function initLenis() {
    if (typeof Lenis === "undefined") return null;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    if (window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Anchor link handling
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id && id.length > 1) {
          const el = document.querySelector(id);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el, { offset: -40, duration: 1.6 });
          }
        }
      });
    });
    return lenis;
  }

  // ------- CUSTOM CURSOR -------
  function initCursor() {
    const cursor = document.querySelector(".cursor");
    if (!cursor || matchMedia("(hover: none)").matches) return;
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let dx = x, dy = y, rx = x, ry = y;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
    });

    function loop() {
      dx += (x - dx) * 0.55;
      dy += (y - dy) * 0.55;
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const hoverables = document.querySelectorAll('a, button, [data-magnetic], .chapter, .signup__steps li');
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  // ------- MAGNETIC BUTTONS -------
  function initMagnetic() {
    if (matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      let hover = false;
      el.addEventListener("mouseenter", () => (hover = true));
      el.addEventListener("mouseleave", () => {
        hover = false;
        el.style.transform = "translate(0,0)";
      });
      el.addEventListener("mousemove", (e) => {
        if (!hover) return;
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        const strength = 0.22;
        el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
      });
    });
  }

  // ------- NAV SCROLL STATE -------
  function initNav() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const update = () => {
      if ((lenis ? lenis.scroll : window.scrollY) > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    if (lenis) lenis.on("scroll", update);
    else window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ------- HERO TITLE REVEAL + LEAD -------
  function heroReveal() {
    const title = document.querySelector(".hero__title");
    const lead = document.querySelector(".hero__lead");
    requestAnimationFrame(() => {
      if (title) title.classList.add("is-in");
      if (lead) setTimeout(() => lead.classList.add("is-in"), 350);
    });
  }

  // ------- LINE SPLIT (data-reveal-lines) -------
  // Walks text nodes only, wrapping each word into <span class="word"><span>WORD</span></span>.
  // This preserves any inline tags (<em>, <br>, <span class="cta__underline">, etc.) intact.
  function splitLines(el) {
    if (el.dataset.splitted === "1") return;

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.trim().length) textNodes.push(node);
    }

    textNodes.forEach((tn) => {
      const parts = tn.nodeValue.split(/(\s+)/); // keep whitespace tokens
      const frag = document.createDocumentFragment();
      parts.forEach((p) => {
        if (p.length === 0) return;
        if (/^\s+$/.test(p)) {
          frag.appendChild(document.createTextNode(p));
        } else {
          const outer = document.createElement("span");
          outer.className = "word";
          const inner = document.createElement("span");
          inner.textContent = p;
          outer.appendChild(inner);
          frag.appendChild(outer);
        }
      });
      tn.parentNode.replaceChild(frag, tn);
    });

    el.dataset.splitted = "1";
  }

  function initLineReveals() {
    document.querySelectorAll("[data-reveal-lines]").forEach((el) => {
      splitLines(el);
      const words = el.querySelectorAll(".word > span");
      gsap.set(el.querySelectorAll(".word"), { overflow: "hidden", display: "inline-block", verticalAlign: "top" });
      gsap.set(words, { yPercent: 110, display: "inline-block" });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(words, {
            yPercent: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.03,
          });
        },
      });
    });
  }

  // ------- FADE REVEALS -------
  function initFadeReveals() {
    document.querySelectorAll("[data-reveal-fade]").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => el.classList.add("is-in"),
      });
    });
  }

  // ------- CHAPTER REVEALS -------
  function initChapters() {
    document.querySelectorAll("[data-chapter]").forEach((el, i) => {
      const body = el.querySelector(".chapter__body");
      const num = el.querySelector(".chapter__num");
      gsap.set([num, body], { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => {
          el.classList.add("is-in");
          gsap.to(num, { opacity: 1, y: 0, duration: .8, ease: "expo.out" });
          gsap.to(body, { opacity: 1, y: 0, duration: .9, ease: "expo.out", delay: .1 });
        },
      });
    });
  }

  // ------- STATS COUNTERS -------
  function initStats() {
    document.querySelectorAll("[data-stat]").forEach((el) => {
      const target = parseInt(el.dataset.target || "0", 10);
      const countEl = el.querySelector("[data-count]");
      if (!countEl) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "expo.out",
            onUpdate: () => {
              countEl.textContent = Math.round(obj.v);
            },
          });
        },
      });
    });
  }

  // ------- SPLIT FILL BARS -------
  function initSplitBars() {
    document.querySelectorAll(".split__fill").forEach((el) => {
      const pct = parseInt(el.dataset.fill || "0", 10);
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(el, { width: pct + "%", duration: 1.4, ease: "expo.out" });
        },
      });
    });
  }

  // ------- HERO PARALLAX (floating shapes + subtle 3D on title) -------
  function initParallax() {
    const shapes = document.querySelectorAll(".hero .float");
    shapes.forEach((s, i) => {
      gsap.to(s, {
        yPercent: (i + 1) * -18,
        xPercent: i % 2 === 0 ? -6 : 6,
        rotate: i % 2 === 0 ? 30 : -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const title = document.querySelector(".hero__title");
    if (title && !matchMedia("(hover: none)").matches) {
      const stage = document.querySelector(".hero__stage");
      stage.addEventListener("mousemove", (e) => {
        const r = stage.getBoundingClientRect();
        const mx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const my = (e.clientY - (r.top + r.height / 2)) / r.height;
        gsap.to(title, {
          rotationY: mx * 4,
          rotationX: -my * 3,
          transformPerspective: 1000,
          transformOrigin: "center",
          duration: 0.9,
          ease: "expo.out",
        });
      });
      stage.addEventListener("mouseleave", () => {
        gsap.to(title, { rotationY: 0, rotationX: 0, duration: 1, ease: "expo.out" });
      });
    }
  }

  // ------- CTA underline trigger -------
  function initCtaUnderline() {
    const t = document.querySelector(".cta__title");
    if (!t) return;
    ScrollTrigger.create({
      trigger: t,
      start: "top 80%",
      once: true,
      onEnter: () => t.classList.add("is-in"),
    });
  }

  // ------- YEAR -------
  function initYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  // ------- BOOT -------
  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    runLoader().then(() => {
      initLenis();
      initNav();
      initCursor();
      initMagnetic();
      heroReveal();

      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        initLineReveals();
        initFadeReveals();
        initChapters();
        initStats();
        initSplitBars();
        initParallax();
        initCtaUnderline();
        ScrollTrigger.refresh();
      } else {
        // Fallback: reveal everything
        document.querySelectorAll("[data-reveal-fade], [data-chapter]").forEach((e) => e.classList.add("is-in"));
      }
    });
  });
})();
