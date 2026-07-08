# PRD — IT Niche "Get Started" Landing Page

## Problem statement
Redesign https://customchurchwebsite.com/getstarted.php into a modern, professional, minimal, infographic-style landing page using only HTML, CSS, vanilla JS. Small business / web design / custom solutions / digital marketing focus. Brand colors #e57119 (primary) + #000 (secondary). Typography: Lato. No humans, no photos — icons/illustrations/line art only. Files created in `/app/landing/`.

## User choices (from ask_human)
- Location: `/app/landing/`
- Copy source: fetched from live site + broadened to small business
- Form behavior: pure static — success toast, no backend

## Architecture
- Static site — no build step
- `index.html` — semantic markup with data-testids for testing
- `styles.css` — design tokens, mobile-first responsive, Lato font
- `script.js` — nav toggle, scroll reveal, counter animation, form validation, toast, smooth scroll

## Sections implemented
1. Sticky nav (logo, links, phone, Get Started CTA, mobile toggle)
2. Hero — headline + underline squiggle + CTAs + trust checkmarks + SVG infographic (browser mock, +248% Traffic card, 1.2k Leads card, SEO #1 rank badge, 6.4% Conversion coin, dashed connectors)
3. Trust strip — 4 animated counters (15+, 500+, $0, 24/7)
4. Services — 4 cards: Web Design, Custom Solutions, Digital Marketing, SEO
5. Process — 4-step horizontal timeline with numbered black tiles + dashed connector
6. Features — 9-card grid (Secure, Directory, Calendar, Prayer/Contact, CMS, Sermon/Blog, Giving, Mailer, Multi-Contributor)
7. Packages — 5 tiers (Starter/Silver/Gold-featured/Platinum/Portal)
8. Get Started form — package select, org name, contact fields, notes, consent, animated toast on submit
9. Final CTA — dark section with radial deco + primary & call buttons
10. Footer — 4-column with brand, company, contact, resources + copyright

## Design decisions
- Palette: white / cream (#faf7f3, #fff9f2) sections with orange accents and pure-black featured elements; avoids AI-slop purple gradients
- Typography: Lato 300/400/700/900 — H1 clamp(40, 6.4vw, 78)px, tight -.03em tracking
- Depth: 1px hairline borders + subtle shadows, orange-50 tinted icon tiles, faint background grid on hero
- Motion: micro hover lifts, arrow slides on buttons, scroll-reveal cascade, counter tick-up, float on hero SVG
- Accessibility: skip link, aria-labels, reduced-motion support, keyboard-focus outlines, semantic headings

## Verified
- Rendered at 1920x900 — hero infographic + all sections display correctly
- Sticky nav, form fields, toast, all data-testids present

## Next action items (P1/P2 backlog)
- P1: Add testimonials/logo strip (social proof) to boost trust
- P1: Add FAQ accordion below packages
- P2: Real form endpoint (currently pure static; can wire to FastAPI /api/leads if needed)
- P2: Dark-mode variant
- P2: Additional pages (about, features detail, portfolio)
