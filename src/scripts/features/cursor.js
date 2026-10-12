export function initCursor(motion) {
  const cursor = document.querySelector('.custom-cursor'),
    lens = document.querySelector('.selection-lens');
  let drag = null;
  if (matchMedia('(pointer:fine)').matches) {
    document.addEventListener('pointermove', (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      cursor.classList.add('active');
      cursor.classList.toggle('hover', !!e.target.closest('a,button'));
      if (drag) {
        const w = Math.max(4, Math.abs(e.clientX - drag.x)),
          h = Math.max(4, Math.abs(e.clientY - drag.y));
        Object.assign(lens.style, {
          left: Math.min(e.clientX, drag.x) + 'px',
          top: Math.min(e.clientY, drag.y) + 'px',
          width: w + 'px',
          height: h + 'px',
        });
        lens.classList.add('active');
      }
    });
    document.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || motion.isPaused() || e.target.closest('button,a,dialog,input,textarea'))
        return;
      drag = { x: e.clientX, y: e.clientY };
      document.body.style.userSelect = 'none';
    });
    function endDrag() {
      drag = null;
      lens.classList.remove('active');
      document.body.style.userSelect = '';
    }
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
    addEventListener('blur', endDrag);
    document.addEventListener('pointerleave', () => {
      cursor.classList.remove('active');
      endDrag();
    });
  }
}
