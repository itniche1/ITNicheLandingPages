# Custom Church Website — Landing Page Redesign

## Original problem statement
Redesign the old feedback.php page from customchurchwebsite.com into a modern, minimal, infographic-style landing page. HTML + CSS + Vanilla JS only, delivered in `/app/landing`.

## Deliverables
- `/app/landing/index.html`
- `/app/landing/styles.css`
- `/app/landing/script.js`
- Mirror copy at `/app/frontend/public/landing/` for preview via preview URL

## Brand & style
- Primary: `#E57119` · Secondary: `#000000`
- Warm off-white background `#FBFAF7`
- Typography: Lato (300/400/700/900) via Google Fonts
- Minimal, editorial, infographic aesthetic — no humans / no photos
- Line-art SVG icons + filled geometric shapes with subtle gradients

## Page structure
1. Sticky top navigation (with mobile drawer)
2. Hero — asymmetric split: bold headline + infographic SVG (browser card, orange sphere, floating +184% and ✓ chips)
3. Marquee trust strip
4. Services — 3 cards (Web Design, Custom Solutions [dark], Digital Marketing)
5. Process — 4-step dotted-line timeline
6. Stats — dark band with animated count-up
7. Feedback form — split layout with outline SVG art + validated form + toast
8. FAQ — accessible details/summary accordion
9. CTA — dark grid-textured band with concentric target art
10. Footer

## Interactions (vanilla JS)
- Mobile nav toggle
- IntersectionObserver reveal animations
- Animated stat counters
- Client-side form validation + success toast (no backend)
- Smooth-scroll anchors with keyboard focus

## Accessibility & SEO
- Semantic landmarks (`header`, `main`, `section`, `footer`)
- Skip-link, visible focus rings, aria-labels
- `data-testid` on every interactive element
- Meta description, Open Graph tags, `lang="en"`, viewport meta
- `prefers-reduced-motion` respected

## Backlog / next
- P1: Wire feedback form to a real endpoint (SendGrid/Resend/FormSpree)
- P2: Add case studies / testimonials section
- P2: Add pricing tiers infographic
- P2: Add contact map + address bar
- P3: Add light/dark toggle
