export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduce.matches;
  const toggle = document.querySelector('.motion-toggle');
  function syncMotion() {
    document.documentElement.classList.toggle('motion-paused', paused);
    toggle.textContent = paused ? '▷' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
    toggle.title = paused ? 'Resume animations' : 'Pause animations';
    toggle.setAttribute('aria-pressed', String(paused));
  }
  syncMotion();
  toggle.addEventListener('click', () => {
    paused = !paused;
    syncMotion();
  });
  reduce.addEventListener('change', (e) => {
    paused = e.matches;
    syncMotion();
  });
  if (!reduce.matches) document.body.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  return { isPaused: () => paused };
}
