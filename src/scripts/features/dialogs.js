import { experiments } from '../data/experiments.js';
import { escapeHtml as safe } from '../utils/html.js';
export function initDialogs(p) {
  const dialog = document.querySelector('#detail-dialog'),
    dc = document.querySelector('#dialog-content');
  let returnFocus = null;
  function show(content) {
    returnFocus = document.activeElement;
    dc.innerHTML = content;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    document.querySelector('.dialog-close').focus();
  }
  function close() {
    dialog.close();
  }
  document.querySelector('.dialog-close').addEventListener('click', close);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
        close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    returnFocus?.focus();
  });
  function contact() {
    if (p.email) {
      show(
        `<span class="mono">LET'S CONNECT</span>
<h2>Good things start here.</h2>
<p>Have a project in mind? I'd love to hear about it.</p>
<a class="dialog-action" href="mailto:${safe(p.email)}">${safe(p.email)}</a>`,
      );
    } else {
      show(
        `<span class="mono">CONTACT / COMING SOON</span>
<h2>Let’s make<br>something good.</h2>
<p>This space is ready for your email address and social links.</p>
<div class="contact-placeholder">YOUR CONTACT DETAILS</div>`,
      );
    }
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    if (t.hasAttribute('data-contact')) contact();
    if (t.hasAttribute('data-social')) {
      const key = t.dataset.social;
      const value = p[key];
      if (value) {
        if (key === 'email') location.href = 'mailto:' + value;
        else if (/^https?:\/\//.test(value)) window.open(value, '_blank', 'noopener,noreferrer');
      } else contact();
    }
    if (t.hasAttribute('data-project')) {
      const i = Number(t.dataset.project),
        x = p.projects[i];
      show(
        `<span class="mono">PROJECT 0${i + 1} / ${safe(x.category)}</span>
<h2>${safe(x.title)}</h2>
<p>${safe(x.description)}</p>
<img class="detail-project-image" src="${safe(x.cover)}" alt="Still in progress. Good things take shape." />`,
      );
    }
    if (t.hasAttribute('data-experiment')) {
      const x = experiments[Number(t.dataset.experiment)];
      show(
        `<span class="mono">PLAYGROUND / ${x.category}</span>
<h2>${x.title}</h2>
<p>A space for your sketches, motion tests, visual experiments, and things made just for the joy of making.</p>
<div class="detail-placeholder">YOUR EXPERIMENT GOES HERE</div>`,
      );
    }
    if (t.hasAttribute('data-note')) {
      show(
        `<span class="mono">NOTES / COMING SOON</span>
<h2>${t.dataset.note === '0' ? 'A space for your first story.' : 'The thinking behind the making.'}</h2>
<p>Your observations, process notes, and stories will live here.</p>`,
      );
    }
  });
}
