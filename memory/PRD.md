# PRD — IT Niche "What is a Good Website" Landing Page

## Original Problem Statement
Redesign https://www.itniche.com/what-is-good-website.php into a modern, professional, minimal, infographic-style landing page using only HTML, CSS and Vanilla JavaScript. No human/photo imagery — icons, illustrations and infographic visuals only. Brand colors `#e57119` primary, `#000000` secondary. Typography: Lato.

## Tech stack
- Static site: `/app/Landing/index.html`, `styles.css`, `script.js`
- No build tools. No frameworks. No backend.
- Lato (300/400/700/900) via Google Fonts.

## What's been implemented (2025-12)
- Sticky glass header with brand, anchor nav, Contact CTA (mailto: helpdesk@itniche.com)
- Hero: tagline, eyebrow, dual CTAs, 3 stats, infographic SVG (browser mock with perf score, speed gauge, timeline, mobile/SEO tiles, "Live · Healthy" floating tag)
- Trust strip: Web Design / Custom Software / Digital Marketing tags
- Section 01 — Load Time: animated speed gauge (SVG arc + needle, animates to 2.4s/48%), bounce-rate bar chart (animated on scroll), mobile-first & SEO tiles
- Section 02 — UX: side-by-side comparison cards (bad site vs great site) with infographic SVGs and check/x lists
- Section 03 — How to Improve (dark): 3-step roadmap with icon, number, description, dotted connector
- Section 04 — Trust/Final Thoughts: copy + bullets + 4 stat cards (animated counters: 3.2× leads, −46% bounce, 2.4s load, 99.9% uptime)
- CTA section: large mailto: + tel: buttons
- Dark footer with brand, contact, offices, explore links, copyright
- Vanilla JS: reveal-on-scroll (IntersectionObserver), animated counters, animated SVG gauge, bar-chart trigger, smooth-scroll with header offset, prefers-reduced-motion support
- Accessibility: semantic HTML5, aria-labels on visuals, `prefers-reduced-motion` respected
- Mobile-first responsive (verified at 390px and 1440px)
- `data-testid` on all interactive/important elements
- A copy also placed at `/app/frontend/public/Landing/` for live preview via the existing frontend server

## Backlog / Next ideas (P1/P2)
- Add a lightweight in-page contact form section (still no backend — opens mail draft)
- Lottie/SVG micro-animations for step icons
- Light/dark theme toggle
- Replace mailto with in-app form when a backend is added
