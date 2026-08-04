# PRD — Ongoing Enhancements & Support Landing Page

## Problem Statement
Redesign the old page https://restaurantwebbuilder.com/ongoing-enhancements-support.php into a modern, minimal, infographic-style landing page. Stack constraint: **only HTML, CSS, vanilla JS** in `/app/landing` (index.html, styles.css, script.js).

## User Choices
- Theme: **Dark** (near-black + #e57119 orange accent, #000 secondary)
- Copy: adapted directly from the existing page
- CTA: "Request a Call Back" (client-side contact form)
- Typography: **Lato** (Google Fonts)
- No humans/photos — SVG line icons & infographic visuals only

## Architecture
- Pure static site. No backend / DB / integrations.
- Lenis (CDN) for smooth momentum scroll; native IntersectionObserver for scroll reveals + stat count-ups; CSS keyframes for orbit/marquee; vanilla JS mobile menu, progress bar, form validation.

## Sections Implemented (Dec 2025)
1. Fixed nav (scrolled glass state, mobile menu, progress bar)
2. Kinetic hero — masked line-by-line on-load reveal, animated orbit infographic, parallax
3. Editorial marquee (Web Design / Custom Solutions / Digital Marketing / SEO / Support)
4. Animated stat counters (uptime, response, projects, years)
5. Enhancements — numbered manifesto chapters 01–04
6. "The support is important" — bold statement + 4 line-icon pillars
7. Process timeline (Audit → Enhance → Assure → Support)
8. Our Niche — 3 cards
9. CTA — Request a Call Back form (client-side validation + success message)
10. Footer

## Accessibility / Perf / SEO
- Mobile-first responsive, prefers-reduced-motion support, focus-visible styles, semantic headings, meta/OG tags, aria-live form status, data-testid on interactive elements.

## Backlog (P1/P2)
- Wire the contact form to a real backend/email (currently client-side only)
- Optional light-mode toggle
- Blog/case-study section
