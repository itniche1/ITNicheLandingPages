# Restaurant Web Builder — Landing Page PRD

## Original Problem Statement
Redesign restaurantwebbuilder.com/contact-us.php into a modern, professional, minimal,
infographic-style landing page. Reduce text, simplify hierarchy, premium clean look,
convert paragraphs into cards/stats/timelines/infographic visuals. Focus on trust,
clarity, conversion. NO images / NO humans — icons + line illustrations only.
Sections required: minimalist infographic hero + Contact Us form.
Brand: #e57119 (primary), #000000 (secondary). Font: Lato. Mobile-first, accessible, SEO-friendly.
Stack: ONLY vanilla HTML/CSS/JS. Files: index.html, styles.css, script.js in /app/landing.

## User Choices
- Keep it as a restaurant website builder brand; brand name "restaurantwebbuilder".
- Pure HTML/CSS/JS, no backend — front-end-only contact form with thank-you success state.

## Architecture
- Pure static site (no React, no backend). Canonical source: /app/landing/{index.html,styles.css,script.js}
- Preview copy served via React dev server public dir: /app/frontend/public/landing/
  Preview URL: {REACT_APP_BACKEND_URL}/landing/index.html
- Motion: Lenis (CDN) momentum scroll, IntersectionObserver reveals, CSS keyframe hero reveal + JS safety-net.
- Icons: Phosphor Icons via CDN (deferred).

## Design System
- Swiss/brutalist: sharp 0px corners, 1px structural borders, no drop shadows.
- Palette: #e57119 primary, #0a0a0a text/dark, #ffffff bg, #f7f6f4 surface.
- Type: Lato (300/400/700/900). h1 clamp 3–6.5rem weight 900.

## Implemented (2025-12)
- Fixed nav w/ scroll state + scroll progress bar; mobile hamburger menu.
- Kinetic hero: masked line-by-line reveal, floating SVG line-art (fork + rings), parallax.
- Infographic stats band (animated counters): 500+ sites, 27+ yrs, 99% uptime, 2 wks launch.
- Editorial marquee ribbon (outlined text).
- Features grid (6 cards, line icons, hover states).
- Numbered process timeline (01–04).
- Pricing snapshot (light Starter vs inverted-dark Growth "most popular").
- Contact section: front-end-only form (validation + animated success state) + oxygen tagline + contact meta.
- Global offices infographic (USA Memphis + India Hyderabad, real data from source site).
- Footer with oversized outlined brand line.
- Accessibility: focus-visible outlines, aria-hidden on decorative SVGs, prefers-reduced-motion fallback.
- SEO: meta description/keywords/OG tags, semantic headings.
- Testing: iteration_1.json — 100% frontend pass, 0 bugs.

## Backlog / Next
- P1: Menu showcase / online-demo gallery section (line-art dish cards).
- P1: FAQ accordion to cut remaining text.
- P2: Dark mode toggle; multi-language.
- P2: Wire contact form to a real email service (e.g., Resend) if a backend is later allowed.
