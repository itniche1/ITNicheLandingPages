# Studio Joviant — Landing Page (Redesign)

## Original problem statement
Redesign the customchurchwebsite.com/process.php page into a modern, minimal,
infographic-style landing page targeting Small Business / Web Design / Custom
Solutions / Digital Marketing. Constraints: HTML + CSS + Vanilla JS only, no
humans/photos, palette #e57119 + #000000, typography Lato.

## Deliverable
`/app/landing/index.html` · `/app/landing/styles.css` · `/app/landing/script.js`
(also mirrored to `/app/frontend/public/landing/` for preview)

## Architecture
- Static, single-page site. No backend.
- Libraries via CDN: Lenis 1.1.14 (smooth momentum scroll), GSAP 3.12.5 +
  ScrollTrigger (scroll reveals + hero parallax).
- Fonts: Lato (primary sans, weights 300/400/700/900) + Fraunces
  (italic editorial serif accent for chapter numbers, big numerals, and
  highlighted words). Loaded via Google Fonts.
- Hero on-load reveal uses CSS keyframes (line-by-line mask) — GSAP handles the
  secondary fade-ins, section reveals, count-ups, hero orb parallax, and the
  CTA-mega scroll shift.

## Sections shipped
1. Preloader (SJ mark + progress bar)
2. Sticky glass nav with underline hover
3. Hero — kinetic masked line reveal, orbiting rings + floating chips,
   grid backdrop, radial glow, corner marks, scroll cue
4. Editorial marquee (slow horizontal, serif italic accent word in orange)
5. Intro (paper theme) with tag chip + editorial headline + meta stats
6. Manifesto — four numbered chapters (01–04) with italic serif numerals
7. Process — 4-step infographic cards with custom SVG line-art (form,
   colour venn, weekly line-chart, star)
8. Numbers — 4 stats with animated count-up and Fraunces italic numerals
9. Terms — 50/50 payment split infographic (dot-grid + solid/dashed cards)
10. Editorial one-liner ("Get your FREE mock-up …")
11. CTA — huge headline + inline form + outlined GET STARTED bleed
12. Footer — quad-column with local clock + massive outlined JOVIANT

## Design choices
- Palette: --ink #0b0b0b, --paper #f5f0e8, --paper-2 #ece5d8, --brand #e57119.
- Alternating dark/light section rhythm for editorial pacing.
- Grain overlay + micro-grid backdrop for texture without images.
- Custom cursor on desktop with mix-blend-mode difference.

## Accessibility / SEO
- Semantic landmarks (header/main/section/footer), aria-labels on sections.
- prefers-reduced-motion respected (animations disabled, elements shown).
- Meta title/description, canonical, OG tags.
- Focusable inputs with high-contrast focus-brand underline.

## Backlog / potential next tasks (P1)
- Wire CTA form to a backend/email (currently client-side confirmation only).
- Add an "About / Team" section if scope expands.
- Add dedicated services pages (Web Design, Custom Solutions, Marketing).
- Add case-study grid / portfolio module.
