# RestaurantWebBuilder — Landing Page Redesign

## Problem Statement
Redesign the old features page (https://restaurantwebbuilder.com/features.php) into a modern, minimal,
infographic-style landing page. Pure HTML/CSS/vanilla JS only, in `/app/landing`.
User choices: pull EXACT content from source URL, keep brand "RestaurantWebBuilder", NO extra sections,
DARK theme. Brand: #e57119 (primary), #000000 (secondary). Font: Lato. No images, no humans — icons/line art only.

## Architecture
- Static site: `index.html`, `styles.css`, `script.js` in `/app/landing` (source of truth).
- Mirrored to `/app/frontend/public/landing/` for live preview at `{REACT_APP_BACKEND_URL}/landing/index.html`.
- Motion via CDN (all vanilla JS): Lenis (smooth momentum scroll) + GSAP/ScrollTrigger (optional parallax).
- Entrance animations = CSS keyframes; scroll reveals = IntersectionObserver (robust; content visible if JS/CDN fails via `.js` gating).

## Sections (per user: Hero, Features, CTA only + slim footer)
- Hero: kinetic masked line-by-line title reveal, eyebrow, lede, dual CTA, 3 animated stat counters, grid + parallax glow.
- Editorial marquee band (feature keywords).
- Features: 19 features from source, grouped into 5 infographic categories (Ordering, Bookings, Design, Marketing, Community) with numbered cards + SVG line icons + spotlight hover.
- CTA: e-book email capture form (client-side validation + success msg), alt buttons.
- Footer: brand, tagline, copyright.

## Implemented (2025)
- Full redesign complete and verified end-to-end via screenshots + form test on live preview URL.
- Dark premium UI, #e57119/#000 palette, Lato, custom cursor, scroll progress, grain overlay.
- Mobile-first responsive (grid collapses 4→3→2→1), reduced-motion support, semantic + aria + SEO/OG meta.

## Notes
- Stat count-up animation appears frozen in headless screenshots (rAF throttling) but works in real browsers.

## Backlog (P1/P2)
- P1: Mobile hamburger menu for nav links (currently hidden on <768px).
- P2: Wire CTA form to a real backend/email service.
- P2: Add subtle SVG line illustrations to hero negative space.
