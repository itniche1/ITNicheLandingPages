# itniche.com — Modern Static Redesign

## Problem Statement
Redesign 12 itniche.com landing pages into a modern, conversion-focused static site with bold orange (#e57119) accents, Lato typography, dark mode, scroll animations, and SVG-only illustrations. Tech: HTML5 + CSS3 + Vanilla JS only. One HTML file per page, shared header/footer pattern, CSS custom properties.

## Architecture
- Location: `/app/frontend/public/itniche/` (served by React dev server at `/itniche/...`)
- Shared assets:
  - `assets/css/styles.css` — design tokens, light + dark themes, all components
  - `assets/js/main.js` — theme toggle, mobile nav, IntersectionObserver scroll reveal, FAQ accordion, FAQ category filter, footer year, active nav highlighting
- 12 standalone HTML pages with duplicated header/footer (intentional for a static, JS-free layout)

## Pages Implemented (2025-12)
1. `index.html` — Home / Profile (hero, stats, services bento, marquee, testimonial, CTA)
2. `internet-marketing.html` — Channels grid + process timeline
3. `good-website.html` — Anatomy of a good website + 7-point checklist
4. `products-portals.html` — E-commerce / portals / inventory split sections + tech stack
5. `lunch-and-learn.html` — Upcoming sessions cards, registration form, archive
6. `website-cost.html` — 3-tier pricing, budget breakdown donut, pricing FAQ
7. `services.html` — Service grid + 4-step approach timeline
8. `careers.html` — Culture cards, open roles, application form
9. `contact.html` — Split form + contact info + abstract map SVG
10. `seo-report.html` — Audit landing with capture form + value props
11. `faqs.html` — Category filter pills + accordion
12. `free-consultation.html` — Calendar slot mockup + extensive booking form

## Design System
- Colors: `--color-primary` `#e57119`, `--color-text-main` `#000` (light) / `#fff` (dark), `--color-bg` `#fff` / `#0a0a0a`
- Typography: Lato 300/400/700/900 from Google Fonts; clamp() fluid scale
- Spacing: 8pt-based, CSS custom properties
- Components: buttons, cards, bento grids, timeline, pricing cards, FAQ accordion, forms (bottom-border style), pills, marquee, donut chart, testimonial
- Micro-interactions: IntersectionObserver scroll reveal (opacity + translateY), hover lift on cards/buttons, icon scale on hover
- Dark mode: persisted in localStorage, respects `prefers-color-scheme`
- Accessibility: focus outlines, semantic HTML, alt text, ARIA labels, reduced-motion fallback

## Status
✅ All 12 pages live and rendering correctly
✅ Dark mode toggle verified
✅ Mobile-responsive (breakpoints at 880px, 720px, 600px, 520px)
✅ Forms are static UI (display-only, prevent default + visual confirmation on submit)

## Next Action Items (Backlog)
- P1: Wire forms to a real backend (FastAPI endpoint + email service like Resend/SendGrid)
- P2: Real Google reCAPTCHA on lead-gen forms
- P2: Hook Calendly/Cal.com into the free-consultation slot picker
- P3: Add blog/case-study templates
- P3: Add Open Graph / Twitter Card meta tags per page
- P3: Add sitemap.xml & robots.txt
