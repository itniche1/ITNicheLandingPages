# ChurchCraft Landing Page — PRD

## Problem Statement
Redesign the legacy CustomChurchWebsite.com /features.php page into a modern, professional, minimal, infographic-style landing page. Reduce text-heavy sections into concise headlines, icons, stats, timelines, and visual storytelling.

## User Choices (provided)
- Tech: Pure HTML / CSS / Vanilla JS in a single folder
- E-Book form: static (no validation, no backend)
- Brand name to display in header (default chosen: **ChurchCraft**)
- Extra sections beyond Hero/Features/E-Book/CTA: yes (Stats, Process Timeline, Services Bento, FAQ, Footer)

## Brand Personality
- Primary color: `#e57119` (orange)
- Secondary color: `#000000` (black)
- Typography: Lato (300/400/700/900)

## Deliverable
A single folder at `/app/site/`:
- `index.html` — full landing page (semantic HTML, accessible, SEO-friendly)
- `styles.css`  — mobile-first responsive CSS
- `script.js`   — reveal-on-scroll, count-up stats, mobile nav, static form thanks state

## Sections Implemented
1. Sticky glass nav (logo, links, CTA)
2. Hero — bold typography + infographic hub-and-spoke (6 floating module nodes, orbits, dashed connectors) + mini stats + trust strip
3. Features — 12 SVG-iconed cards, "Online Giving" highlighted in dark with badge
4. Stats — dark section, animated count-up (92% / 3× / $48k / 24/7)
5. Process Timeline — 4 numbered steps with dashed connector line
6. Services Bento — 4-cell bento layout with tags
7. Free e-Book — 3D book mock-up + form (Name + Email) + animated thank-you state
8. FAQ — accessible `<details>` accordion
9. Final CTA — dark rounded card with pattern + trust badges
10. Footer — 4-column grid with brand, product, company, legal

## Tech & Quality Highlights
- Mobile-first responsive (4 breakpoints: 1024 / 820 / 720 / 480)
- Accessibility: semantic landmarks, ARIA labels, focus rings, reduced-motion media query, native `<details>`
- SEO: descriptive meta, semantic headings, single H1
- Performance: only one external resource (Google Fonts), no JS frameworks, all icons inline SVG
- Smooth scroll, IntersectionObserver-driven reveal & active-nav, count-up animation
- `data-testid` on every interactive / critical element

## Preview
The static frontend supervisor process was stopped (the React/craco template was broken with a pre-existing `onAfterSetupMiddleware` webpack-dev-server mismatch). A simple `python3 -m http.server 3000` was started against `/app/site/` so the preview URL serves the landing page directly:
- https://minimal-landing-29.preview.emergentagent.com/index.html

## Status — Implemented (2026-06-22)
- All sections built and verified visually via screenshot tool (desktop + form submission flow)
- E-Book form static-submission tested: "Check your inbox" thank-you state confirmed

## Next Action Items / Backlog
- P1: Wire form to a real backend (Resend / Mailchimp / Mongo) so the e-Book actually delivers
- P1: Add real testimonials / case studies section for social proof
- P2: Replace placeholder e-Book cover with the real PDF download asset
- P2: Add /pricing page + plan comparison
- P2: Add cookie banner & analytics (Plausible / GA)
- P2: Fix the underlying React/craco supervisor so the React template can run again (currently bypassed by python http.server)
