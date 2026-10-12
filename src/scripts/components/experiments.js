import { experiments } from '../data/experiments.js';
import { escapeHtml } from '../utils/html.js';

const artwork = {
  one: '<span class="type-sample">Aa</span>',
  two: '<b data-icon="spark"></b>',
  three: `<span class="color-grid">${'<i></i>'.repeat(9)}</span>`,
  four: '<span class="play-type">WHAT<br>IF...?</span>',
};

export function renderExperiments() {
  document.querySelector('#experiment-grid').innerHTML = experiments
    .map(
      (experiment, index) => `
      <button class="experiment" data-experiment="${index}">
        <span class="experiment-tab">${escapeHtml(experiment.label)}</span>
        <span class="experiment-surface experiment-${experiment.artwork}">${artwork[experiment.artwork]}</span>
        <h3>${escapeHtml(experiment.title)}</h3>
        <p>${escapeHtml(experiment.category)}</p>
      </button>
    `,
    )
    .join('');
}
