# IT Niche — Careers Landing Page

## Original Problem Statement
Redesign the old IT Niche careers page (https://www.itniche.com/careers.php) into a modern, professional, minimal, infographic-style landing page. Convert long policy-heavy paragraphs into scannable infographic-style sections (hero, stats, cards, timeline, CTA). No human/photographic imagery — line-art / illustrations only. Brand: `#e57119` (primary) + `#000000` (secondary). Target audience: small businesses, web design, custom solutions, digital marketing. Tech: pure HTML/CSS/Vanilla JS.

## User Persona
A prospective hire (developer, SEO specialist, QA engineer, UI designer) browsing IT Niche careers — wants to scan job openings quickly, understand culture/process, and apply via email in under 90 seconds.

## Architecture / Stack
- Pure static landing page at `/app/frontend/public/index.html`
- Tailwind via CDN, Fontshare (Cabinet Grotesk + Satoshi), Phosphor icons
- Vanilla JS for: mobile menu, IntersectionObserver scroll reveal, animated stat counters, marquee, smooth scroll
- React's `App.js` returns `null` so React doesn't interfere — `#root` is `display:none`
- No backend used; all CTAs are `mailto:hiring@itniche.com`

## Core Requirements (Static)
- Mobile-first responsive
- Accessibility-friendly (semantic HTML, eyebrow + heading hierarchy, aria-labels on toggles)
- SEO-friendly meta tags (title, description, OG)
- Sharp edges (no border-radius), Swiss/high-contrast Archetype 4
- Brand colors only — `#e57119`, `#000000`, `#fafafa`, `#eaeaea`

## What's Been Implemented (2026-12)
- Top hiring marquee
- Sticky transparent backdrop-blur nav with mobile menu toggle
- Hero: oversized Cabinet Grotesk headline, italic orange accent, decorative SVG infographic, live-status callout
- Stats grid (15+ years, 4 roles, 500+ projects, 20+ countries) with animated counters
- "Why IT Niche" 8-cell bento grid with Phosphor icons
- 4 Open Position cards (PHP Dev, SEO, Testing Engineer, UI Designer) with skill pills and per-role mailto Apply CTAs
- 5-step hiring process timeline (Step 05 highlighted in black)
- "About IT Niche" with 6-service infographic grid + quote panel
- Final CTA on black with orange mailto button + decorative rings
- Footer with careers links, contact info, year auto-update

## Prioritized Backlog (P0/P1/P2)
- P1: SEO-friendly Open Graph image generation (currently uses favicon SVG)
- P1: Add `<noscript>` graceful degradation message
- P2: Job detail pages (per-role deep dive) — currently single anchor section
- P2: Apply form (would need backend; user opted for static CTA only)
- P2: Multi-language toggle

## Next Tasks
- Optional: add Open Graph social share image (1200x630)
- Optional: implement working application form with backend storage
