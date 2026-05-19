# IT Niche — Careers Landing Page

A pure **HTML / CSS / Vanilla JavaScript** redesign of the IT Niche careers
page. No build step, no framework — open `index.html` directly in any browser.

## Files

```
Landing/
├── index.html     # Markup + Tailwind CDN + Tailwind theme config
├── styles.css     # Custom CSS (animations, buttons, cards, eyebrows, etc.)
└── script.js      # Vanilla JS (mobile menu, scroll reveal, animated counters)
```

## External dependencies (loaded via CDN, no install needed)

- [Tailwind CSS](https://cdn.tailwindcss.com) — utility classes
- [Fontshare](https://www.fontshare.com/) — `Cabinet Grotesk` (headings) + `Satoshi` (body)
- [Phosphor Icons](https://phosphoricons.com/) — `<i class="ph ph-..."></i>`

## Run locally

Just double-click `index.html`, or serve the folder:

```bash
# Python 3
cd Landing && python3 -m http.server 8080
# → open http://localhost:8080
```

## Brand

- Primary: `#e57119`
- Secondary: `#000000`
- Surface: `#ffffff` / `#fafafa` / lines `#eaeaea`

## Sections

1. Top hiring marquee
2. Sticky nav (with mobile menu)
3. Hero — oversized headline + SVG infographic + live callout
4. Stats grid with animated counters
5. "Why IT Niche" 8-cell bento
6. 4 Open Position cards (PHP, SEO, Testing, UI)
7. 5-step hiring process timeline
8. About IT Niche + services infographic + promise quote
9. Black final CTA
10. Footer

All CTAs are static `mailto:hiring@itniche.com`.
