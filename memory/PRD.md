# e-Church Landing Page — PRD

## Original Problem Statement
Redesign the existing https://www.itniche.com/solutions-for-churches.php page into a modern, professional, minimal, infographic-style landing page using only HTML, CSS, and Vanilla JavaScript. Brand colors #e57119 (primary) + #000000 (secondary), Lato typography, no human images — line icons + illustrations only.

## Architecture
- Static site: `/app/Landing/index.html`, `styles.css`, `script.js`
- No build step, no framework
- Lato via Google Fonts, inline SVG line icons

## What's Implemented (2025-12)
- Sticky glass nav with logo + animated underline links + mobile menu
- Hero: animated eyebrow, gradient accent headline, dual CTAs, counter-stats (15+/100%/24/7), orbit infographic with 6 floating module icons + chips
- Auto-scrolling module ticker
- 8 numbered feature cards (Member Registration, Event Calendar, Message Board, Blog & Media, Prayer Requests, Classifieds, Content Management, Electronic Mailer) in a clean grid w/ hover state
- "Unique by design" section with checklist + 3D browser mockup
- CTA: dark card with grid pattern, email form (client-side validation), 3 metric tiles
- Footer with brand, links, copyright
- Reveal-on-scroll via IntersectionObserver, animated counters, smooth-scroll anchors, mobile menu toggle
- Mobile-first responsive, accessibility (aria-labels, sr-only, reduced-motion), SEO meta tags
- data-testid on all interactive/critical elements

## Next Action Items
- Wire CTA form to a real endpoint (currently client-side demo)
- Add OG/Twitter meta + favicon for SEO/social
- Optional: case studies / testimonials section
