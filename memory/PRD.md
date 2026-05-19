# IT Niche — Modern Landing Page (Contact-Focused)

## Original Problem Statement
Redesign the existing IT Niche contact page (https://www.itniche.com/contactus.php) into a modern, professional, minimal, infographic-style landing page. Pure HTML/CSS/Vanilla JS only. Brand colors `#e57119` (primary) and `#000000` (secondary). Typography: Lato. No human imagery — icons & line illustrations only. Target audience: small businesses for Web Design, Custom Solutions & Digital Marketing.

## User Personas
- Small business owners researching a web/marketing agency
- Marketing leads requesting a quote / consultation
- Recruiting/HR sending resumes (openings@)
- Existing clients needing helpdesk contact

## Core Requirements (Static)
- Pure HTML + CSS + Vanilla JS, single `index.html` (no React, no frameworks)
- Brand: `#e57119` (primary orange), `#000000` (secondary black)
- Lato font family
- Mobile-first responsive, accessibility-friendly, SEO meta tags
- No images / no humans — inline SVG line illustrations only
- Sections: Hero, Stats, Services/Benefits, Why-Us, Process Timeline, Contact (offices + form), CTA banner, Footer
- Client-side form validation + success toast

## Architecture
- Landing page served from `/app/frontend/public/index.html` (pure HTML/CSS/JS)
- React entry (`src/index.js`) intentionally does not mount — prevents shadcn CSS variables (--primary, --secondary, etc.) from overriding landing page's design tokens
- Hot reload via supervisor; `sudo supervisorctl restart frontend` required after `public/index.html` changes

## What's Been Implemented (Dec 2025)
- Sticky transparent-blur nav with logo, anchor links, "Free Consultation" CTA + mobile burger menu
- Hero: Pill badge, headline ("Your feedback is the **oxygen** we breathe."), CTA buttons (call + scroll-to-contact), trust meta, custom inline SVG infographic (hub + 6 service nodes with line icons)
- Stats strip: 4 animated counters (15+ years, 500+ projects, 25+ countries, 99% satisfaction)
- Services cards: Web Design, Custom Solutions, Digital Marketing with hover lift + top border accent
- Why-Us 2x2 grid: Data-Driven, Enterprise-Grade, Scalable Architecture, 24/7 Dedicated
- Process: 5-step horizontal timeline (Discover → Design → Develop → Deploy → Support), vertical on mobile
- Contact (dark section): two office cards (Memphis HQ, Hyderabad India) with address/phone/hours + bordered form (firstName, lastName, email, phone, company, website, message) with live inline validation, shake animation on error, success toast
- CTA banner: full-width orange, "Ready to transform your digital presence?"
- Footer: 4 columns (brand, explore links, email channels, offices) + copyright bar
- IntersectionObserver-driven reveal animations + animated stat counters
- All interactive elements include `data-testid` attributes for testing

## Prioritized Backlog (Remaining)
- **P1**: Add scroll-to-section smooth anchor highlighting (active link state in nav)
- **P1**: Wire contact form to a backend endpoint to actually capture leads (currently client-side only — explicitly per user choice)
- **P2**: Add a lightweight cookie banner / privacy notice
- **P2**: Open Graph + Twitter card meta tags for social previews
- **P2**: Add lazy-loaded testimonials carousel (logos / quotes)
- **P3**: Light/dark theme toggle (currently light by design)

## Next Action Items
- Decide whether to capture leads server-side (FastAPI + Mongo) — optional upgrade
- Add real client logos / press mentions for added trust
- Consider integrating Google Analytics / Plausible for conversion tracking

## Notes for Future Agents
- Do NOT re-enable React mounting; it will hijack shadcn CSS variables and break the landing page colors.
- Edit `public/index.html` for all visual changes; restart frontend supervisor after edits to that file (CRA dev server doesn't watch public/).
