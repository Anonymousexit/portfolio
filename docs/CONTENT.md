# Adding your content

Edit source files, then run `npm run build` (or keep `npm run dev` running). Do not edit `dist`: it is generated and replaced by the build.

| What to change                                                              | Source                            |
| --------------------------------------------------------------------------- | --------------------------------- |
| Name, initials, role, availability, email, social links                     | `src/scripts/data/profile.js`     |
| Project titles, descriptions, tags, categories, cover images, and live URLs | `src/scripts/data/projects.js`    |
| Playground labels, titles, and categories                                   | `src/scripts/data/experiments.js` |
| Hero statement, biography, skills, notes, footer copy                       | `src/index.html`                  |
| Project status and dialog copy                                              | `src/scripts/features/dialogs.js` |
| Colors and type scale foundations                                           | `src/styles/base.css`             |
| Desktop and mobile layout overrides                                         | `src/styles/responsive.css`       |

Put your photographs and project images in `public/assets/images/`. Reference them from data using paths such as `assets/images/portrait.jpg` or `assets/images/project-01.webp`. Public files are copied to the root of the built site.

Example profile fields:

```js
portrait: 'assets/images/portrait.jpg',
workspace: 'assets/images/workspace.jpg',
```

Each project's `cover` works the same way. The first three projects use the supplied screenshots with a `url` pointing to the live site; both the preview and its link open a new tab. The fourth project omits `url` and uses `assets/images/still-in-progress.svg`, with a short status dialog. When it is ready, replace its cover, content, and add its live `url`.

The hero's illustrated availability badge is inline SVG in `src/index.html`, with its text supplied by the profile's `availability` field. Jeremiah Bwala's name, initials, email, LinkedIn, and Instagram are filled in. Portrait and workspace images remain empty until supplied. Empty photo fields keep the designed placeholders. Use complete `https://` URLs for social links. The footer and contact dialog use these same profile values.

The current layout is designed around four featured projects. Replacing these records needs no layout changes; adding more also requires extending the desktop folder-tab layout and artwork themes.
