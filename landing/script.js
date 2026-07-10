/* Lunch & Learn — script.js
   - Footer year
   - Scroll reveal
   - Stats counter
   - Form validation + success state
*/

(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .card, .topic, .timeline__item, .benefit, .stats__item, .register__intro, .form, .hero__eyebrow, .hero__title, .hero__sub, .hero__actions, .hero__meta"
  );
  revealTargets.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 6) * 60 + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Stats counter ---------- */
  var counters = document.querySelectorAll(".stats__num");
  var counted = false;
  function animateCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var duration = 1200;
      var startTime = null;
      function tick(t) {
        if (!startTime) startTime = t;
        var p = Math.min(1, (t - startTime) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  var statsSection = document.querySelector(".stats");
  if (statsSection && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounters(); so.disconnect(); }
      });
    }, { threshold: 0.4 });
    so.observe(statsSection);
  } else {
    animateCounters();
  }

  /* ---------- Register form ---------- */
  var form = document.getElementById("registerForm");
  var success = document.getElementById("successState");
  var successName = document.getElementById("successName");
  var successDate = document.getElementById("successDate");
  var resetBtn = document.getElementById("resetForm");

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
  }

  function markInvalid(el, invalid) {
    if (!el) return;
    el.classList.toggle("is-invalid", !!invalid);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstName = form.elements["firstName"];
      var lastName  = form.elements["lastName"];
      var email     = form.elements["email"];
      var consent   = form.elements["consent"];
      var date      = form.elements["date"];

      var ok = true;
      if (!firstName.value.trim()) { markInvalid(firstName, true); ok = false; } else markInvalid(firstName, false);
      if (!lastName.value.trim())  { markInvalid(lastName, true);  ok = false; } else markInvalid(lastName, false);
      if (!validateEmail(email.value)) { markInvalid(email, true); ok = false; } else markInvalid(email, false);
      if (!consent.checked) { ok = false; consent.focus(); }

      if (!ok) return;

      // Format date for success message
      var dateStr = "the date you picked";
      if (date && date.value) {
        try {
          var d = new Date(date.value + "T00:00:00");
          dateStr = d.toLocaleDateString(undefined, {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
          });
        } catch (err) { /* noop */ }
      }
      if (successName) successName.textContent = firstName.value.trim() || "friend";
      if (successDate) successDate.textContent = dateStr;

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    // Clear invalid state as user types
    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      el.addEventListener("input",  function () { markInvalid(el, false); });
      el.addEventListener("change", function () { markInvalid(el, false); });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (form) { form.reset(); form.hidden = false; }
      if (success) success.hidden = true;
      if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 6) nav.style.boxShadow = "0 6px 20px -12px rgba(0,0,0,0.15)";
      else nav.style.boxShadow = "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
