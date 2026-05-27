/* ───────────────────────────────────────────────
   IT Niche — Landing page interactions
   Vanilla JS only. No dependencies.
   ─────────────────────────────────────────────── */

(function () {
  "use strict";

  /* Year in footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Respect reduced motion */
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ─────────── Reveal on scroll ─────────── */
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .ux-card, .step, .stat-card, .hero-art, .hero-copy, .trust-strip, .cta-inner"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }

  /* ─────────── Animated counters ─────────── */
  const counters = document.querySelectorAll("[data-counter]");

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1200;
    const start = performance.now();

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && !prefersReduced) {
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterIO.observe(el));
  } else {
    counters.forEach((el) => {
      const target = parseFloat(el.dataset.target || "0");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      el.textContent = target.toFixed(decimals);
    });
  }

  /* ─────────── Bar chart trigger ─────────── */
  const barCharts = document.querySelectorAll(".bar-chart");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const barIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            barIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    barCharts.forEach((el) => barIO.observe(el));
  } else {
    barCharts.forEach((el) => el.classList.add("in-view"));
  }

  /* ─────────── Gauge animation ─────────── */
  const gaugeArc = document.getElementById("gauge-arc");
  const gaugeNeedle = document.getElementById("gauge-needle");
  // 2.4s out of a 0–5s scale = 48%
  const gaugePercent = 48;
  // arc sweeps from -90° (left) to 90° (right), total 180°.
  // needle currently starts at -70°, end angle for 48% = -90 + 180*0.48 = -3.6°.
  const needleStartDeg = -90;
  const needleEndDeg = -90 + 180 * (gaugePercent / 100);

  const animateGauge = () => {
    if (!gaugeArc || !gaugeNeedle) return;
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      // dash offset goes from 100 → (100 - percent)
      const offset = 100 - gaugePercent * eased;
      gaugeArc.setAttribute("stroke-dashoffset", offset.toFixed(2));

      // needle rotates
      const deg = needleStartDeg + (needleEndDeg - needleStartDeg) * eased;
      gaugeNeedle.setAttribute("transform", `rotate(${deg.toFixed(2)})`);

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (gaugeArc && gaugeNeedle) {
    if ("IntersectionObserver" in window && !prefersReduced) {
      const gaugeIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateGauge();
              gaugeIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      gaugeIO.observe(gaugeArc.closest(".card") || gaugeArc);
    } else {
      // jump straight to end values
      gaugeArc.setAttribute(
        "stroke-dashoffset",
        (100 - gaugePercent).toFixed(2)
      );
      gaugeNeedle.setAttribute(
        "transform",
        `rotate(${needleEndDeg.toFixed(2)})`
      );
    }
  }

  /* ─────────── Smooth scroll (with header offset) ─────────── */
  const headerEl = document.querySelector(".site-header");
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = headerEl ? headerEl.offsetHeight : 0;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({
        top: y,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    });
  });
})();
