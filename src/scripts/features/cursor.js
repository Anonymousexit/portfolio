import { gsap } from 'gsap';

export function initCursor(motion) {
  const cursor = document.querySelector('.custom-cursor');
  const lens = document.querySelector('.selection-lens');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const moveX = gsap.quickTo(lens, 'x', { duration: 0.18, ease: 'power3.out' });
  const moveY = gsap.quickTo(lens, 'y', { duration: 0.18, ease: 'power3.out' });

  function hideLens() {
    lens.classList.remove('active');
    moveX.tween.pause();
    moveY.tween.pause();
  }

  function updatePointer(event) {
    if (!pointer.matches || event.pointerType === 'touch') return;
    cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    cursor.classList.add('active');
    cursor.classList.toggle('hover', !!event.target.closest('a,button'));
    const target = event.target.closest('[data-invert-hover]');
    if (!target || motion.isPaused()) {
      hideLens();
      return;
    }

    // The selection-shaped cursor trails above and left of the pointer, as in the reference.
    const size = Math.min(340, Math.max(180, innerWidth * 0.245));
    const x = event.clientX - size;
    const y = event.clientY - size;
    lens.style.width = lens.style.height = `${size}px`;
    if (!lens.classList.contains('active')) {
      gsap.set(lens, { x, y });
      lens.classList.add('active');
    } else {
      moveX(x);
      moveY(y);
    }
  }

  function reset() {
    hideLens();
    cursor.classList.remove('active');
  }
  document.addEventListener('pointerover', updatePointer);
  document.addEventListener('pointermove', updatePointer);
  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget?.closest?.('[data-invert-hover]')) hideLens();
  });
  document.addEventListener('pointerleave', reset);
  document.addEventListener('pointercancel', reset);
  document.addEventListener('scroll', hideLens, { passive: true, capture: true });
  addEventListener('resize', hideLens);
  addEventListener('blur', reset);
  pointer.addEventListener('change', reset);
}
