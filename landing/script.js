/* IT Niche — landing page interactions */
(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Populate US states
  var STATES = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
    'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
    'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
    'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
    'Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
    'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ];
  var stateSelect = document.getElementById('q-state');
  if (stateSelect) {
    var frag = document.createDocumentFragment();
    STATES.forEach(function (s) {
      var o = document.createElement('option');
      o.value = s; o.textContent = s;
      frag.appendChild(o);
    });
    stateSelect.appendChild(frag);
  }

  // Mobile nav toggle
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    // close on link click (mobile)
    document.querySelectorAll('.nav__links a, .nav__cta').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Form submit — show success only (no backend)
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.field.invalid').forEach(function (f) { f.classList.remove('invalid'); });

      // Simple client-side required validation
      var required = form.querySelectorAll('[required]');
      var firstInvalid = null;
      required.forEach(function (input) {
        var val = (input.value || '').trim();
        var isEmail = input.type === 'email';
        var valid = !!val && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
        if (!valid) {
          var field = input.closest('.field');
          if (field) field.classList.add('invalid');
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Log form data (no backend integration)
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      // eslint-disable-next-line no-console
      console.log('[IT Niche] Quote request:', data);

      // Reveal success + reset
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // Hide the submit button/note to prevent duplicate submissions
      var submitWrap = form.querySelector('.form__submit');
      if (submitWrap) submitWrap.style.display = 'none';

      // Reset after 6s so users can send another
      setTimeout(function () {
        form.reset();
        if (success) success.hidden = true;
        if (submitWrap) submitWrap.style.display = '';
      }, 8000);
    });
  }

  // Scroll reveal (progressive enhancement)
  var revealTargets = [
    '.hero__copy', '.hero__visual',
    '.stat',
    '.section__head',
    '.service-card',
    '.timeline__step',
    '.why__intro', '.why__list li',
    '.quote__aside', '.quote__form',
    '.cta__inner'
  ];
  var toReveal = [];
  revealTargets.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.setAttribute('data-reveal', '');
      toReveal.push(el);
    });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    toReveal.forEach(function (el) { io.observe(el); });
  } else {
    toReveal.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
