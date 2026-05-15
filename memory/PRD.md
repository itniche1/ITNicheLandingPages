# IT Niche — Landing Page (Pricing Redesign)

## Original problem statement
Redesign https://www.itniche.com/how-much-my-new-site-should-cost.php into a modern, minimal, infographic-style landing page focused on trust, clarity and conversion. Brand: #E57119 (orange) primary, #000000 secondary. Target: small business, internet marketing, custom business. Single landing page. CTAs link out to https://www.itniche.com.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + @phosphor-icons/react
- Fonts: Outfit (display) + Inter (body) + JetBrains Mono (accents)
- Backend: FastAPI scaffolding untouched (only original /api/ + /api/status)
- No database writes from UI (pure marketing page)
- Asset images served via Emergent CDN (provided by design agent)

## Sections implemented (Dec 2025)
- Sticky glass header with logo, anchor nav, "Free consultation" CTA
- Hero: headline + value prop + product visual + price card + "$0 upfront" floating chip
- Black scrolling marquee (proof points)
- Pricing benchmark: bento grid with animated cost-tier bars, $0/$99 dark card, break-even infographic, cheap-vs-quality comparison strip
- "What you get" — six-card features grid (Custom design, Development, SEO, Content & UX, Hosting, Security)
- Process: four-step horizontal timeline (Discovery → Design → Build → Grow)
- Black "Pitch" section: "Why pay $5,000 upfront when you can pay $0?" + 3 stats
- "Why us" split section: workspace image + five trust checkpoints
- Final CTA + black footer with site map and itniche.com contact link

## What's been implemented
- Dec 2025: Full landing page, responsive (375px/1280px+), all 42 data-testids, 5 external CTAs verified, no console errors, design-agent guidelines followed (Swiss/High-Contrast archetype)

## User personas
- Small business owner evaluating website pricing
- Marketing agency comparing build costs
- Founder considering a custom business site without upfront cost

## Core requirements (static)
- Brand colors #E57119 + #000000
- Single-page, mobile-first, accessibility-friendly, SEO-friendly
- All primary CTAs link to https://www.itniche.com (target=_blank, rel=noopener)

## Backlog / Next tasks
P0:
- (none — landing page is feature-complete per brief)

P1:
- Add testimonials / logo wall section for social proof
- FAQ accordion (cost, timeline, what's included)
- Cookie/consent banner if needed for the target region

P2:
- Lightweight contact form (email capture) saved to /api/ for warm leads
- Light/dark theme toggle
- Add OG image + structured data (LocalBusiness/Service schema)
- Smooth section-aware nav highlighting
