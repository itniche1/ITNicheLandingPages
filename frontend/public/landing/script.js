/* Custom Church Website — Landing script (vanilla JS) */
(function () {
  "use strict";

  // Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.querySelector('[data-testid="nav-mobile-toggle"]');
  var navMobile = document.getElementById("navMobile");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMobile.hidden = expanded;
    });
    navMobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMobile.hidden = true;
      });
    });
  }

  /* ---------------- Toast ---------------- */
  var toastHost = document.getElementById("toastHost");
  function showToast(title, message, opts) {
    if (!toastHost) return;
    opts = opts || {};
    var t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.setAttribute("data-testid", "toast");
    t.innerHTML =
      '<div class="toast__ico" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none">' +
          '<path d="M5 12l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        "</svg>" +
      "</div>" +
      '<div><div class="toast__title">' + title + '</div><div class="toast__msg">' + message + "</div></div>" +
      '<button class="toast__close" aria-label="Dismiss" data-testid="toast-close">×</button>';
    toastHost.appendChild(t);

    function dismiss() {
      t.classList.add("toast--out");
      setTimeout(function () { t.remove(); }, 400);
    }
    t.querySelector(".toast__close").addEventListener("click", dismiss);
    setTimeout(dismiss, opts.duration || 4200);
  }

  /* ---------------- Feedback form ---------------- */
  var form = document.getElementById("feedbackForm");
  if (form) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("field--error"); });

      var fields = [
        { id: "f-name",     test: function (v) { return v.trim().length >= 2; } },
        { id: "f-company",  test: function (v) { return v.trim().length >= 1; } },
        { id: "f-email",    test: function (v) { return emailPattern.test(v.trim()); } },
        { id: "f-phone",    test: function (v) { return v.replace(/[^\d]/g, "").length >= 6; } },
        { id: "f-message",  test: function (v) { return v.trim().length >= 5; } }
      ];
      fields.forEach(function (f) {
        var el = document.getElementById(f.id);
        if (!el) return;
        if (!f.test(el.value)) {
          valid = false;
          var field = el.closest(".field");
          if (field) field.classList.add("field--error");
        }
      });
      var consent = document.getElementById("f-consent");
      if (consent && !consent.checked) {
        valid = false;
        var cf = consent.closest(".field");
        if (cf) cf.classList.add("field--error");
      }

      if (!valid) {
        showToast("Almost there", "Please fill in the highlighted fields.");
        var firstError = form.querySelector(".field--error input, .field--error textarea, .field--error select");
        if (firstError) firstError.focus();
        return;
      }

      var submitBtn = form.querySelector('[data-testid="form-submit"]');
      if (submitBtn) {
        submitBtn.setAttribute("disabled", "true");
        submitBtn.style.opacity = "0.75";
      }
      setTimeout(function () {
        showToast("Feedback sent", "Thanks — a real human will reply within 24h.");
        form.reset();
        if (submitBtn) {
          submitBtn.removeAttribute("disabled");
          submitBtn.style.opacity = "1";
        }
      }, 550);
    });
  }

  /* ---------------- Stats counter ---------------- */
  var counters = document.querySelectorAll(".stats__num[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      var value = Math.round(eased * target);
      el.textContent = prefix + value + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .card, .timeline__step, .stats__item, .form, .feedback__intro, .faq__item, .cta__inner, .hero__copy, .hero__art"
  );
  revealTargets.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i * 40, 200) + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (entry.target.matches(".stats__item")) {
          var num = entry.target.querySelector(".stats__num[data-count]");
          if (num && !num.dataset.counted) {
            num.dataset.counted = "true";
            animateCount(num);
          }
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    counters.forEach(animateCount);
  }

  /* ---------------- Smooth focus for anchor links (a11y) ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Move focus for keyboard users
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
})();
