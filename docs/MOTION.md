# Motion design

The October 12 reference recording runs for approximately 115 seconds at 1350 × 680. The template keeps the existing local Flux, Inter, Inter Display, DM Mono, and handwritten fonts, with replaceable personal content.

## Observations and implementation

| Recording                                                                            | Template behavior                                                                                                         | Source                                                                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 0–48s: hero reel cycles, colored labels travel and rotate                            | GSAP crossfades the three placeholder scenes; each sticker follows its own repeating path                                 | `src/scripts/features/motion/hero.js`                                                   |
| 49–61s: curved divider, angled selection label and polaroids, colored skills         | ScrollTrigger adjusts the curve and photograph positions; skills enter in a stagger                                       | `src/scripts/features/motion/sections.js`                                               |
| 66–79s: projects become a row of folder tabs; obscured covers gain diagonal hatching | Native sticky positioning preserves alignment; GSAP fades covered copy and reveals the hatch overlay                      | `src/scripts/features/project-stack.js`                                                 |
| 83–96s: centered experimental work heading and folder-framed cards                   | Centered Flux heading, paper note, staggered card entrances and selection-frame hover states                              | `src/styles/sections/playground-heading.css`, `src/scripts/features/motion/sections.js` |
| 98–104s: green four-lobed character rotates; a dragged rectangle inverts its colors  | Original SVG character with GSAP quarter turns and blinking; existing canvas selection inverts the artwork under the drag | `src/scripts/features/motion/contact.js`, `src/scripts/features/cursor.js`              |
| 105–113s: curved diagonal contact artwork, floating cyan sign, inverted hover state  | SVG background moves with scroll; contact sign bobs, tilts, and reveals selection handles on hover or focus               | `src/scripts/features/motion/contact.js`, `src/styles/sections/contact.css`             |

The recording is the visual reference, not source animation data. Durations and easings are tuned approximations; the load entrance and blink are additions. The recording's pink character is the effect of the drag selection, rather than a separate character color state.

## Tuning

- Hero: change the x/y waypoints and durations in `hero.js`. Mobile uses smaller horizontal travel.
- Scroll entrances: adjust start positions, distance, and stagger in `sections.js`.
- Contact: adjust rotation holds, spring easing, blink, and sign movement in `contact.js`.
- SVG artwork: edit the character and patterned banner in `src/index.html`.
- Project cards: keep the sticky article itself untransformed. Animate its children. The final flex spacer provides the fourth folder's hold time.

## Accessibility and lifecycle

The navigation pause control and `prefers-reduced-motion` revert all owned GSAP effects to a readable static layout. Re-enabling motion creates a fresh context without replaying the initial hero entrance. Looping GSAP animations pause when their section leaves the viewport or the browser tab is hidden. Mobile uses normal document flow for projects. Native scrolling, keyboard focus, and dialog behavior are retained.

GSAP's context cleanup and breakpoint handling follow the [matchMedia documentation](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>). Scroll effects use [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
