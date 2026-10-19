// One geometry system, independent of the visitor's installed fonts.
const shapes = {
  code: '<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="miter"><path class="code-left" d="m7 6-5 6 5 6"/><path class="code-right" d="m17 6 5 6-5 6"/><path d="m14 3-4 18"/></g>',
  home: '<path d="m3 10 9-8 9 8v11h-6v-7H9v7H3Z"/>',
  spark: '<path d="M10 2h4v6l4-4 3 3-5 5 5 5-3 3-4-4v6h-4v-6l-4 4-3-3 5-5-5-5 3-3 4 4Z"/>',
  folder: '<path d="M2 5h8l2 3h10v13H2Z"/><path d="M3 3h8l2 3h8v1H12L10 4H3Z"/>',
  steps: '<path d="M2 15h6V9h6V3h8v19H2Z"/>',
  note: '<rect x="4" y="2" width="16" height="20" rx="3"/><path d="M8 7h8M8 11h8M8 15h5" fill="none" stroke="var(--icon-paper, white)" stroke-width="2"/>',
  heart: '<path d="M12 21 3.5 13C-3 6 6 0 12 6 18 0 27 6 20.5 13Z"/>',
  pause:
    '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  play: '<path d="m7 3 15 9-15 9Z"/>',
  close:
    '<path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  arrow:
    '<path class="icon-chevron" d="m4 6 8 6-8 6v-5l3-1-3-1Z"/><path class="icon-chevron" d="m12 6 8 6-8 6v-5l3-1-3-1Z"/>',
  pointer:
    '<path d="m3 3 18 7-8 3-3 8Z" fill="var(--pointer-fill)" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  target:
    '<g fill="none" stroke="currentColor" stroke-width="1.8"><circle class="icon-ring" cx="12" cy="12" r="10"/><circle class="icon-ring" cx="12" cy="12" r="6.5"/></g><circle class="icon-core" cx="12" cy="12" r="3"/>',
  flower:
    '<g class="icon-petals"><ellipse cx="12" cy="5.5" rx="3" ry="4.5"/><ellipse cx="12" cy="18.5" rx="3" ry="4.5"/><ellipse cx="5.5" cy="12" rx="4.5" ry="3"/><ellipse cx="18.5" cy="12" rx="4.5" ry="3"/></g><circle cx="12" cy="12" r="2"/>',
  diamond:
    '<g class="icon-diamonds"><path d="m12 1 5 5-5 5-5-5ZM23 12l-5 5-5-5 5-5ZM12 23l-5-5 5-5 5 5ZM1 12l5-5 5 5-5 5Z"/></g>',
  eye: '<g class="icon-lid"><path d="M1 12Q12-2 23 12 12 26 1 12Z"/><circle class="icon-pupil" cx="12" cy="12" r="5" fill="var(--pink)"/><circle cx="13" cy="10.5" r="1.4" fill="var(--yellow)"/></g>',
  dots: '<circle class="icon-dot" cx="6" cy="4" r="2.5"/><circle class="icon-dot" cx="17" cy="4" r="1.5"/><circle class="icon-dot" cx="6" cy="12" r="1.5"/><circle class="icon-dot" cx="17" cy="12" r="2.5"/><circle class="icon-dot" cx="6" cy="20" r="2.5"/><circle class="icon-dot" cx="17" cy="20" r="1.5"/>',
};

export function icon(name) {
  if (!Object.hasOwn(shapes, name)) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${shapes[name]}</svg>`;
}

export function renderIcons() {
  document.querySelectorAll('[data-icon]').forEach((element) => {
    element.setAttribute('aria-hidden', 'true');
    element.innerHTML = icon(element.dataset.icon);
  });
}
