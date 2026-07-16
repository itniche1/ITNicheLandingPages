/* =========================================================
   TERMS OF USE — Award-Grade Motion Layer
   Lenis (smooth scroll) + GSAP + ScrollTrigger + micro FX
   ========================================================= */

(function () {
  'use strict';

  // -------- Register GSAP plugins --------
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // -------- Year --------
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ================= Preloader =================
  const preloader = document.getElementById('preloader');
  const preloaderCount = document.getElementById('preloaderCount');
  let count = 0;
  const preloadInterval = setInterval(() => {
    count += Math.floor(Math.random() * 9) + 4;
    if (count >= 100) {
      count = 100;
      clearInterval(preloadInterval);
      setTimeout(hidePreloader, 350);
    }
    if (preloaderCount) preloaderCount.textContent = String(count).padStart(2, '0');
  }, 90);

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('done');
    setTimeout(() => {
      preloader.style.display = 'none';
      startHeroReveal();
    }, 900);
  }

  // ================= Lenis smooth scroll =================
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with ScrollTrigger
    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Anchor click smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          lenis.scrollTo(id, { offset: -60, duration: 1.4 });
        }
      });
    });
  }

  // ================= Cursor Dot =================
  const cursor = document.getElementById('cursor');
  if (cursor && matchMedia('(hover:hover)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
    });
    (function loop() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, summary, .btn').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '28px';
        cursor.style.height = '28px';
        cursor.style.background = '#000';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.background = '#e57119';
      });
    });
  }

  // ================= Nav scrolled state =================
  const nav = document.querySelector('.nav');
  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ================= Scroll progress =================
  const progress = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ================= Hero reveal =================
  function startHeroReveal() {
    if (!window.gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero .line', {
      y: '0%',
      duration: 1.1,
      stagger: 0.12,
    })
      .from('.hero-meta .overline', { opacity: 0, y: 12, stagger: 0.1, duration: .6 }, '-=0.9')
      .from('.hero-foot', { opacity: 0, y: 20, duration: .8 }, '-=0.6')
      .from('.hero-stats .stat', { opacity: 0, y: 20, stagger: .08, duration: .7 }, '-=0.6')
      .from('.hero-svg', { opacity: 0, scale: .95, duration: 1.4, ease: 'power2.out' }, '-=1.4');

    // Parallax on hero SVG
    gsap.to('.hero-svg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Count-up animation (IntersectionObserver — reliable regardless of Lenis)
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count, 10);
          if (!isNaN(target)) animateCount(entry.target, target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

    // Section reveals
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });

    // CTA scale-in
    gsap.fromTo('.cta',
      { scale: 0.96, transformOrigin: 'center center' },
      {
        scale: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta',
          start: 'top 85%',
          end: 'top 40%',
          scrub: true,
        },
      });

    // Bars in-view
    ScrollTrigger.batch('.chapter-visual--bars', {
      start: 'top 85%',
      onEnter: (batch) => {
        batch.forEach((el) => {
          el.querySelectorAll('.bar').forEach((b) => b.classList.add('in-view'));
        });
      },
      once: true,
    });

    // Donut arc in-view
    ScrollTrigger.batch('.chapter-visual--donut', {
      start: 'top 85%',
      onEnter: (batch) => batch.forEach((el) => el.classList.add('in-view')),
      once: true,
    });

    // Chapter number entrance
    gsap.utils.toArray('.chapter-num').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Chapter body slight lift
    gsap.utils.toArray('.chapter-body').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // CTA masked title
    gsap.to('.cta .line', {
      y: '0%',
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.cta-title',
        start: 'top 80%',
        once: true,
      },
    });

    ScrollTrigger.refresh();
  }

  // Fallback if GSAP fails to load
  if (!window.gsap) {
    document.querySelectorAll('.line').forEach((l) => (l.style.transform = 'translateY(0)'));
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('reveal-in'));
  }

  // ================= Count up helper =================
  function animateCount(el, target) {
    const dur = 1400;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const v = Math.round(target * ease(p));
      // preserve leading zero for 08
      const padded = target < 10 && String(el.dataset.count).length === 2 ? String(v).padStart(2, '0') : String(v);
      el.textContent = padded;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ================= Disclosure smooth open =================
  document.querySelectorAll('.disclosure').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  // Safety: hide preloader after max 3s (in case JS is slow)
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('done')) {
      hidePreloader();
    }
  }, 3200);

})();
