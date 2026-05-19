/* ===================================================================
   itniche.com — Shared JavaScript
   - Theme toggle (light/dark with localStorage)
   - Mobile nav
   - Scroll reveal (IntersectionObserver)
   - FAQ accordion
   - Pill filters
   =================================================================== */

(function () {
  'use strict';

  // ---------- Theme Toggle ----------
  const THEME_KEY = 'itniche-theme';
  const root = document.body;

  function applyTheme(theme) {
    if (theme === 'dark') root.classList.add('dark-theme');
    else root.classList.remove('dark-theme');
  }

  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('[data-testid="theme-toggle"]');
    if (!toggle) return;
    const isDark = root.classList.toggle('dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  });

  // ---------- Mobile nav ----------
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-testid="mobile-menu-toggle"]');
    if (btn) {
      const links = document.querySelector('.nav-links');
      btn.classList.toggle('open');
      if (links) links.classList.toggle('open');
      return;
    }
    // Close on link click (mobile)
    if (e.target.closest('.nav-links a')) {
      const links = document.querySelector('.nav-links');
      const mob = document.querySelector('[data-testid="mobile-menu-toggle"]');
      if (links && links.classList.contains('open')) {
        links.classList.remove('open');
        mob && mob.classList.remove('open');
      }
    }
  });

  // ---------- Scroll Reveal ----------
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || items.length === 0) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('in'), Number(delay));
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => io.observe(el));
  }

  // ---------- FAQ Accordion ----------
  document.addEventListener('click', function (e) {
    const q = e.target.closest('.faq-question');
    if (!q) return;
    const item = q.parentElement;
    const ans = item.querySelector('.faq-answer');
    const open = item.classList.toggle('open');
    if (open) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
      q.setAttribute('aria-expanded', 'true');
    } else {
      ans.style.maxHeight = '0px';
      q.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- Pill filters (FAQ categories) ----------
  document.addEventListener('click', function (e) {
    const pill = e.target.closest('[data-filter]');
    if (!pill) return;
    const group = pill.closest('.pills');
    if (!group) return;
    group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const target = pill.dataset.filter;
    const items = document.querySelectorAll('[data-cat]');
    items.forEach(item => {
      if (target === 'all' || item.dataset.cat === target) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // ---------- Active nav link ----------
  function highlightActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  // ---------- Year in footer ----------
  function setYear() {
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    highlightActiveNav();
    setYear();
  });

})();
