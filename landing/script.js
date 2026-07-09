/* IT Niche — Landing interactions */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    initNav();
    initReveal();
    initCounters();
    initLoginForm();
    initPasswordToggle();
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Sticky nav + mobile toggle ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector('[data-testid="nav-toggle"]');

    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    // close mobile nav on link click
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  function initReveal() {
    var candidates = document.querySelectorAll(
      ".section__head, .service-card, .feature, .timeline__item, .stat, .login__form, .login__intro, .hero__content, .hero__graphic, .cta__inner"
    );
    candidates.forEach(function (el) { el.classList.add("reveal"); });

    if (!("IntersectionObserver" in window)) {
      candidates.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add("is-visible"); }, i * 40);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    candidates.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Stat counters ---------- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    if (!("IntersectionObserver" in window)) {
      nums.forEach(function (el) { animateCount(el); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;
    var initial = 0;

    if (target === 0) {
      el.textContent = suffix + "0";
      return;
    }

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(initial + (target - initial) * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Login form (UI mockup) ---------- */
  function initLoginForm() {
    var form = document.querySelector('[data-testid="login-form"]');
    if (!form) return;

    var success = form.querySelector('[data-testid="login-success"]');
    var submitBtn = form.querySelector('[data-testid="login-submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var username = form.querySelector('[data-testid="login-username-input"]');
      var password = form.querySelector('[data-testid="login-password-input"]');

      valid = validateField(username, "Username is required") && valid;
      valid = validateField(password, "Password is required", 6, "Password must be at least 6 characters") && valid;

      if (!valid) return;

      var originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in…';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        if (success) {
          success.hidden = false;
          success.style.opacity = "0";
          requestAnimationFrame(function () {
            success.style.transition = "opacity .35s ease";
            success.style.opacity = "1";
          });
        }
        form.reset();
        setTimeout(function () {
          if (success) success.hidden = true;
        }, 4000);
      }, 900);
    });

    // clear errors on input
    form.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (!field) return;
        field.classList.remove("has-error");
        var err = field.querySelector(".field__error");
        if (err) err.textContent = "";
      });
    });
  }

  function validateField(input, requiredMsg, minLen, minMsg) {
    var field = input.closest(".field");
    var err = field ? field.querySelector(".field__error") : null;
    var value = (input.value || "").trim();

    if (!value) {
      setError(field, err, requiredMsg);
      return false;
    }
    if (minLen && value.length < minLen) {
      setError(field, err, minMsg);
      return false;
    }
    if (field) field.classList.remove("has-error");
    if (err) err.textContent = "";
    return true;
  }

  function setError(field, err, msg) {
    if (field) field.classList.add("has-error");
    if (err) err.textContent = msg;
  }

  /* ---------- Password visibility toggle ---------- */
  function initPasswordToggle() {
    var toggle = document.querySelector('[data-testid="login-password-toggle"]');
    var input = document.querySelector('[data-testid="login-password-input"]');
    if (!toggle || !input) return;

    toggle.addEventListener("click", function () {
      var isPwd = input.type === "password";
      input.type = isPwd ? "text" : "password";
      var icon = toggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-eye", !isPwd);
        icon.classList.toggle("fa-eye-slash", isPwd);
      }
      toggle.setAttribute("aria-label", isPwd ? "Hide password" : "Show password");
    });
  }
})();
