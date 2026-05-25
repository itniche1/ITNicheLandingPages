/* ============================================
   IT Niche — Landing Page Script
   Vanilla JS · no dependencies
   ============================================ */

(function () {
  'use strict';

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Mobile nav toggle -----
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('is-open'))
    );
  }

  // ----- Animated counters -----
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => counterObs.observe(c));

  // ----- Portfolio data (infographic cards — no images) -----
  const PROJECTS = {
    custom: [
      {
        title: 'Ella Bebe Angels',
        tag: 'Brand Site',
        desc: 'Custom boutique brand storefront with elegant identity & catalog.',
        meta: ['HTML/CSS', 'Catalog', 'SEO'],
        visual: 'brand'
      },
      {
        title: 'Blessing',
        tag: 'Non-Profit',
        desc: 'A heartfelt non-profit website with donation flow and clarity-first design.',
        meta: ['Donations', 'CMS', 'A11y'],
        visual: 'heart'
      },
      {
        title: 'Angels',
        tag: 'Community',
        desc: 'Community engagement portal with event listings and member zone.',
        meta: ['Events', 'Members', 'Forms'],
        visual: 'people'
      },
      {
        title: 'Astor',
        tag: 'Corporate',
        desc: 'Modern corporate website with services, portfolio, and conversion CTAs.',
        meta: ['Corporate', 'Forms', 'Analytics'],
        visual: 'building'
      },
      {
        title: 'I Am Real Hungry',
        tag: 'Food &amp; Bev',
        desc: 'Bold food brand site with menu showcase and order CTA.',
        meta: ['Menu', 'Brand', 'CTA'],
        visual: 'fork'
      },
      {
        title: 'WHOW',
        tag: 'Lifestyle',
        desc: 'Vibrant lifestyle product site with gallery and storytelling.',
        meta: ['Gallery', 'Story', 'CMS'],
        visual: 'sparkle'
      }
    ],
    church: [
      {
        title: 'e-Church Connect',
        tag: 'Portal',
        desc: 'All-in-one church management with sermons, events & online giving.',
        meta: ['Sermons', 'Giving', 'Events'],
        visual: 'church'
      },
      {
        title: 'Faith Hub',
        tag: 'Community',
        desc: 'Member directory, prayer board and live-stream integration.',
        meta: ['Members', 'Stream', 'Prayer'],
        visual: 'heart'
      },
      {
        title: 'Sunday Suite',
        tag: 'CMS',
        desc: 'Weekly bulletins, calendar and ministry resources — one click away.',
        meta: ['Bulletin', 'Calendar', 'Docs'],
        visual: 'people'
      }
    ],
    restaurant: [
      {
        title: 'e-Restaurant Pro',
        tag: 'Ordering',
        desc: 'Menu, online ordering, table booking and POS-ready integrations.',
        meta: ['Menu', 'Orders', 'Booking'],
        visual: 'fork'
      },
      {
        title: 'Bistro Cloud',
        tag: 'Multi-Location',
        desc: 'Centralized brand site with location switcher and loyalty.',
        meta: ['Locations', 'Loyalty', 'SEO'],
        visual: 'building'
      },
      {
        title: 'TableFlow',
        tag: 'Reservations',
        desc: 'Real-time reservations, waitlists and customer notifications.',
        meta: ['Reserve', 'Waitlist', 'SMS'],
        visual: 'sparkle'
      }
    ],
    realtor: [
      {
        title: 'e-Realtor Suite',
        tag: 'Listings',
        desc: 'Property listings with search, filters and lead capture.',
        meta: ['Search', 'Leads', 'Maps'],
        visual: 'building'
      },
      {
        title: 'AgentDesk',
        tag: 'Agents',
        desc: 'Agent profiles, listings dashboard and inquiry routing.',
        meta: ['Profiles', 'CRM', 'Inquiry'],
        visual: 'people'
      },
      {
        title: 'OpenHouse',
        tag: 'Events',
        desc: 'Schedule open-house events with RSVP and reminders.',
        meta: ['RSVP', 'Calendar', 'Email'],
        visual: 'sparkle'
      }
    ]
  };

  // ----- SVG icon library (line-style) -----
  const ICONS = {
    brand: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <rect x="10" y="14" width="44" height="32" rx="3"/>
      <path d="M10 24h44"/>
      <circle cx="16" cy="19" r="1.2" fill="#0a0a0a"/>
      <circle cx="20" cy="19" r="1.2" fill="#0a0a0a"/>
      <circle cx="24" cy="19" r="1.2" fill="#0a0a0a"/>
      <path d="M18 32h12M18 38h20" stroke="#e57119"/>
      <rect x="36" y="30" width="12" height="10" rx="1" stroke="#e57119"/>
    </svg>`,
    heart: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <path d="M32 52s-16-10-16-22a8 8 0 0116-3 8 8 0 0116 3c0 12-16 22-16 22z" stroke="#e57119"/>
      <path d="M10 14h12M42 14h12" />
      <path d="M16 8v12M48 8v12" />
    </svg>`,
    people: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <circle cx="22" cy="22" r="7"/>
      <circle cx="44" cy="24" r="6" stroke="#e57119"/>
      <path d="M10 48c0-7 6-12 12-12s12 5 12 12"/>
      <path d="M34 48c0-6 4-10 10-10s10 4 10 10" stroke="#e57119"/>
    </svg>`,
    building: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <rect x="12" y="10" width="26" height="44"/>
      <rect x="38" y="22" width="14" height="32" stroke="#e57119"/>
      <path d="M18 18h4M26 18h4M18 26h4M26 26h4M18 34h4M26 34h4M18 42h4M26 42h4"/>
      <path d="M43 28h4M43 36h4M43 44h4" stroke="#e57119"/>
    </svg>`,
    fork: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <path d="M20 8v18a4 4 0 008 0V8"/>
      <path d="M24 26v30"/>
      <path d="M44 8c-4 0-7 5-7 12s3 12 7 12v24" stroke="#e57119"/>
    </svg>`,
    sparkle: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <path d="M32 8l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" stroke="#e57119"/>
      <path d="M50 38l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
      <path d="M12 42l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z"/>
    </svg>`,
    church: `<svg viewBox="0 0 64 64" width="86" height="86" fill="none" stroke="#0a0a0a" stroke-width="2">
      <path d="M32 6l4 6h-2v6h6v6h-6v30H22V24h-6v-6h6v-6h-2z" stroke="#e57119"/>
      <path d="M14 30v24h12M50 30v24H38"/>
      <path d="M28 42h8v12h-8z"/>
    </svg>`
  };

  // ----- Render cards -----
  const grid = document.getElementById('cardsGrid');
  const renderCards = (key) => {
    if (!grid) return;
    const list = PROJECTS[key] || [];
    grid.innerHTML = list
      .map((p, i) => {
        const idx = String(i + 1).padStart(2, '0');
        const icon = ICONS[p.visual] || ICONS.brand;
        const meta = p.meta.map((m) => `<span>${m}</span>`).join('');
        return `
          <article class="card" data-testid="work-card-${key}-${i}">
            <div class="card__visual" aria-hidden="true">
              <span class="card__tag">${p.tag}</span>
              <span class="card__num">${idx}</span>
              ${icon}
            </div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="card__meta">${meta}</div>
          </article>
        `;
      })
      .join('');
  };

  // ----- Tabs -----
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      renderCards(tab.getAttribute('data-tab'));
    });
  });

  // Initial render
  renderCards('custom');

  // ----- CTA form -----
  const form = document.getElementById('ctaForm');
  const msg = document.getElementById('ctaMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (form.email.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#ff8d4d';
        return;
      }
      msg.textContent = 'Thanks! We will be in touch within 24 hours.';
      msg.style.color = '#9be38a';
      form.reset();
    });
  }

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll('.timeline li, .section__head, .kpi, .card');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => {
    if (el.classList.contains('card')) return; // cards have their own anim
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    revealObs.observe(el);
  });
})();
