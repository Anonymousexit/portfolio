export function initProjectStack() {
  const cards = [...document.querySelectorAll('.project')];
  let queued = false;
  function updateStack() {
    queued = false;
    if (innerWidth <= 760) return;
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      card.classList.toggle(
        'is-covered',
        !!next && next.getBoundingClientRect().top < innerHeight * 0.68,
      );
    });
  }
  addEventListener(
    'scroll',
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(updateStack);
      }
    },
    { passive: true },
  );
  updateStack();
}
