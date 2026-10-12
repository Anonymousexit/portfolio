export function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  let frame = 0;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let lastTime = 0;

  function draw(time) {
    const immediate = reduced.matches || root.classList.contains('motion-paused');
    const delta = Math.min(time - lastTime || 16, 50);
    const blend = immediate ? 1 : 1 - Math.exp(-delta / 38);
    lastTime = time;
    x += (targetX - x) * blend;
    y += (targetY - y) * blend;
    const settled = Math.hypot(targetX - x, targetY - y) < 0.1;
    if (settled) {
      x = targetX;
      y = targetY;
    }
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    frame = settled ? 0 : requestAnimationFrame(draw);
  }

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    cursor.classList.remove('active', 'hover', 'pressed');
    root.classList.remove('cursor-ready');
  }

  function updatePointer(event) {
    // Native cursors remain available on touch and in top-layer modal dialogs.
    if (
      !pointer.matches ||
      event.pointerType === 'touch' ||
      document.querySelector('dialog[open]')
    ) {
      reset();
      return;
    }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!cursor.classList.contains('active')) {
      x = targetX;
      y = targetY;
    }
    cursor.classList.add('active');
    root.classList.add('cursor-ready');
    cursor.classList.toggle('hover', !!event.target.closest('a, button, [role="button"]'));
    if (reduced.matches || root.classList.contains('motion-paused')) {
      cancelAnimationFrame(frame);
      draw(performance.now());
    } else if (!frame) {
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    }
  }

  document.addEventListener('pointerover', updatePointer);
  document.addEventListener('pointermove', updatePointer);
  document.addEventListener('pointerdown', (event) => {
    updatePointer(event);
    if (cursor.classList.contains('active')) cursor.classList.add('pressed');
  });
  document.addEventListener('pointerup', () => cursor.classList.remove('pressed'));
  document.addEventListener('pointerleave', reset);
  document.addEventListener('pointercancel', reset);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') reset();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) reset();
  });
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('toggle', reset));
  addEventListener('blur', reset);
  pointer.addEventListener('change', reset);
}
