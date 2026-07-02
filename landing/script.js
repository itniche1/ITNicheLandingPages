/* Custom Church Website — Landing JS */
(function () {
  "use strict";

  // ------- Year in footer -------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ------- Mobile nav -------
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobileNav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      mobileNav.hidden = !isOpen;
    });

    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        header.classList.remove("open");
        toggle.classList.remove("open");
        mobileNav.hidden = true;
      });
    });
  }

  // ------- Reveal on scroll -------
  const revealTargets = document.querySelectorAll(
    ".section-head, .service-card, .stat, .tl-item, .why-list li, .contact-form, .office, .cta-inner, .hero-copy, .hero-visual"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("in"));
  }

  // ------- Animated counters -------
  const counters = document.querySelectorAll(".stat-num[data-count]");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const cIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          cIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cIO.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // ------- Contact form (client-side only) -------
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const setInvalid = (el, invalid) => {
    if (!el) return;
    el.classList.toggle("invalid", !!invalid);
  };

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  if (form) {
    // Live clear on input
    form.querySelectorAll("input, select, textarea").forEach(el => {
      el.addEventListener("input", () => setInvalid(el, false));
      el.addEventListener("change", () => setInvalid(el, false));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      let ok = true;
      const requiredFields = ["firstName", "lastName", "email", "company", "topic", "message"];
      requiredFields.forEach(name => {
        const el = form.elements[name];
        if (!el || !String(el.value).trim()) {
          setInvalid(el, true); ok = false;
        }
      });

      const emailEl = form.elements["email"];
      if (emailEl && emailEl.value && !validateEmail(emailEl.value.trim())) {
        setInvalid(emailEl, true); ok = false;
      }

      const consent = form.querySelector('input[type="checkbox"]');
      if (consent && !consent.checked) {
        ok = false;
        status.className = "form-status error";
        status.textContent = "Please agree to be contacted before submitting.";
        return;
      }

      if (!ok) {
        status.className = "form-status error";
        status.textContent = "Please fill in all required fields correctly.";
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus({ preventScroll: false });
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';

      // Simulated client-side handling
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        status.className = "form-status success";
        const fn = form.elements["firstName"].value.trim();
        status.textContent = `Thanks${fn ? ", " + fn : ""}! Your message has been received — we'll be in touch within 1 business day.`;
        form.reset();
      }, 700);
    });
  }

  // ------- Header shadow on scroll -------
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 6) header.style.boxShadow = "0 6px 20px rgba(11,11,11,.06)";
    else header.style.boxShadow = "none";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

})();
