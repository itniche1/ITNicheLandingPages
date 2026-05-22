# PRD — IT Niche Privacy Policy Redesign

## Original Problem Statement
Build a landing page: Redesign the old IT Niche privacy policy page
(https://www.itniche.com/privacy-policy.php) into a modern, professional,
minimal, infographic-style landing page.

## User Choices
- Scope: Pure privacy policy redesign (single page)
- Visual style: Editorial / minimal + Tech-modern
- Backend: NONE — purely static frontend
- Colors: Primary `#e57119` (warm orange), Secondary `#000000` (black)
- Typography: Lato, sans-serif (weights 300/400/700/900)

## Architecture
- React 19 + react-router-dom (single route `/`)
- Tailwind CSS + custom utilities in `index.css`
- Framer Motion for scroll-reveal & micro-interactions
- Lucide-react for icons
- No backend / no MongoDB / no API calls

## Implemented (2025-12)
- Sticky glass nav with section anchors + mobile menu
- Hero: split-stroke headline "YOUR DATA / HANDLED WITH / DISCRETION."
  with hero image, tech-grid overlay, side meta strip, effective date,
  scroll indicator
- "At a Glance" two-column WE DO / WE DON'T comparator (5 items each)
- "Data Flow" infographic — 4 connected steps (Collection → Processing →
  Protection → Control) over geometric grid background
- "Policy Grid" — 3×3 technical grid of 9 numbered clauses, oversized
  faded background numerals, hover bottom-line trace
- Mailers section — full orange block, marquee strip, mock email card
  with unsubscribe link
- Footer — talk-to-experts CTA, link columns, giant ITNICHE typography

## Backlog (not implemented)
- P2: Reading-progress bar on policy section
- P2: Print-friendly stylesheet
- P2: Light theme variant

## Next Tasks
- Optional: connect "Contact Experts" CTA to a real contact form
- Optional: add a downloadable PDF version of the policy
- Optional: hook nav into IntersectionObserver to highlight active section
