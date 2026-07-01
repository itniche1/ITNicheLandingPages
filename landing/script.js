/* ─────────────────────────────────────────────
   IT NICHE — Landing Page
   Vanilla JavaScript
───────────────────────────────────────────── */

(function () {
  "use strict";

  // ──────────────── Init Lucide icons ────────────────
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  document.addEventListener("DOMContentLoaded", initIcons);
  // Defer ensures lucide script is loaded; re-call after a tick just in case
  window.addEventListener("load", initIcons);

  // ──────────────── Year in footer ────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ──────────────── Sticky header on scroll ────────────────
  const header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ──────────────── Mobile menu ────────────────
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const iconOpen = document.getElementById("menuIconOpen");
  const iconClose = document.getElementById("menuIconClose");

  function setMenu(open) {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle("hidden", !open);
    menuToggle.setAttribute("aria-expanded", String(open));
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  }
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.contains("hidden");
      setMenu(open);
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
  }

  // ──────────────── Marquee — duplicate items for seamless loop ────────────────
  const track = document.getElementById("marqueeTrack");
  if (track) {
    const ITEMS = [
      "WEB DESIGN",
      "SEO",
      "CUSTOM SOFTWARE",
      "DIGITAL MARKETING",
      "BRAND IDENTITY",
      "E-COMMERCE",
      "CMS DEVELOPMENT",
      "LEAD GENERATION",
    ];
    const html = ITEMS.map(
      (t) => `<span>${t}</span><span class="mq-dot" aria-hidden="true"></span>`
    ).join("");
    // Duplicate for seamless loop
    track.innerHTML = html + html;
  }

  // ──────────────── Reveal on scroll (IntersectionObserver) ────────────────
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // ──────────────── Dual timezone clocks (US CST + IN IST) ────────────────
  function getZoneParts(timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    let hour = 0, minute = 0;
    parts.forEach((p) => {
      if (p.type === "hour") hour = parseInt(p.value, 10) % 24;
      if (p.type === "minute") minute = parseInt(p.value, 10);
    });
    return { hour, minute };
  }
  function fmt12(hour24, minute) {
    const period = hour24 >= 12 ? "PM" : "AM";
    let h = hour24 % 12;
    if (h === 0) h = 12;
    return `${h}:${String(minute).padStart(2, "0")} ${period}`;
  }
  function setHands(hourEl, minuteEl, hour, minute) {
    if (!hourEl || !minuteEl) return;
    const hourDeg = ((hour % 12) + minute / 60) * 30;
    const minuteDeg = minute * 6;
    hourEl.setAttribute("transform", `rotate(${hourDeg} 40 40)`);
    minuteEl.setAttribute("transform", `rotate(${minuteDeg} 40 40)`);
  }
  function updateClocks() {
    try {
      const us = getZoneParts("America/Chicago");
      const inTZ = getZoneParts("Asia/Kolkata");

      const usTimeEl = document.getElementById("usTime");
      const inTimeEl = document.getElementById("inTime");
      if (usTimeEl) usTimeEl.textContent = fmt12(us.hour, us.minute);
      if (inTimeEl) inTimeEl.textContent = fmt12(inTZ.hour, inTZ.minute);

      setHands(
        document.getElementById("usHour"),
        document.getElementById("usMinute"),
        us.hour,
        us.minute
      );
      setHands(
        document.getElementById("inHour"),
        document.getElementById("inMinute"),
        inTZ.hour,
        inTZ.minute
      );
    } catch (e) {
      // Intl may be limited on some browsers — silently ignore
    }
  }
  updateClocks();
  setInterval(updateClocks, 30000);

  // ──────────────── Toast utility ────────────────
  const toastContainer = document.getElementById("toastContainer");
  function toast(type, title, desc) {
    if (!toastContainer) return;
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.setAttribute("role", type === "error" ? "alert" : "status");
    el.innerHTML = `
      <div>
        <p class="toast-title">${title}</p>
        ${desc ? `<p class="toast-desc">${desc}</p>` : ""}
      </div>
    `;
    toastContainer.appendChild(el);
    setTimeout(() => {
      el.classList.add("leaving");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }, 4200);
  }

  // ──────────────── Contact form (static) ────────────────
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const required = ["firstName", "lastName", "email", "company"];
      let firstInvalid = null;
      let missing = false;

      required.forEach((id) => {
        const input = form.querySelector(`#${id}`);
        if (!input) return;
        const field = input.closest(".field");
        const val = (input.value || "").trim();
        if (!val) {
          missing = true;
          if (field) field.classList.add("invalid");
          if (!firstInvalid) firstInvalid = input;
        } else if (field) {
          field.classList.remove("invalid");
        }
      });

      // Validate email format
      const emailInput = form.querySelector("#email");
      if (emailInput && emailInput.value.trim()) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        if (!ok) {
          missing = true;
          emailInput.closest(".field")?.classList.add("invalid");
          if (!firstInvalid) firstInvalid = emailInput;
        }
      }

      if (missing) {
        toast(
          "error",
          "Please complete the form.",
          "Fill in the required fields with a valid email."
        );
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate brief send delay
      const submitBtn = form.querySelector('button[type="submit"]');
      const labelEl = submitBtn?.querySelector(".btn-label");
      const originalLabel = labelEl ? labelEl.textContent : "Send Message";
      if (labelEl) labelEl.textContent = "Sending…";
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (labelEl) labelEl.textContent = originalLabel;
        if (submitBtn) submitBtn.disabled = false;
        form.reset();
        form.querySelectorAll(".field.invalid").forEach((f) => f.classList.remove("invalid"));
        toast(
          "success",
          "Thanks — we'll be in touch shortly.",
          "Your message has been received."
        );
      }, 700);
    });

    // Clear invalid state on input
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        input.closest(".field")?.classList.remove("invalid");
      });
    });
  }
})();
