# IT Niche — Free eBook Landing

A modern, minimal, infographic-style landing page redesign of
[itniche.com/download-e-book.php](http://itniche.com/download-e-book.php).

Built with **HTML, CSS and Vanilla JavaScript only** — no frameworks, no build step.

## Files
- `index.html` — semantic, accessible markup
- `styles.css` — design system (Lato, #e57119 / #000), responsive grid, animations
- `script.js` — form validation, scroll reveal, stat counters, sample PDF generation

## Run
Just open `index.html` in a browser, or serve the folder:

```bash
cd Landing
python3 -m http.server 8080
# open http://localhost:8080
```

## Sections
1. Sticky nav + mobile menu
2. Hero with SVG infographic (book + connected service nodes)
3. Trust marquee
4. Animated stat counters
5. “What’s inside” — 6 chapter cards
6. Process timeline (4 phases)
7. Services — Web Design / Custom Solutions / Digital Marketing
8. Download form (validates + downloads a generated sample PDF)
9. CTA + Footer
10. Toast notifications

## Notes
- The form submits **client-side only** and generates a small valid PDF on the fly
  (personalised with the user’s name), then triggers a download.
- No external JS libraries — fonts via Google Fonts only.
- Respects `prefers-reduced-motion`.
