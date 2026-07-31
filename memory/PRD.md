# PRD — "How It Works" Landing Page Redesign

## Original Problem Statement
Redesign the old `restaurantwebbuilder.com/how-it-works.php` page into a modern, minimal,
infographic-style landing page. Pure HTML/CSS/Vanilla JS in `/app/landing`
(`index.html`, `styles.css`, `script.js`). Reduce text, use icons/illustrations/stats/
timelines, focus on trust/clarity/conversion. No images, no humans — line-art SVG only.

## User Choices (verbatim)
- Redesign only the "How It Works" page content
- Inline SVG line-art illustrations (no images/humans)
- Pull the actual text from the live URL, then simplify
- Get-started section with a simple non-functional form
- Orange (#e57119) accents on black (#000)
- Award-worthy / Awwwards-level motion & craft (framer-motion/lenis requested → used Lenis via
  CDN since stack is vanilla JS; no React, so framer-motion N/A)

## Brand / Design
- Colors: #e57119 (primary orange), #000000 (secondary/black), light ink text on dark
- Typography: Lato (Google Fonts) — weights 100–900
- Style: minimal, premium, whitespace-heavy, infographic line-art, grain overlay, glass nav

## Architecture
- Static site, no backend. Files: `/app/landing/index.html`, `styles.css`, `script.js`
- Lenis (CDN) for momentum smooth scroll; all other motion is CSS + vanilla JS
- IntersectionObserver reveals (keyframe animations), number counters, custom cursor,
  parallax, JS-driven seamless marquee, SVG draw-in on view

## Sections Implemented (2026)
- Nav (glass, scroll state, mobile menu) + scroll progress bar
- Hero: masked line-by-line headline reveal, line-art spotlight/browser infographic,
  floating badges (SEO / Custom Code / Live 24×7), $199 / 16hr / 24×7 meta stats
- Editorial marquee strip
- How It Works: 3 numbered manifesto chapters (sketch → launch → grow) with line-art icons
- Why Us: 3 stat cards with animated counters ($199+, 16 hr, 24×7)
- Our Niche: 3 expertise cards (Support / Marketing / Lead Gen)
- CTA "Ask an Expert": copy + functional-demo contact form
- Footer

## Accessibility / SEO
- Skip link, aria-labels, semantic headings, `prefers-reduced-motion` support
- Meta description + OpenGraph tags, theme-color

## Status
- MVP complete; all sections verified via screenshots + DOM checks (counters, form submit,
  smooth scroll). JS syntax validated (`node --check`).

## Backlog / Next
- P1: Wire the contact form to a real inbox (Resend) or CRM
- P1: Add a testimonials / logos trust strip
- P2: Light theme variant toggle
- P2: Blog teaser section (from original site's "From Our Blog")
