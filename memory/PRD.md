# IT Niche — Lunch & Learn Landing Page

## Problem Statement
Redesign http://itniche.com/lunch-learn.php into a modern, minimal, infographic-style landing page using only HTML, CSS, and vanilla JavaScript.

## User Choices
- Output folder: /app/Landing/
- Content: Fetched from real page, redesigned
- Sections: Minimal — Hero, Services, Stats, CTA
- Contact info: placeholders

## Brand
- Primary: #e57119  |  Secondary: #000000
- Type: Lato (Google Fonts)
- Style: minimal, professional, plenty of whitespace, line-style icons, no humans/photos

## What's Implemented (2025)
- /app/Landing/index.html — semantic structure, SEO meta, data-testids
- /app/Landing/styles.css — design system w/ CSS variables, responsive (mobile-first), a11y focus rings, reduced-motion support
- /app/Landing/script.js — mobile nav, reveal-on-scroll (IntersectionObserver), animated count-up stats, form validation + toast
- Sections: Sticky nav, Hero w/ custom SVG infographic (rotating rings + 4 service nodes orbiting a center plate), Trust strip, Services (3 cards, featured dark variant), How-it-works timeline (4 steps), Stats (4 animated counters), CTA + Reservation form, Footer
- All icons are inline SVG line-art (no humans, no photos)

## Backlog (P1)
- Wire form submission to real endpoint (currently simulated)
- Add testimonial logos
- Per-section schema.org JSON-LD for SEO

## Next Tasks
- User to provide real contact details / form endpoint
