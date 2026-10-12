# Personal Canvas — Portfolio

A responsive portfolio built with HTML, CSS, JavaScript, and GSAP. It includes a floating canvas hero, scroll reveals, a completed four-card folder stack, experiment cards, and an animated contact section. Content remains intentionally replaceable.

## Start locally

Use Node.js 20 or newer:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. Source changes rebuild automatically; refresh the browser to see them. Use `npm run dev -- --port 4180` if that port is already occupied.

## Folder structure

```text
portfolio/
├── src/
│   ├── index.html               # Page sections and static copy
│   ├── scripts/
│   │   ├── main.js              # Application entry point
│   │   ├── data/                # Profile, projects, and playground content
│   │   ├── components/          # Repeated card markup
│   │   ├── features/            # Navigation, motion, dialogs, cursor, etc.
│   │   └── utils/               # Shared helpers
│   └── styles/                  # Formatted CSS, separated by responsibility
│       ├── main.css             # Ordered style entry point
│       ├── sections/            # Page-section styles
│       ├── components/          # Cards and dialogs
│       └── responsive.css       # Breakpoints and reduced-motion fallback
├── public/assets/
│   ├── fonts/                   # Existing reference typography
│   └── images/                  # Add your photos and project covers here
├── scripts/                     # Build, dev server, and source checks
├── tests/                       # Portable browser checks
├── docs/                        # Editing guide, architecture, font sources
├── .openai/hosting.json          # Existing Sites identity/configuration
├── package.json
├── package-lock.json
└── dist/                        # Generated output; do not edit
```

Start personalization in `src/scripts/data/profile.js` and `src/scripts/data/projects.js`. See [the content guide](docs/CONTENT.md) for image paths and the rest of the editable content.

## Commands

| Command                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Build, watch source changes, and serve locally |
| `npm run build`        | Generate `dist/` for deployment                |
| `npm run preview`      | Serve the current build without watching       |
| `npm run check`        | Check JavaScript syntax and relative imports   |
| `npm test`             | Build and run browser checks                   |
| `npm run format`       | Format source and documentation                |
| `npm run format:check` | Verify formatting                              |

Browser checks use installed Microsoft Edge on Windows. On other systems, run `npx playwright install chromium` once. Set `PLAYWRIGHT_CHANNEL` to another installed Playwright browser channel when needed.

The build bundles GSAP and ScrollTrigger locally with esbuild. Run `npm ci` before building. The published output is static and needs no package installation or external animation CDN at runtime.

## Further details

- [Adding your content](docs/CONTENT.md)
- [Architecture and behavior](docs/ARCHITECTURE.md)
- [Motion design and tuning](docs/MOTION.md)
- [Font sources](docs/FONT-SOURCES.md)

Research remains in the sibling `reference-analysis/` directory. Temporary verification output and historical check scripts live in ignored `artifacts/` and do not ship with the site.
