# PRD — IT Niche Franchise & Partnership Landing Page

## Problem Statement
Redesign the old "Franchise Opportunity" page (restaurantwebbuilder.com/franchise-opportunity.php)
into a modern, minimal, infographic-style landing page. Reduce text, improve scanning, focus on
trust/clarity/conversion. Built with ONLY HTML, CSS, vanilla JS in /app/landing.

## User Choices
- Theme: Dark with orange accents (#e57119 primary, #000000 secondary)
- Typography: Lato, sans-serif
- Interactivity: none (static; only form submit + sticky header state in JS)
- CTAs: "Get Started" / contact buttons scroll to on-page appointment form (visual only, no backend)
- Content: keep original core messaging (Franchise, IBO, Reseller/Partnership, Referral)
- Constraints: no humans, no images — icons + SVG line illustrations only

## Architecture
- Static site: /app/landing/index.html, styles.css, script.js
- Font Awesome (CDN) icons + inline SVG infographics; Google Fonts (Lato)
- No backend / no MongoDB — pure front-end landing page

## Sections Implemented (Dec 2025)
1. Sticky glass header + nav
2. Hero — big headline, orbit infographic, CTAs, highlight chips, marquee
3. Stats strip ($0 / 360° / 2 hubs / 100%)
4. Franchise Opportunity — 4 feature cards
5. The Path — 4 numbered manifesto chapters (Connect/Train/Launch/Earn)
6. Programs — IBO, Partnership/Reseller (featured), Referral cards with check-lists
7. Referral spotlight — quote + reward pills + flow diagram
8. CTA/Contact — appointment form (client-side success), contact info
9. Footer

## Non-functional
- Mobile-first responsive (breakpoints 980px, 640px)
- Accessible: aria labels, form labels, prefers-reduced-motion support
- SEO: title, meta description, OpenGraph, semantic headings
- data-testid attributes on interactive/critical elements

## Verified
- Visual verification of all sections (desktop) via screenshots
- Contact form submit → success message shows, form resets; hidden by default
- No console errors; JS lint clean

## Backlog / Next
- P1: Wire contact form to a real backend/email (Resend) for lead capture
- P2: Light/dark toggle; add downloadable program brochure (PDF)
- P2: Testimonials / partner logos band for social proof
