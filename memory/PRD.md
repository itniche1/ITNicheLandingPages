# IT Niche — Landing Page

## Original Problem
Redesign https://customchurchwebsite.com/what-we-do.php into a modern, minimal, infographic-style landing page for IT Niche (small-business web design, custom solutions, digital marketing). Vanilla HTML/CSS/JS only. Files in `/app/landing`.

## User Choices
- Brand: **IT Niche**
- Content: pulled from source URL, condensed into editorial infographic sections
- Icons: **Inline SVG only**
- CTA: `#contact` anchor
- Colors: `#e57119` primary / `#000` secondary
- Typography preference: Lato (paired with Fraunces for editorial display)

## Architecture
- Static site — no backend
- Files: `/app/landing/index.html`, `styles.css`, `script.js`
- Libraries (CDN, non-blocking, defer): Lenis (smooth momentum scroll), GSAP + ScrollTrigger (scroll animations)
- Fonts: Google Fonts — Lato (300/400/700/900) + Fraunces (italic display)

## Sections Implemented
1. Loader with staggered "IT · Niche" italic serif letter reveal + progress bar/count
2. Sticky nav with scroll-glass state and mobile toggle
3. Hero — line-masked reveal of "Draw. Design. Create." (last word italic + orange), meta rows, editorial three-column footer (studio / index / manifesto quote)
4. Slow editorial marquee (Draw ✱ Design ✱ Create ✱ Market ✱ Optimize ✱ Support)
5. Chapter 01 — "Go-online with IT Niche" pentagon orbit infographic (Analyze / Draw / Create / Optimize / Support around an "end-to-end" core with dashed orbital rings)
6. Editorial spotlight — dark stage, orange spotlight glow, SVG "product" mock with parallax + 3D pointer tilt
7. Chapter 02 — "WAP-enable your presence" with viewport comparison infographic + animated 4-tile stats (63%, 100%, 3×, 24/7)
8. Services grid — 4 disciplines (Web Design, Custom Solutions, Digital Marketing, Small Business) with line SVG icons + tag pills, hover-invert
9. Process timeline — 5 acts on a horizontal rail with orange endpoint dots
10. Manifesto — 6 numbered chapters (§ 01–06)
11. CTA — dark section, oversized editorial serif, orange pill button, contact meta grid
12. Footer — massive italic wordmark, 4-column links, baseline

## Motion / Craft
- Lenis smooth momentum scroll
- GSAP scroll-triggered kinetic entries (chapter titles, orbit stagger, viewport bars, timeline)
- Parallax hero grid + 3D pointer tilt on spotlight
- Custom cursor (dot + ring) with hover state
- IntersectionObserver reveals with staggered delays
- Counters animate on enter
- Grain overlay + fine 6-column vertical grid
- Reduced-motion fallbacks throughout

## Backlog / Next
- P1: Wire "Start a project" to real form or mailto
- P2: OG image, favicon set, structured data (LocalBusiness JSON-LD)
- P2: Case-study / portfolio page
- P2: Testimonials carousel
