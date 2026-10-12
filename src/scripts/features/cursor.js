export function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');

  function updatePointer(event) {
    if (!pointer.matches || event.pointerType === 'touch') return;
    cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    cursor.classList.add('active');
    cursor.classList.toggle('hover', !!event.target.closest('a,button'));
  }

  const reset = () => cursor.classList.remove('active');
  document.addEventListener('pointerover', updatePointer);
  document.addEventListener('pointermove', updatePointer);
  document.addEventListener('pointerleave', reset);
  document.addEventListener('pointercancel', reset);
  addEventListener('blur', reset);
  pointer.addEventListener('change', reset);
}
