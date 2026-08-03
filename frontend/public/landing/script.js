/* =========================================================
   Restaurant Web Builder — landing interactions (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !prefersReduced) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- Anchor smooth scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Hero title lines reveal (JS stagger, zero CSS delay) ---------- */
  document.querySelectorAll(".hero .line").forEach((line, i) => {
    setTimeout(() => line.classList.add("in"), 150 + i * 130);
  });

  /* ---------- Scroll reveal (Intersection Observer, JS stagger) ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.getAttribute("data-delay") || "0");
        setTimeout(() => entry.target.classList.add("is-visible"), delay * 1000);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  revealEls.forEach((el) => io.observe(el));

  /* Stagger reveal for grid children */
  document.querySelectorAll(".cards, .stats-band__grid, .timeline").forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      if (child.hasAttribute("data-reveal")) child.setAttribute("data-delay", (i * 0.08).toFixed(2));
    });
  });

  /* ---------- Count-up numbers ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterIO.observe(c));

  /* ---------- Header scroll state + progress ---------- */
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-progress]");
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Parallax floats ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (!prefersReduced && parallaxEls.length) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax"));
        el.style.transform = "translateY(" + y * speed + "px)";
      });
    }, { passive: true });
  }

  /* ---------- Marquee auto-scroll ---------- */
  const marquee = document.querySelector("[data-marquee]");
  if (marquee && !prefersReduced) {
    let offset = 0;
    const half = marquee.scrollWidth / 2;
    function animateMarquee() {
      offset -= 0.5;
      if (Math.abs(offset) >= half) offset = 0;
      marquee.style.transform = "translateX(" + offset + "px)";
      requestAnimationFrame(animateMarquee);
    }
    requestAnimationFrame(animateMarquee);
  }

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector("[data-cursor]");
  if (cursor && window.matchMedia("(hover: hover)").matches) {
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    function ringFollow() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(ringFollow);
    }
    requestAnimationFrame(ringFollow);
    document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (window.matchMedia("(hover: hover)").matches && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * 0.25 + "px," + y * 0.25 + "px)";
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (menuToggle) { menuToggle.classList.remove("is-open"); menuToggle.setAttribute("aria-expanded", "false"); }
    document.body.style.overflow = "";
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      mobileMenu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  /* ---------- CTA form (static, no backend) ---------- */
  const form = document.querySelector("[data-cta-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const success = form.querySelector("[data-form-success]");
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value || "").trim());
      if (!name.value.trim() || !emailOk) {
        (!name.value.trim() ? name : email).focus();
        return;
      }
      form.querySelectorAll(".field, .btn").forEach((n) => (n.style.display = "none"));
      if (success) { success.hidden = false; }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Safety net: guarantee content reveals ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((e) => e.classList.add("is-visible"));
      document.querySelectorAll(".hero .line:not(.in)").forEach((l) => l.classList.add("in"));
    }, 2200);
  });
})();
