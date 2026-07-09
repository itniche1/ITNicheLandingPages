/* =========================================================
   LeadForge landing page — vanilla JS
   - Mobile menu toggle
   - Smooth-scroll offset for sticky header
   - Reveal-on-scroll animations
   - Animated stats counters
   - CTA form: client-side validation (visual only)
   - Footer year
========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    setupMobileMenu();
    setupSmoothScroll();
    setupReveal();
    setupCounters();
    setupCtaForm();
  }

  /* -------- Year -------- */
  function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* -------- Mobile menu -------- */
  function setupMobileMenu() {
    const btn = document.getElementById("menuToggle");
    const nav = document.getElementById("mobileNav");
    if (!btn || !nav) return;

    const close = () => {
      btn.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      nav.style.display = "none";
    };
    const open = () => {
      btn.setAttribute("aria-expanded", "true");
      nav.hidden = false;
      nav.style.display = "flex";
    };

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });

    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) close();
    });
  }

  /* -------- Smooth-scroll offset for sticky header -------- */
  function setupSmoothScroll() {
    const header = document.querySelector(".site-header");
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id === "#" || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = (header?.offsetHeight || 0) + 8;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  /* -------- Reveal on scroll -------- */
  function setupReveal() {
    // Tag common elements for reveal animation
    const selectors = [
      ".hero-copy", ".hero-visual",
      ".stat",
      ".section-head",
      ".card",
      ".t-step",
      ".ch",
      ".flow",
      ".faq-item",
      ".cta-copy", ".cta-form",
    ];
    const els = document.querySelectorAll(selectors.join(","));
    els.forEach((el, i) => {
      el.setAttribute("data-reveal", "");
      el.style.transitionDelay = `${Math.min(i * 40, 400)}ms`;
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* -------- Stats counters -------- */
  function setupCounters() {
    const nums = document.querySelectorAll(".stat-num[data-count]");
    if (!nums.length) return;

    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const isFloat = !Number.isInteger(target);
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      nums.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    nums.forEach((n) => io.observe(n));
  }

  /* -------- CTA form (visual only) -------- */
  function setupCtaForm() {
    const form = document.getElementById("ctaForm");
    if (!form) return;
    const note = document.getElementById("formNote");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      note.className = "form-note";
      note.textContent = "";

      const name = form.querySelector("#f-name");
      const email = form.querySelector("#f-email");

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!name.value.trim() || !emailOk) {
        note.classList.add("error");
        note.textContent = "Please provide your name and a valid email.";
        (name.value.trim() ? email : name).focus();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Sending…";

      // Purely visual: simulate a brief send, then reset
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        note.classList.add("success");
        note.textContent = "Thanks — we'll be in touch within one business day.";
      }, 800);
    });
  }
})();
