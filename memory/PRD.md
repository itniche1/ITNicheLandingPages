# IT Niche — Landing Page (Static)

## Problem statement
Redesign the legacy https://www.itniche.com/service-overview.php page as a modern, minimal, infographic-style landing page using ONLY HTML / CSS / Vanilla JS. Brand colors #e57119 + #000000. No humans, no photos — icons and SVG illustrations only.

## Implementation (Dec 2025)
- Pure static: `/app/landing/index.html`, `/app/landing/styles.css`, `/app/landing/script.js`
- No build step, no framework. Google Fonts (Outfit + Manrope) + Lucide icons via CDN.
- Sections: Header, Hero (SVG infographic), Marquee strip, Stats (animated counters), Services (Bento grid: Custom Design, Hosting, Maintenance, Support, SEO/Marketing), Process timeline (6 steps), Team expertise (animated skill bars), Industries grid (10), CTA + static contact form, Footer (Memphis + Hyderabad locations).
- Animations: IntersectionObserver reveal, counter tween, skill-bar fill, marquee strip, hover lifts.
- Accessibility: semantic landmarks, ARIA labels, `:focus-visible`, prefers-reduced-motion.
- All interactive elements include `data-testid`.

## How to host
Standalone — copy `/app/landing/` to any static host (Netlify, Vercel, S3, GitHub Pages, Nginx). Open `index.html`.

## Backlog / next ideas (P1/P2)
- P1: Wire contact form to a real endpoint (Formspree / SendGrid / backend).
- P1: Add OG/Twitter meta tags + sitemap.xml + robots.txt for SEO.
- P2: Case-study cards section with sample portfolio.
- P2: Blog/insights teaser block.
- P2: Live chat / Calendly embed for instant booking.
