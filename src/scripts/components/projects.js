export function renderProjects(projects) {
  const stack = document.querySelector('#project-stack');
  stack.innerHTML = projects
    .map(
      (x, i) =>
        `<article class="project" style="--index:${i};--project-color:var(--${x.theme})">
<div class="folder-tab">
<span data-icon="folder"></span> PROJECT 0${i + 1}</div>
<div class="project-body">
<div class="project-copy">
<span class="mono">0${i + 1} / SELECTED WORK</span>
<h3>${x.title}</h3>
<p>${x.description}</p>
<button class="project-link" data-project="${i}">EXPLORE PROJECT</button>
<div class="project-tags">${x.tags.map((t) => `<span>${t}</span>`).join('')}</div>
</div>
<button class="project-art art-${i} selected" data-project="${i}" aria-label="Open ${x.title}">
<span class="art-category mono">${x.category}</span>
<span class="art-number">0${i + 1}</span>
<span class="art-word">${['YOUR<br>WORK.', 'A NEW<br>POINT<br>OF VIEW.', 'GOOD<br>THINGS<br>TAKE SHAPE.', 'MAKE<br>SOME<br>NOISE.'][i]}</span>
<span class="art-foot mono">PROJECT CANVAS / 0${i + 1}</span>
<i>
</i>
<i>
</i>
<i>
</i>
<i>
</i>
</button>
</div>
</article>`,
    )
    .join('');
  projects.forEach((x, i) => {
    if (x.cover) {
      const el = document.querySelector(`.art-${i}`);
      const img = new Image();
      img.src = x.cover;
      img.alt = x.title;
      el.prepend(img);
      el.classList.add('has-cover');
    }
  });
}
