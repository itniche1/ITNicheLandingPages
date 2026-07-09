# IT Niche — Landing Page (Static)

## Problem Statement
Redesign the old "Let Us Work Together" page from https://customchurchwebsite.com/let-us-work-together.php
into a modern, minimal, infographic-style landing page using only HTML, CSS, and vanilla JS.

## Target Audience
Small businesses seeking Web Design, Custom Solutions & Digital Marketing.

## Brand
- Primary color: `#e57119` (orange)
- Secondary color: `#000000` (black)
- Typography: Lato (300 / 400 / 700 / 900)

## Location
`/app/landing/` — three files: `index.html`, `styles.css`, `script.js`

## Sections Implemented
1. **Sticky Navigation** — glassmorphism, mobile hamburger
2. **Hero** — Bold headline, subhead, dual CTAs, meta stats, orbit infographic (SVG circles + floating chips)
3. **Marquee Strip** — 6-stage keyword banner on black
4. **Go-online with IT Niche (Partnership)** — split card (Your Role / Our Role) with connector infographic
5. **Services** — 4-card grid (Small Business, Web Design, Custom Solutions, Digital Marketing) with line-icon SVGs
6. **Process Breakdown** — 7-step vertical timeline (dark section) with numbered markers, week estimates, animated reveal on scroll
7. **Stats** — animated counter cards (7, 90, 4, 100)
8. **CTA** — dark card with dot-grid backdrop, anchor CTAs, contact meta (email, phone, location)
9. **Footer** — brand, links, dynamic year

## Interactions (vanilla JS)
- Smooth anchor scrolling with sticky-nav offset
- IntersectionObserver: timeline reveal, section-aware active nav link, stat counter animation
- Mobile hamburger toggle
- Hover parallax on hero chips
- Marquee, orbit spin, chip float, entrance fade-up animations
- Respects `prefers-reduced-motion`

## Accessibility & SEO
- Semantic HTML5 landmarks (`header`, `main`, `section`, `nav`, `footer`)
- Descriptive meta description & keywords, theme-color
- ARIA labels on nav / icons hidden with `aria-hidden`
- Keyboard-navigable interactive elements
- `data-testid` on every interactive/major element
- Mobile-first responsive (breakpoints at 960px & 720px)

## What's Implemented
- Full static landing page — production ready
- No backend / no framework dependencies
- No images (line-style inline SVG illustrations only)

## How to Preview
Open `/app/landing/index.html` in a browser, or serve locally:
```bash
cd /app/landing && python3 -m http.server 8765
```

## Next Action Items
- Wire "Start a project" CTA to a contact form or booking flow if backend needed
- Add real testimonials / logo strip section for extra social proof
- Add page-level Open Graph / Twitter card meta tags for social sharing
- Add favicon + PWA manifest
- Compile to a single-file build (inline CSS/JS) if targeting extreme CDN performance
