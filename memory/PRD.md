# RestaurantWebBuilder — Lead Generation Landing Page

## Problem Statement
Redesign the old page https://restaurantwebbuilder.com/lead-generations-processes.php into a modern,
minimal, infographic-style landing page. Reduce text-heavy blocks into cards/stats/timelines/icons.
Focus on trust, clarity, conversion. Target: small business, web design, custom solutions, digital marketing.

## Hard Constraints (from user)
- ONLY vanilla HTML, CSS, JavaScript. Files: index.html, styles.css, script.js in `/app/landing/`.
- Brand: #e57119 (primary orange), #000000 (secondary). Typography: Lato.
- NO images, NO humans. Icons + SVG line-art + infographics only.
- Light theme, orange accents. CTAs are VISUAL/STATIC only (no functional forms).
- Brand name: RestaurantWebBuilder.
- Mobile-first, fast, accessible, SEO-friendly.

## Architecture
- Static site. Deliverable: `/app/landing/{index.html,styles.css,script.js}`.
- Previewed by copying into `/app/frontend/public/landing/` -> served at
  `${REACT_APP_BACKEND_URL}/landing/index.html`.
- Motion: Lenis (vanilla CDN, async) for momentum scroll; IntersectionObserver reveals; rAF counters;
  masked line-by-line kinetic hero reveal; parallax orbs; magnetic buttons; custom cursor; marquee.
- Progressive enhancement: content visible by default; animations gated behind `html.js` class so page
  works fully with JS disabled / reduced-motion (accessibility + reliability).

## Sections Implemented (2025)
- Sticky nav (glass on scroll) + scroll progress bar + mobile hamburger
- Hero: eyebrow, H1 "Is your business in the spotlight?", subtitle, 2 CTAs, funnel infographic card
- Stats strip: 4 animated counters (2.4x lead lift, 87% qualification, 6+ channels, 24h response)
- Editorial marquee (dark)
- 01 Overview: lead + 3 mini cards (research / tech / sales-qualified)
- 02 Process: 7-step numbered timeline
- 03 Goals & Strategy: 3 goal cards
- 04 Channels: 6 technique chips + note
- 05 ROI: dark section with animated bar chart + "+312%" badge
- CTA: "Ready to put your business in the spotlight?" + Contact form / Refer & earn buttons
- Footer

## Status
- v1 COMPLETE. testing_agent iteration_1: frontend 100%, no console errors, mobile responsive OK.

## Backlog / Next
- P1: Working contact form (backend capture) if user wants lead capture
- P2: Dark-mode variant; more line-art SVG illustrations per section
- P2: SEO meta/OG image, sitemap, JSON-LD LocalBusiness schema
