import { escapeHtml as safe } from '../utils/html.js';

export function renderProjects(projects) {
  document.querySelector('#project-stack').innerHTML = projects
    .map((project, index) => {
      const live = /^https:\/\//.test(project.url || '');
      const tag = live ? 'a' : 'button';
      const attributes = live
        ? `href="${safe(project.url)}" target="_blank" rel="noopener noreferrer"`
        : `type="button" data-project="${index}"`;
      const label = live ? `Visit ${project.title} (opens in a new tab)` : 'About the next project';
      const preview = live
        ? `<span class="project-preview"><span class="preview-toolbar" aria-hidden="true"><span>● ● ●</span><span>${safe(new URL(project.url).hostname)}</span><span>↗</span></span><img src="${safe(project.cover)}" alt="${safe(project.title)} homepage" loading="lazy" decoding="async" width="1350" height="680" /></span>`
        : `<img class="progress-art" src="${safe(project.cover)}" alt="Still in progress. Good things take shape." loading="lazy" width="720" height="540" />`;
      return `<article class="project" style="--index:${index};--project-color:var(--${project.theme})">
      <div class="folder-tab"><span data-icon="folder"></span> PROJECT 0${index + 1}</div>
      <div class="project-body">
        <div class="project-copy">
          <span class="mono">0${index + 1} / ${live ? 'SELECTED WORK' : 'ON THE DRAWING BOARD'}</span>
          <h3>${safe(project.title)}</h3>
          <p>${safe(project.description)}</p>
          <${tag} class="project-link" ${attributes} ${live ? `aria-label="${safe(label)}"` : ''}>${live ? 'VISIT LIVE SITE ↗' : 'WHAT’S NEXT?'}</${tag}>
          <div class="project-tags">${project.tags.map((item) => `<span>${safe(item)}</span>`).join('')}</div>
        </div>
        <${tag} class="project-art art-${index} selected ${live ? 'has-preview' : 'is-progress'}" ${attributes} aria-label="${safe(label)}">
          ${live ? `<span class="art-category mono">${safe(project.category)}</span>` : ''}
          ${preview}
          ${live ? '<span class="art-foot mono">DESIGNED & BUILT BY JEREMIAH BWALA</span>' : ''}
          <i></i><i></i><i></i><i></i>
        </${tag}>
      </div>
    </article>`;
    })
    .join('');
}
