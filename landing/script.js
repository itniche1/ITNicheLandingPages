/* =========================================================
   IT Niche — Landing Page Scripts
   Vanilla JS only. No frameworks. Progressive enhancement.
   ========================================================= */

(function () {
    'use strict';

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Mobile nav toggle ---------- */
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            nav.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                nav.classList.remove('open');
            });
        });
    }

    /* ---------- Timeline reveal on scroll ---------- */
    const tlItems = document.querySelectorAll('.tl-item');
    if (tlItems.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        tlItems.forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
            io.observe(el);
        });
    } else {
        tlItems.forEach((el) => el.classList.add('in-view'));
    }

    /* ---------- Stat counter ---------- */
    const statNums = document.querySelectorAll('.stat-num[data-count]');
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        const duration = 1400;
        const start = performance.now();

        const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(easeOut(p) * target).toString();
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target.toString();
        };
        requestAnimationFrame(step);
    };

    if (statNums.length && 'IntersectionObserver' in window) {
        const statIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        statIO.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );
        statNums.forEach((el) => statIO.observe(el));
    } else {
        statNums.forEach((el) => (el.textContent = el.getAttribute('data-count')));
    }

    /* ---------- Smooth anchor scroll with sticky nav offset ---------- */
    const navEl = document.querySelector('.nav');
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();

            const navHeight = navEl ? navEl.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    /* ---------- Active nav link highlighting ---------- */
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
        const sectionIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = '#' + entry.target.id;
                        navAnchors.forEach((a) => {
                            if (a.getAttribute('href') === id) a.style.color = 'var(--primary)';
                            else a.style.color = '';
                        });
                    }
                });
            },
            { threshold: 0.4 }
        );
        sections.forEach((s) => sectionIO.observe(s));
    }

    /* ---------- Subtle parallax on hero chips ---------- */
    const chips = document.querySelectorAll('.chip');
    if (chips.length && window.matchMedia('(hover: hover)').matches) {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                chips.forEach((chip, i) => {
                    const depth = (i + 1) * 6;
                    chip.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
                });
            });
            hero.addEventListener('mouseleave', () => {
                chips.forEach((chip) => (chip.style.transform = ''));
            });
        }
    }
})();
