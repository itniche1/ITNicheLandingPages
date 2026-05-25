# IT Niche — Landing Page Redesign

## Original Problem Statement
Redesign https://www.itniche.com/what-we-do.php into a modern, professional, minimal, infographic-style landing page using only HTML/CSS/Vanilla JS. Brand colors: #e57119 (primary), #000 (secondary). Typography: Lato. No human imagery — icons, illustrations, line art only. Target audience: small business (Web Design, Custom Solutions, Digital Marketing).

## Stack
Static site — pure HTML5 + CSS3 + Vanilla JS. No framework. No build step.

## File Structure
- `/app/Landing/index.html` — semantic markup, all 4 required sections + nav + process + footer
- `/app/Landing/styles.css` — design tokens, components, responsive grid, animations
- `/app/Landing/script.js` — mobile nav, smooth scroll, scroll-reveal, counter animation, parallax

## Implemented (2025-12)
- Sticky nav with mobile hamburger and scroll-shadow
- **Hero** with inline-SVG infographic (browser + chart + pie + mobile + floating SEO/Live badges), 3 trust stats, dual CTAs (mailto + tel)
- **Marquee** strip of services
- **What We Do** — 3 cards with custom icons (Web Design / Custom Solutions / Digital Marketing)
- **Go-online with IT Niche** — checklist + 4-card animated stats grid (counter on scroll)
- **WAP / Responsive** — devices infographic + animated SVG percentage rings (62%, 88%)
- **Process** — 4-step timeline (Draw · Design · Create · Grow)
- **CTA** section — dark with dot pattern, email + phone buttons
- Multi-column footer with brand, services, company, contact
- Accessibility: aria labels, semantic HTML, prefers-reduced-motion, focus-friendly
- SEO: meta tags, OG tags, JSON-LD structured data
- Responsive breakpoints: 1024 / 720 / 420

## Brand Tokens
- Primary: #e57119  /  Primary-600: #c95f12  /  Primary-50: #fff3ea
- Ink: #0a0a0a  /  Muted: #6b6b6b  /  Line: #ececec
- Font: Lato (300/400/700/900) via Google Fonts

## CTA Targets
- Email: mailto:info@itniche.com
- Phone: tel:+19015550100

## Backlog (P1/P2)
- Real contact details (phone/email) once provided by client
- Optional: testimonials section, client logo strip, FAQ accordion
- Optional: hook CTA buttons to actual contact form / scheduling
