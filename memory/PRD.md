# Terms of Use Landing — IT Niche

## Problem Statement
Redesign the old customchurchwebsite.com/terms-of-use.php content into a modern, minimal, infographic-style landing page for a digital agency (Web Design · Custom Solutions · Digital Marketing).

## Tech
- Vanilla HTML, CSS, JavaScript only
- Lenis (smooth momentum scroll) via CDN
- GSAP + ScrollTrigger (motion) via CDN
- Google Fonts: Lato (100/300/400/700/900)
- Location: `/app/landing/` (standalone static site)

## Brand
- Primary: #e57119 (orange)
- Secondary: #000000 (black)
- Canvas: #f6f4f0 (warm off-white)
- Typography: Lato with extreme weight contrast (900 display, 400 body)
- No human/photo imagery — only inline SVG line-art

## Architecture
- `index.html` — semantic structure, inline SVG illustrations, JSON-LD ready
- `styles.css` — brutalist-infographic system, CSS Grid, generous whitespace
- `script.js` — preloader, Lenis, GSAP hero reveal, ScrollTrigger scroll-linked animations, IntersectionObserver count-ups

## Sections Implemented
1. **Preloader** — TERMS OF USE mask reveal + % counter
2. **Nav** — sticky, blurs on scroll
3. **Hero** — masked line-by-line reveal of "Terms of Use, made radically clear.", rotating SVG network, animated stat counters, parallax on scroll
4. **Editorial Marquee** — WEB DESIGN · CUSTOM SOLUTIONS · DIGITAL MARKETING on black
5. **Manifesto (§ 001 — Preamble)** — Legal, but human-readable
6. **Chapters 01–08** — sticky numbered chapters with infographic visuals:
   - 01 Acceptance flow diagram
   - 02 Access bars
   - 03 Bento IP grid
   - 04 As-is / as-available tags
   - 05 $0 liability donut
   - 06 Check/X accuracy list
   - 07 Privacy shield
   - 08 3rd-party node diagram
   - Each with an accordion `<details>` disclosure for full legal text
7. **Trust** — 1200+ projects · 18yrs · 98% retention · 24/7
8. **CTA** — solid orange with mailto & tel actions, studio info
9. **Footer** — dark, minimal

## Motion Highlights
- Preloader → hero handoff
- Masked line-by-line reveal (GSAP power4.out)
- Parallax hero background (ScrollTrigger scrub)
- Slow editorial marquee (CSS keyframes)
- Bars fill animation on view
- Donut arc stroke-dashoffset animation
- CTA scale-in (scrub)
- IntersectionObserver count-ups
- Custom orange cursor dot on desktop
- Scroll progress bar

## Accessibility
- Semantic HTML5 landmarks (header/main/section/footer)
- Focus-visible states inherited
- `prefers-reduced-motion` respected
- ARIA labels on nav and decorative SVGs
- data-testid on every interactive element

## Content Source
Sourced from https://customchurchwebsite.com/terms-of-use.php and restructured
into 8 concise chapters with visual summaries.

## Status
✅ Complete — served as static files from `/app/landing/`.
Open `/app/landing/index.html` directly, or serve with any static host.

## Next Action Items
- Deploy to a static host (Vercel/Netlify/Cloudflare Pages)
- Optional: add a real /privacy-policy sibling page in same style
- Optional: swap ITNiche brand to actual client logo when applicable
