# Portfolio canvas

A static, responsive personal portfolio inspired by the supplied reference and recording. Content is intentionally placeholder content, not a claim of completed work.

## Add your content
Edit `dist/content.js` for your name, initials, role, availability, contact links, portrait, workspace photo, and four projects. Put your assets in `dist/assets/` and reference them with a relative path such as `assets/portrait.jpg`. Each project's `cover` field accepts an image path. Project cards and the case-study dialogs use the same project data.

`dist/index.html` holds the biography, introduction, notes, and footer text. `dist/app.js` holds the case-study outline and playground entries. `dist/styles.css` contains the visual design, responsive layouts, and motion.

## Preview
Serve the `dist` folder through any local HTTP server. No dependency installation or build is required.

## Interactions
- Sticky project folders on desktop; individual project cards on mobile.
- Custom cursor label and a drag-to-select color-inversion rectangle on non-interactive canvas areas.
- Floating labels, cycling hero artwork, animated geometric accents, scroll reveals, and responsive hover states.
- Project and playground dialogs, contact placeholders, working in-page navigation, and a mobile menu.
- Animation pause button, system reduced-motion support, keyboard focus states, and native accessible dialogs.
- Contact links activate when you supply real values. Nothing submits to an external service.

## Typography
The reference's published font declarations identify Flux Variable, Inter / Inter Display, DM Mono, and Just Me Again Down Here. The local font files match those declarations. Font sources are recorded in `FONT-SOURCES.md`.
