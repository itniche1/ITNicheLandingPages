/* ==========================================================
   IT Niche eBook Landing — Vanilla JS
   - Sticky nav state
   - Mobile nav toggle
   - Smooth scroll
   - Scroll reveal (IntersectionObserver)
   - Stat counters
   - Form validation + sample PDF download + toast
   ========================================================== */

(() => {
  'use strict';

  // ---------- helpers ----------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- year ----------
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- sticky nav state ----------
  const nav = $('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- mobile nav ----------
  const toggle = $('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // close on link click
    $$('.nav__links a, .nav__cta').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------- reveal on scroll ----------
  const revealEls = $$('.reveal');
  const timeline  = $('.timeline');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));

    if (timeline) {
      const tio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            timeline.classList.add('is-revealed');
            tio.disconnect();
          }
        });
      }, { threshold: 0.25 });
      tio.observe(timeline);
    }
  } else {
    revealEls.forEach(el => el.classList.add('is-revealed'));
    if (timeline) timeline.classList.add('is-revealed');
  }

  // ---------- stat counters ----------
  const counters = $$('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // ---------- smooth anchor offset for sticky nav (only when nav exists) ----------
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ==================================================
  // FORM: validate -> generate sample PDF -> download + toast
  // ==================================================
  const form = $('#ebook-form');
  const toast = $('#toast');
  const toastClose = $('.toast__close');
  let toastTimer;

  const showToast = (title, msg) => {
    if (!toast) return;
    if (title) $('.toast__title', toast).textContent = title;
    if (msg)   $('.toast__msg', toast).textContent   = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 5000);
  };
  if (toastClose) toastClose.addEventListener('click', () => toast.classList.remove('is-visible'));

  const setError = (name, msg) => {
    const field = form.querySelector(`[name="${name}"]`)?.closest('.field');
    const err   = form.querySelector(`[data-err-for="${name}"]`);
    if (field) field.classList.toggle('has-err', !!msg);
    if (err) err.textContent = msg || '';
  };

  const validate = (data) => {
    const errors = {};
    if (!data.firstName.trim()) errors.firstName = 'First name is required.';
    if (!data.lastName.trim())  errors.lastName  = 'Last name is required.';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, '').length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!data.company.trim()) errors.company = 'Company is required.';
    if (data.url && !/^https?:\/\/\S+\.\S+/.test(data.url)) {
      errors.url = 'Use a full URL (https://example.com).';
    }
    if (!data.consent) errors.consent = 'Please agree to receive the eBook.';
    return errors;
  };

  // ---------- Minimal valid PDF generator (no dependencies) ----------
  // Creates a 1-page PDF with a title + a few lines, personalised with the user's name.
  const buildSamplePdf = (name) => {
    const lines = [
      'IT NICHE  -  WHAT YOUR WEB-GUY DOESNT WANT YOU TO KNOW',
      '',
      'Hello ' + (name || 'Friend') + ',',
      '',
      'Thank you for downloading our free eBook.',
      'This is a sample preview - your full copy will follow by email.',
      '',
      'Inside this book you will discover:',
      '  - How layout decides the first 5 seconds',
      '  - Mapping functionality before writing code',
      '  - SEO foundations that quietly compound',
      '  - A transparent process from brief to launch',
      '',
      'Read it, then come back for a free 30-minute consult.',
      '',
      '- The IT Niche team',
    ];

    // Build PDF content stream
    const escape = (s) => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    let y = 760;
    let stream = 'BT\n/F1 18 Tf\n72 ' + y + ' Td\n(' + escape(lines[0]) + ') Tj\nET\n';
    y -= 30;
    stream += 'BT\n/F2 12 Tf\n';
    let first = true;
    for (let i = 1; i < lines.length; i++) {
      if (first) {
        stream += '72 ' + y + ' Td\n';
        first = false;
      } else {
        stream += '0 -18 Td\n';
      }
      stream += '(' + escape(lines[i]) + ') Tj\n';
    }
    stream += 'ET\n';

    const streamBytes = stream;
    const objects = [];
    objects.push('<< /Type /Catalog /Pages 2 0 R >>');
    objects.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    objects.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>');
    objects.push('<< /Length ' + streamBytes.length + ' >>\nstream\n' + streamBytes + 'endstream');
    objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
    objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

    let pdf = '%PDF-1.4\n';
    const offsets = [];
    objects.forEach((obj, i) => {
      offsets.push(pdf.length);
      pdf += (i + 1) + ' 0 obj\n' + obj + '\nendobj\n';
    });
    const xrefStart = pdf.length;
    pdf += 'xref\n0 ' + (objects.length + 1) + '\n';
    pdf += '0000000000 65535 f \n';
    offsets.forEach(off => {
      pdf += String(off).padStart(10, '0') + ' 00000 n \n';
    });
    pdf += 'trailer\n<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefStart + '\n%%EOF';

    // Encode as Latin-1 so byte counts (Length) stay correct.
    const bytes = new Uint8Array(pdf.length);
    for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
    return new Blob([bytes], { type: 'application/pdf' });
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  if (form) {
    // Clear errors as the user types
    $$('input, textarea', form).forEach(input => {
      input.addEventListener('input', () => setError(input.name, ''));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        firstName: $('#firstName', form).value,
        lastName:  $('#lastName', form).value,
        email:     $('#email', form).value,
        phone:     $('#phone', form).value,
        company:   $('#company', form).value,
        url:       $('#url', form).value,
        note:      $('#note', form).value,
        consent:   $('#consent', form).checked,
      };

      // clear previous errors
      ['firstName','lastName','email','phone','company','url'].forEach(n => setError(n, ''));

      const errors = validate(data);
      if (Object.keys(errors).length) {
        Object.entries(errors).forEach(([k, v]) => setError(k, v));
        // focus first error
        const firstKey = Object.keys(errors)[0];
        const firstEl = form.querySelector(`[name="${firstKey}"]`) || $('#consent', form);
        firstEl?.focus();
        showToast('Almost there', 'Please fix the highlighted fields.');
        return;
      }

      // Pretend network delay for UX polish
      const submitBtn = form.querySelector('[type="submit"]');
      const label = submitBtn.querySelector('.btn__label');
      submitBtn.disabled = true;
      label.classList.add('is-sending');
      label.textContent = 'Preparing your eBook';

      setTimeout(() => {
        try {
          const blob = buildSamplePdf(`${data.firstName} ${data.lastName}`.trim());
          downloadBlob(blob, 'IT-Niche-Free-eBook.pdf');
          showToast('Your eBook is on the way', 'Check your downloads — and your inbox.');
          form.reset();
        } catch (err) {
          console.error(err);
          showToast('Hmm, something broke', 'Please try again in a moment.');
        } finally {
          submitBtn.disabled = false;
          label.classList.remove('is-sending');
          label.textContent = 'Download the eBook';
        }
      }, 700);
    });
  }
})();
