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
<div class="detail-meta">
<div>
<span>ROLE</span>
<b>Your role</b>
</div>
<div>
<span>TIMELINE</span>
<b>Project duration</b>
</div>
<div>
<span>DELIVERABLE</span>
<b>${safe(x.category.toLowerCase())}</b>
</div>
</div>
<div class="detail-placeholder">YOUR PROJECT IMAGE OR FILM</div>
<div class="detail-outline">
<section>
<span class="mono">01 / CONTEXT</span>
<h3>The challenge</h3>
<p>Your project’s starting point: who it was for, what needed to change, and why it mattered.</p>
</section>
<section>
<span class="mono">02 / EXPLORATION</span>
<h3>The process</h3>
<p>Your research, early ideas, and the decisions that shaped the direction.</p>
</section>
<section>
<span class="mono">03 / EXECUTION</span>
<h3>The outcome</h3>
<p>The final experience, the details you cared about, and what you delivered.</p>
</section>
<section>
<span class="mono">04 / REFLECTION</span>
<h3>What I learned</h3>
<p>The results, discoveries, and things you would take into your next project.</p>
</section>
</div>`,
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
