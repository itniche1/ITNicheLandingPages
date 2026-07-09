/* IT Niche — Get Started Landing script */
(function () {
  "use strict";

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Reveal-on-scroll
  const revealables = document.querySelectorAll(
    ".hero__left, .hero__art, .service, .pkg, .tl, .feat, .form, .start__left, .section__head"
  );
  revealables.forEach((el) => el.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  // Smooth scroll for in-page anchors (respects reduced-motion via CSS)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Form handling — visual only
  const form = document.getElementById("get-started-form");
  const success = document.getElementById("form-success");
  const toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    if (msg) {
      const label = toast.querySelector(".toast__msg");
      if (label) label.textContent = msg;
    }
    toast.hidden = false;
    // force reflow to allow transition
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => (toast.hidden = true), 320);
    }, 3200);
  }

  function validate(form) {
    let ok = true;
    const required = form.querySelectorAll("[required]");
    required.forEach((f) => {
      const val = (f.value || "").trim();
      if (!val) {
        ok = false;
        f.classList.add("is-invalid");
      } else {
        f.classList.remove("is-invalid");
      }
    });
    return ok;
  }

  if (form) {
    // Remove invalid state on input
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains("is-invalid")) {
        t.classList.remove("is-invalid");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(form)) {
        showToast("Please complete the required fields.");
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      // Visual only — log for developer inspection
      // eslint-disable-next-line no-console
      console.log("[get-started] Submitted:", data);

      if (success) {
        success.hidden = false;
      }
      showToast("Thanks! We'll be in touch shortly.");
      form.reset();
      // hide success message after a while
      setTimeout(() => {
        if (success) success.hidden = true;
      }, 6000);
    });
  }
})();
