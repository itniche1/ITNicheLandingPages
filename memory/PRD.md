# IT Niche — Landing Page Redesign

## Original Problem Statement
Redesign the legacy contact page at https://customchurchwebsite.com/contact-us.php into a modern, professional, minimal infographic-style landing page for IT Niche LLC — a web design, custom solutions and digital marketing agency targeting small businesses.

## User Choices (verbatim)
- Real content from existing site
- Light theme
- Static contact form (visual only, no backend)
- Single-page scroll
- Brand colors: #e57119 (primary orange), #000000 (secondary black)
- Typography: Lato, sans-serif (paired with Outfit for display)
- No human photos, no images — icons / SVG / line illustrations only
- Stack: HTML/CSS/JS (implemented in React + Tailwind for parity)

## Architecture
- Frontend-only build (no backend changes).
- React + Tailwind + Shadcn primitives + Lucide icons + sonner toasts.
- Component-driven sections under `/app/frontend/src/components/sections/`.
- Page entry: `/app/frontend/src/pages/Landing.jsx` mounted on `/`.

## What's Implemented (2025-12)
- Sticky glassmorphism header with mobile menu.
- Hero with SVG concentric-ring infographic + conversion mini-card.
- Marquee capability strip.
- Bento services grid (6 cards: Web Design, SEO, Digital Marketing, Custom Software, E-Commerce, Analytics).
- Dark "by the numbers" stats section (20+, 500+, 98%, 2 offices).
- 4-step process timeline (Discover → Design → Build → Launch & Grow).
- "Why IT Niche" capabilities section with engagement-score infographic + 6 pillars.
- Global Presence: USA (Memphis) + India (Hyderabad) office cards with addresses, phone, hours.
- Contact section with static form (sonner toast feedback) + contact details.
- Dark CTA section with "Free Consultation" + tel: call CTA.
- Footer with massive 'Your feedback is "Oxygen" for us.' tagline + 4 link columns.

## Test Status
- Testing iteration 1: 100% pass on frontend. All sections, navigation, mobile menu, and form happy path verified.

## Prioritized Backlog (P0/P1/P2)
- P1: Wire contact form to a real backend endpoint (FastAPI + MongoDB) when client is ready.
- P1: Add testimonials / client logos section to deepen social proof.
- P2: Add a "Latest Work" or case-studies showcase.
- P2: Add light/dark theme toggle.
- P2: Add SEO meta tags + OpenGraph + JSON-LD organization schema.
- P2: Add framer-motion staggered scroll reveals beyond the existing CSS fade.

## Next Tasks
1. Capture client testimonials and add a proof section.
2. Add a `/api/leads` endpoint to persist contact submissions.
3. Set up sitemap.xml and robots.txt for SEO.
