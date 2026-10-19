import { escapeHtml as safe } from '../utils/html.js';
export function applyProfile(profile) {
  document.querySelector('#hero-name').textContent = profile.name;
  document.title = `${profile.name} — Creative Portfolio`;
  document.querySelector('footer>.mono').innerHTML =
    `${safe(profile.name)} © <span id="year">${new Date().getFullYear()}</span>`;
  document.querySelectorAll('.avatar').forEach((a) => (a.textContent = profile.initials));
  document.querySelectorAll('[data-social]').forEach((element) => {
    const key = element.dataset.social;
    const value = profile[key];
    if (!value) return;
    const link = document.createElement('a');
    link.dataset.social = key;
    link.textContent = element.textContent;
    link.href = key === 'email' ? `mailto:${value}` : value;
    if (key !== 'email') {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    element.replaceWith(link);
  });
  document
    .querySelectorAll('[data-copy]')
    .forEach((el) => (el.textContent = profile[el.dataset.copy]));
  for (const key of ['portrait', 'workspace']) {
    if (profile[key]) {
      const img = new Image();
      img.src = profile[key];
      img.alt = key === 'portrait' ? `${profile.name}, portrait` : 'My workspace';
      document.querySelector(`[data-image="${key}"]`).replaceChildren(img);
    }
  }
}
