# IT Niche — "Let's Work Together" Landing Page

## Problem Statement
Redesign the existing page at https://www.itniche.com/let-us-work-together.php into a modern, professional, minimal, infographic-style landing page using only HTML, CSS, and Vanilla JS. No backend, no images of humans — line-style SVG illustrations only. Brand: #e57119 (primary), #000000 (secondary). Typography: Lato.

## Deliverables
- `/app/Landing/index.html`
- `/app/Landing/styles.css`
- `/app/Landing/script.js`

## What's Implemented (2025-12)
- Sticky glass nav with logo, anchor links, phone CTA, mobile hamburger
- Hero: eyebrow, headline with mixed weights/outline italic accent, lede, dual CTAs (Call + See process), service pills, animated SVG infographic (orbital nodes Design/Build/Market/Support around a central IT Niche core)
- Stats strip (4 metrics) with intersection-observer count-up animation
- "Go online with IT Niche" — 3-card approach (Listen / Plan Together / Execute), middle card in solid black for rhythm
- 7-step process timeline as a responsive 3-col grid with big outlined step numbers, line-style icons, week-estimate pill chips; step 7 (Review) inverted to black
- "Why IT Niche" — 4-tile trust grid
- Final CTA section — dark background, orange radial glow, grid overlay, large phone CTA + secondary callback CTA + hours note
- Footer with brand, nav, copyright
- Reveal-on-scroll animations, smooth anchor scrolling with sticky-nav offset, sticky-nav scroll state, reduced-motion support
- Fully responsive: 1180 → 980 → 720 → 480 breakpoints
- Accessibility: semantic landmarks, aria-labels on nav/menus/icons, keyboard-friendly focus targets, `prefers-reduced-motion` respected
- `data-testid` on every interactive/key element

## Design System
- Colors: --primary #e57119, --ink #0a0a0a, --bg #fbfaf7 (warm off-white), --bg-2 #f6f3ec, --line #ebe6dc, --muted #5c5c5c
- Font: Lato 300/400/700/900 via Google Fonts
- Radii: 10 / 18 / 28; pill buttons (999px)
- Shadows: soft layered, used sparingly

## Notes
- Phone number is a placeholder: `+1 (949) 555-1234` (used in three places: nav, hero, CTA, footer). Replace globally when real number is available.
- No external dependencies beyond Google Fonts CDN — page is fully static and fast-loading.
- No backend, no MongoDB, no React used (per requirements).

## Backlog / Next Action Items
- P1: Swap placeholder phone with the real IT Niche number, add WhatsApp/email if desired
- P2: Hook the "Schedule a callback" button to a real form or Calendly link
- P2: Add a testimonials / logo strip section if social proof assets become available
- P2: Add Open Graph + Twitter meta tags + favicon for SEO/share
- P3: Add page-load skeleton or hero entrance staggered animation
