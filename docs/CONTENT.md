# Adding your content

Edit source files, then run `npm run build` (or keep `npm run dev` running). Do not edit `dist`: it is generated and replaced by the build.

| What to change                                                   | Source                            |
| ---------------------------------------------------------------- | --------------------------------- |
| Name, initials, role, availability, email, social links          | `src/scripts/data/profile.js`     |
| Project titles, descriptions, tags, categories, and cover images | `src/scripts/data/projects.js`    |
| Playground labels, titles, and categories                        | `src/scripts/data/experiments.js` |
| Hero statement, biography, skills, notes, footer copy            | `src/index.html`                  |
| Case-study outline and dialog copy                               | `src/scripts/features/dialogs.js` |
| Colors and type scale foundations                                | `src/styles/base.css`             |
| Desktop and mobile layout overrides                              | `src/styles/responsive.css`       |

Put your photographs and project images in `public/assets/images/`. Reference them from data using paths such as `assets/images/portrait.jpg` or `assets/images/project-01.webp`. Public files are copied to the root of the built site.

Example profile fields:

```js
portrait: 'assets/images/portrait.jpg',
workspace: 'assets/images/workspace.jpg',
```

Each project's `cover` works the same way. Empty image fields keep the designed placeholders. Empty email and social fields show the existing contact placeholder rather than a fake submission. Use complete `https://` URLs for social links.

The current layout is designed around four featured projects. Replacing these records needs no layout changes; adding more also requires extending the desktop folder-tab layout and artwork themes.
