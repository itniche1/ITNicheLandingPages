/* Landing — vanilla JS interactions */
(function () {
  'use strict';

  // 1) Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Reveal on scroll
  var revealTargets = document.querySelectorAll(
    '.hero__content, .hero__visual, .info-card, .tech, .cta__text, .cta__form, .section-head'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // 3) Animated counters
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var duration = 1400;
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  // 4) Smooth anchor focus for accessibility
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id && id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  // 5) CTA form — lightweight client-side handling (no backend)
  var form = document.querySelector('[data-testid="cta-form"]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var note = form.querySelector('[data-testid="cta-note"]');
      var btn = form.querySelector('button[type="submit"]');
      if (!input || !input.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) {
        if (note) {
          note.textContent = 'Please enter a valid email address.';
          note.style.color = '#ffb38a';
        }
        input && input.focus();
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(function () {
        btn.textContent = 'Request sent ✓';
        if (note) {
          note.textContent = "Thanks — we'll be in touch within one business day.";
          note.style.color = 'rgba(255,255,255,0.7)';
        }
        input.value = '';
        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = 'Request a strategy call';
        }, 2400);
      }, 700);
    });
  }
})();
