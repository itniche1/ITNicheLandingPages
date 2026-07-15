# ITNiche Landing Page — PRD

## Original Problem Statement
Redesign an existing text-heavy webpage (customchurchwebsite.com/sitemap.php) into a modern, professional, minimal, infographic-style landing page for Small Business / Web Design / Custom Solutions / Digital Marketing. Brand: #e57119 (orange) + #000000. Typography: Lato. No humans, no images — icons and line illustrations only. Deliverables: `index.html`, `styles.css`, `script.js` in `/app/landing/`. Stack: Pure HTML/CSS/Vanilla JS.

## Enhanced Brief
Award-worthy (Awwwards-caliber) execution. Kinetic hero with line-by-line mask reveal, editorial marquee, numbered manifesto chapters, premium motion, smooth momentum scrolling, custom cursor, parallax hero moment.

## Architecture
- Static site under `/app/landing/`
- Symlinked into `/app/frontend/public/landing/` for preview access
- URL: `<REACT_APP_BACKEND_URL>/landing/index.html`
- CDN libraries: GSAP + ScrollTrigger (motion), Lenis (smooth scroll), Google Fonts (Lato)

## Sections Implemented
1. Preloader with fake percentage
2. Kinetic hero — masked line reveal, parallax orb infographic (rotating rings, compass ticks)
3. Editorial marquee (Web Design · Custom Solutions · Digital Marketing · Lead Gen · Small Business · Since 2004)
4. Manifesto grid — 6 asymmetric chips (curve chart, dark card, stat "20 years", orange "1,185+ sites", world-map viz)
5. Services — editorial hover-fill list (Web Design, Custom Solutions, Digital Marketing, Lead Generation) with tags + SVG line icons
6. Process timeline — 5-week horizontal stepper with dashed connecting line, week labels, glyph icons, active-week orange dot
7. Pricing (3 tiers: Launch Kit / Momentum / Bespoke) with dark feature card
8. Sitemap infographic — tree root with 4 branches (Company / Services / Get Started / Resources)
9. Contact — dark section with masked title reveal, 3 contact cards (email/phone/studio), giant "Start a project" CTA
10. Footer — giant "itniche®" wordmark + 3-column meta

## Craft & Motion
- Custom mix-blend cursor (dot + ring, hover expansion)
- Lenis smooth momentum scroll bridged to GSAP ticker
- Line-by-line mask reveals on hero & contact titles
- IntersectionObserver-based reveal + stagger system
- Animated counters (21 years / 1,200+ sites)
- Rotating orb rings, pulsing "available" dot, floating marquee that reverses on scroll direction
- Grain overlay, paper-tone palette (#f7f4ee)
- 100% keyboard/screen-reader accessible via semantic HTML + aria-labels, `prefers-reduced-motion` fallback

## Palette
- Ink #0a0a0a · Paper #f7f4ee · Orange #e57119 · Muted #6b6660

## Type
Lato only — weights 100/300/400/700/900 with italic contrast for editorial accents.

## Backlog (P1 / next phase)
- Optional CMS integration for portfolio work
- Case study detail pages
- Cookie/consent banner
- SEO OG image + favicon
- Actual contact form (currently mailto only per user choice)

## Files
- `/app/landing/index.html`
- `/app/landing/styles.css`
- `/app/landing/script.js`
