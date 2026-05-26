/* IT Niche – Thank You landing page
   Vanilla JS · no dependencies */
(function () {
  'use strict';

  /* -------- Footer year -------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Mobile nav toggle -------- */
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (open) {
        mobile.setAttribute('hidden', '');
      } else {
        mobile.removeAttribute('hidden');
      }
    });
    // Close on link click
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('hidden', '');
      });
    });
  }

  /* -------- Smooth scroll offset for sticky header -------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* -------- Animated counters -------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1400;
    var start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    }
    requestAnimationFrame(step);
  }

  /* -------- IntersectionObserver: reveal + counters -------- */
  var revealEls = document.querySelectorAll(
    '.hero__copy, .hero__art, .stat, .timeline__item, .card, .lunch__copy, .lunch__art, .cta__inner, .section-head, .note'
  );
  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i * 40, 320) + 'ms';
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Trigger counters when stat enters
          if (entry.target.classList.contains('stat')) {
            var num = entry.target.querySelector('.stat__num');
            if (num && !num.dataset.done) {
              num.dataset.done = '1';
              animateCount(num);
            }
          }
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('.stat__num').forEach(animateCount);
  }

  /* -------- Subtle parallax on hero art -------- */
  var heroArt = document.querySelector('.hero__svg');
  if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      heroArt.style.transform = 'translate(' + (x * 10).toFixed(1) + 'px, ' + (y * 10).toFixed(1) + 'px)';
    });
    hero.addEventListener('mouseleave', function () {
      heroArt.style.transform = 'translate(0,0)';
    });
  }
})();
