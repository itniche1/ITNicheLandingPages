# IT Niche — Static Landing Page Export

A self-contained HTML / CSS / JS export of the IT Niche pricing landing page.
No build step. No framework runtime. Just three files.

## Files

| File         | Purpose                                                        |
| ------------ | -------------------------------------------------------------- |
| `index.html` | Full markup, including section anchors, data-testids and SEO meta. |
| `styles.css` | Custom styles (fonts, marquee, hover lift, scroll-reveal, etc.). |
| `script.js`  | Optional. ~30 LOC of vanilla JS for scroll-reveal + footer year. |

## How to use

1. **Open locally** — just double-click `index.html`.
2. **Deploy** — drop the three files into any static host:
   - Netlify, Vercel, Cloudflare Pages, GitHub Pages
   - S3 + CloudFront, Nginx, Apache, any CDN
   - WordPress (paste markup into a custom HTML block — keep `<head>` deps)
3. **No build needed.** Tailwind, Google Fonts, and Phosphor Icons load from CDN.

## Dependencies (all via CDN, no install)

- **Tailwind CSS** Play CDN — utility classes used throughout
- **Lucide Icons** Web UMD — `<i data-lucide="arrow-right">` syntax, initialised via `lucide.createIcons()`
- **Google Fonts** — Outfit (display) + Inter (body) + JetBrains Mono (mono)

If you want zero CDN dependence:
- Replace `cdn.tailwindcss.com` with a built Tailwind CSS file (run `npx tailwindcss -i in.css -o out.css --minify` after extracting classes).
- Swap Lucide for inline SVGs (copy from https://lucide.dev).
- Self-host the Google Fonts woff2 files.

## Customising

- **Brand colors** — open `styles.css` and edit the `:root` variables at the top.
  - `--primary`        (orange) `#E57119`
  - `--fg`             (text)   `#0A0A0A`
  - `--accent`         (tint)   `#FFF1E8`
- **Copy** — all content lives directly in `index.html`. Search the headline you want to change.
- **CTAs** — search `https://www.itniche.com` and replace with your destination. 5 occurrences (header, hero, pitch, final CTA, footer).
- **Hero / images** — three `<img>` tags use `static.prod-images.emergentagent.com`. Replace `src` to host your own.

## Sections (anchored)

```
#top                  Hero
                       Marquee (proof bar)
#pricing              Pricing benchmark + bento + compare strip
#what-drives-cost     Six features grid
#process              Four-step timeline
                       Black "Pitch" section
#why-us               Workspace + trust checkpoints
#cta                  Final CTA
                       Footer
```

## Accessibility

- All interactive elements have keyboard-visible focus rings (`#E57119`).
- All images carry meaningful `alt` text (decorative images use `alt=""` + `aria-hidden`).
- Color contrast passes WCAG AA on text against backgrounds.
- Respects `prefers-reduced-motion`: marquee, pulse, scroll-reveal and bar-fill all disable automatically.

## SEO

- Semantic `<header>`, `<main>` (implicit), `<section>`, `<footer>` structure.
- Meta description and theme-color set in `<head>`.
- Single `<h1>`; logical `<h2>` per section.
- All external links use `rel="noopener noreferrer"` and open in `target="_blank"`.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari) — last 2 versions.
IE / very old Safari are not supported (uses CSS grid, `backdrop-filter`, IntersectionObserver, custom properties).
