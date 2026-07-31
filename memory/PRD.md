# RestaurantWebBuilder — Landing Page PRD

## Original Problem Statement
Redesign the old page at https://restaurantwebbuilder.com/feedback.php into a modern, minimal, infographic-style landing page. Reduce text, use cards/icons/stats/timelines/infographics, focus on trust + conversion. Minimal elegant corporate aesthetic, whitespace, subtle gradients, high-quality line icons/illustrations, NO humans/images. Target: small business web design, custom solutions & digital marketing. Brand: #e57119 (primary), #000000 (secondary). Typography: Lato. Mobile-first, fast, accessible, SEO-friendly. Build with ONLY HTML, CSS, vanilla JS in a `landing` folder (index.html, styles.css, script.js).

## User Choices
- Light theme with orange accents
- Front-end-only demo contact form (no backend)
- Company name: RestaurantWebBuilder

## Architecture
- Pure static site (no React/FastAPI/Mongo). Canonical files: `/app/landing/{index.html,styles.css,script.js}`.
- Live preview copy served by CRA dev server at `/app/frontend/public/landing/` → URL `.../landing/index.html`.
- Vanilla JS: IntersectionObserver scroll reveals, animated counters, sticky-header + scroll-progress + parallax, mobile menu, anchor smooth-scroll, contact form validation + demo success.
- Design: Lato (display 900) + Space Mono (labels/kickers). Palette: paper #fbf8f3, ink #0a0a0a, orange #e57119. CSS-driven hero masked line-by-line reveal + marker underline.

## Sections Implemented (2025-12)
- Kinetic hero with masked line reveal + orange marker + floating line-art infographics + scroll cue
- Editorial marquee (services keywords)
- Services (4 line-icon cards)
- Stats infographic (animated counters, dark band)
- Process timeline (4 numbered chapters)
- Features bento grid (reservations/menus/speed/support)
- Dark CTA band
- Contact: info list (901-414-9009, Memphis TN) + validated demo form (name/email/business/service/message)
- Footer (brand + link columns)
- Accessibility (skip link, aria, semantic), SEO (meta, OG, JSON-LD ProfessionalService), mobile-first responsive.

## Status
- Verified by testing agent (iteration_1): 100% frontend pass, no issues.
- NOTE: Contact form is FRONT-END-ONLY DEMO (no submission is stored/sent).

## Backlog / Next
- P1: Wire contact form to real email/lead capture (Resend + backend) if going live.
- P2: Add pricing/packages section; testimonials/logos band.
- P2: Add favicon/OG image asset.
