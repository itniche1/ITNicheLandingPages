# Restaurant Web Builder — "Let's Work Together" Landing Page

## Problem Statement
Redesign the text-heavy page https://restaurantwebbuilder.com/let-us-work-together.php into a modern, minimal,
infographic-style landing page. Static site only: HTML, CSS, vanilla JS in `/app/landing`.
Brand: #e57119 (primary), #000000 (secondary). Font: Lato. No humans/photos — icons & line illustrations only.
Audience: small business, web design, custom solutions, digital marketing.

## User Choices
- Company: **Restaurant Web Builder**
- CTA buttons ("Get Started") scroll to the on-page CTA / top (placeholder, no external target)
- No contact details shown
- Sections requested: Hero, "Go Online with IT Niche", Process Breakdown, CTA

## Architecture
- Pure static: `/app/landing/index.html`, `styles.css`, `script.js`
- No backend / DB. Lenis (CDN) for momentum scroll; IntersectionObserver + CSS for reveals.
- Progressive enhancement: `.js` class gates reveal-hiding, so content is fully visible without JS (a11y + robustness).

## Art Direction
- Editorial black + warm ember (#e57119) + warm paper (#f6f2ea)
- Lato (900 display) + Space Grotesk for numeric/mono labels
- Kinetic hero (masked line-by-line title reveal, blueprint SVG, parallax orb, grid)
- Slow marquee, numbered timeline chapters, count-up stats, magnetic buttons, scroll progress bar

## Implemented (Dec 2025)
- Fixed nav (hero-mode → solid on scroll) + mobile slide-in menu
- Hero: staggered title reveal, stats count-up, dual CTAs
- Marquee band (Web Design / Custom Solutions / Digital Marketing / Small Business)
- "Go Online with IT Niche": 4 service cards with line icons
- Process Breakdown: 7-step vertical timeline with animated progress line + numbered nodes
- Numbers/Results: 4 stat cards
- CTA (black, glow) + minimal footer
- Mobile-first responsive, reduced-motion support, SEO meta/OG, data-testid coverage
- Verified all sections via screenshots; JS lint clean

## Backlog / Next
- P1: Contact form or Calendly link on CTA (currently placeholder)
- P2: Real testimonials / client logos strip
- P2: Case-study / portfolio section
