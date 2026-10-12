import { gsap } from 'gsap';

export function animateArtwork() {
  const events = new AbortController();
  document.querySelectorAll('.project-art, .experiment-surface').forEach((artwork) => {
    const hitArea = artwork.closest('.experiment') || artwork;
    let bounds;
    gsap.set(artwork, { transformPerspective: 1100, transformOrigin: '50% 50%' });
    const tiltX = gsap.quickTo(artwork, 'rotationX', { duration: 0.65, ease: 'power3.out' });
    const tiltY = gsap.quickTo(artwork, 'rotationY', { duration: 0.65, ease: 'power3.out' });
    hitArea.addEventListener(
      'pointerenter',
      () => {
        bounds = hitArea.getBoundingClientRect();
      },
      { signal: events.signal },
    );
    hitArea.addEventListener(
      'pointermove',
      (event) => {
        if (!bounds || event.pointerType === 'touch') return;
        const x = gsap.utils.clamp(-0.5, 0.5, (event.clientX - bounds.left) / bounds.width - 0.5);
        const y = gsap.utils.clamp(-0.5, 0.5, (event.clientY - bounds.top) / bounds.height - 0.5);
        tiltX(-y * 5);
        tiltY(x * 6);
      },
      { signal: events.signal },
    );
    const reset = () => {
      if (!bounds) return;
      bounds = null;
      tiltX(0);
      tiltY(0);
    };
    hitArea.addEventListener('pointerleave', reset, { signal: events.signal });
    document.addEventListener('scroll', reset, { passive: true, signal: events.signal });
  });
  return () => events.abort();
}
