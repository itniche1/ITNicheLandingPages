/* =========================================================
   IT Niche — Landing Page
   Vanilla JS only
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Lucide icons ---------- */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  // Lucide script has `defer`, so wait for DOM ready
  document.addEventListener('DOMContentLoaded', initIcons);

  /* ---------- Footer year ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

  /* ---------- Mobile nav toggle ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('navToggle');
    var menu   = document.getElementById('navMobile');
    if (!toggle || !menu) return;

    function close() {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      menu.hidden = true;
    }
    function open() {
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      menu.hidden = false;
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) close();
      else open();
    });

    // Close after clicking any link
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    // Close on resize-up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) close();
    });
  });

  /* ---------- Reveal-on-scroll ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var revealEls = document.querySelectorAll(
      '.section__head, .service-card, .feature-list li, .audience__card, ' +
      '.timeline__step, .mock-dashboard, .phone, .cta__inner, .stats'
    );

    revealEls.forEach(function (el) { el.classList.add('reveal'); });

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // staggered reveal for siblings
          var el = entry.target;
          var delay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 4) * 80;
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  });

  /* ---------- Animated counters ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var nums = document.querySelectorAll('.stat__num');
    if (!nums.length) return;

    function formatNumber(n, suffix) {
      if (suffix === 'M+') {
        // express in millions (e.g., 2,000,000 -> "2M+")
        return (Math.round((n / 1000000) * 10) / 10) + 'M+';
      }
      return n.toLocaleString() + (suffix || '');
    }

    function animate(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var start = performance.now();

      function step(now) {
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        var current = Math.round(target * eased);
        el.textContent = formatNumber(current, suffix);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = formatNumber(target, suffix);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { observer.observe(el); });
  });

  /* ---------- CTA form (front-end only) ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('ctaForm');
    var note = document.getElementById('ctaNote');
    if (!form || !note) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = form.querySelector('input[name="name"]').value.trim();
      var email = form.querySelector('input[name="email"]').value.trim();
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) {
        note.style.color = '#ff8a65';
        note.textContent = 'Please enter your name.';
        return;
      }
      if (!emailRe.test(email)) {
        note.style.color = '#ff8a65';
        note.textContent = 'Please enter a valid work email.';
        return;
      }

      note.style.color = '#e57119';
      note.textContent = 'Thanks, ' + name.split(' ')[0] + '! We\'ll be in touch within 24 hours.';
      form.reset();
    });
  });

  /* ---------- Smooth-scroll offset for sticky header ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  });
})();
