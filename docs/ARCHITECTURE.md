# Architecture

This is a static site using native browser ES modules. There is no client framework or production package dependency.

## Runtime

`src/index.html` is the page shell. It loads `src/scripts/main.js`, which renders project and playground cards, applies the profile, and initializes each interaction once.

- `data/` exports editable content records. It does not access the DOM.
- `components/` renders the repeated project and playground markup.
- `features/` owns page behavior: profile binding, clock, navigation, motion, project stacking, dialogs, and pointer effects.
- `utils/` contains shared helpers.

The motion module returns an `isPaused()` controller to the cursor module. This replaces the previous implicit shared variable. The portfolio no longer depends on a global `window.PORTFOLIO` object.

## Styles

`src/styles/main.css` lists imports in cascade order. Foundations and section styles come first, followed by repeated components, motion, cursor behavior, and responsive overrides. The build concatenates these imports in the same order into `dist/styles/main.css` to avoid a cascade of CSS network requests.

The project stack uses a flex-column gap rather than card bottom margins. A final spacer gives the fourth card enough scroll distance to align with the other tabs. Mobile keeps the non-sticky card layout and hides that spacer.

## Assets and generated files

`public/` contains files copied unchanged into `dist/`. Fonts live in `public/assets/fonts/`; photographs and project covers belong in `public/assets/images/`.

`scripts/build.mjs` recreates only the fixed `dist/` directory after checking its resolved path. `dist/`, `artifacts/`, dependency folders, and browser-test output are ignored by Git. Source and `package-lock.json` are tracked.

The existing `.openai/hosting.json` retains the Site identity and points to `dist/`. Always build before deployment. Source synchronization and publishing use the installed Sites workflow; no credentials are stored in this project.

## Development and verification

The build and local HTTP server use only Node's standard library. The dev command watches `src/` and `public/`, rebuilds on change, and asks you to refresh the browser.

Prettier enforces consistent formatting. Playwright exercises the actual browser behavior, including project-tab alignment at three desktop sizes, dialogs, mobile navigation, local font loading, and reduced-motion/pointer interactions.

Historical one-off checks are preserved under ignored `artifacts/legacy-checks/` for reference. They are superseded by `tests/portfolio.spec.js` and are not part of the supported workflow.
