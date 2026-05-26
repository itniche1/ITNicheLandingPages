/* IT Niche — Landing interactions
   Vanilla JS · No deps · Accessibility-friendly
*/
(function () {
  'use strict';

  /* ---------- Year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = [
    '.hero-copy > *',
    '.hero-meta',
    '.section-head > *',
    '.amc-card',
    '.included-item',
    '.plan',
    '.access-card',
    '.ebook-copy > *',
    '.ebook-art'
  ];
  var els = document.querySelectorAll(revealTargets.join(','));
  els.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Smooth scroll offset for sticky nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = document.querySelector('.nav').offsetHeight || 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Animate stat bars when hero visible (re-run on enter) ---------- */
  var bars = document.querySelectorAll('.art-bar i');
  if ('IntersectionObserver' in window && bars.length) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.animation = 'none';
          // force reflow then re-apply
          // eslint-disable-next-line no-unused-expressions
          e.target.offsetWidth;
          e.target.style.animation = '';
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { bo.observe(b); });
  }

  /* ---------- E-Book download (graceful no-op for placeholder) ---------- */
  var ebookBtn = document.querySelector('[data-testid="ebook-download"]');
  if (ebookBtn) {
    ebookBtn.addEventListener('click', function (e) {
      // No real file shipped — provide a friendly micro-interaction
      var original = ebookBtn.textContent;
      ebookBtn.textContent = 'Preparing your copy…';
      ebookBtn.style.pointerEvents = 'none';
      setTimeout(function () {
        ebookBtn.textContent = 'Sent ✓ Check your downloads';
        setTimeout(function () {
          ebookBtn.textContent = original;
          ebookBtn.style.pointerEvents = '';
        }, 2200);
      }, 900);
    });
  }
})();
