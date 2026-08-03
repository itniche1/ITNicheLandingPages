# Restaurant Web Builder — Internet Marketing Landing Page

## Problem Statement
Redesign the old page https://restaurantwebbuilder.com/internet-marketing-solutions.php into a modern, minimal, infographic-style landing page. Static build: HTML + CSS + vanilla JS only, in a `/landing` folder. No human, no photos — icons/line-art only.

## User Choices
- Static site (HTML/CSS/vanilla JS only)
- Brand: Restaurant Web Builder | Light theme, orange #e57119 + black #000000
- Typography: Lato (+ IBM Plex Mono for infographic micro-labels)
- Must include: Internet Marketing Solutions, "A Good Website should be", Off-Page Optimization
- Award-worthy motion: masked hero line reveal, scroll reveals, smooth scroll (Lenis), parallax, custom cursor, count-up stats, marquee

## Architecture
- `/app/landing/index.html`, `styles.css`, `script.js` (the deliverable)
- Mirrored to `/app/frontend/public/landing/` so it's previewable at `{BASE_URL}/landing/index.html`
- Pure static; no backend/DB. Lenis loaded via CDN (framework-agnostic vanilla).

## Sections Implemented (2026-08-03)
- Sticky header + mobile hamburger menu
- Hero: kinetic masked line reveal, parallax line-art, stat chips, dual CTA
- Marquee (SEO / SMM / On-Page / Off-Page / Responsive / W3C)
- Foundation: "A good website should be…" 4 infographic cards
- Solutions: numbered chapters — On-Page SEO, Off-Page Optimization, Social Media Marketing (line-art viz + tag pills)
- Stats band (dark) with count-up
- Process: 4-step numbered timeline
- CTA: static contact form (name+email, success message, no backend) + phone/email
- Footer: brand, 3 link columns, contact, address
- SEO: meta/OG tags + LocalBusiness JSON-LD; a11y: semantic HTML, focus states, prefers-reduced-motion; responsive 980/560 breakpoints

## Notes
- Contact form is STATIC (shows success message only; no email is sent).
- Reveal/count-up freeze in headless screenshots (idle rAF/timer throttling) but work in real browsers; a 2.2s safety-net also guarantees content reveals.

## Backlog / Next
- P1: Wire contact form to email (Resend) or a backend lead store
- P1: Testimonials / client logos strip for trust
- P2: Blog/case-study section, per-service detail pages
