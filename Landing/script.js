/* IT Niche — Sitemap Landing
   Vanilla JS: nav toggle, filtering, counters, reveal, back-to-top
*/
(function () {
  "use strict";

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("primaryNav");
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navList.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Sitemap filters ---------- */
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#sitemapGrid .card");
  const emptyEl = document.getElementById("sitemapEmpty");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.getAttribute("data-filter");
      let visible = 0;
      cards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        card.classList.toggle("is-hidden", !show);
        if (show) visible++;
      });
      if (emptyEl) emptyEl.hidden = visible !== 0;
    });
  });

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-target")) || 0;
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * easeOut(p)).toString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- IntersectionObserver for reveal + counters ---------- */
  const revealEls = document.querySelectorAll(
    ".hero__content, .hero__panel, .intro__copy, .intro__chips, .card, .cta__copy, .cta__list"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterIO.observe(el));

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    if (!toTop) return;
    toTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
