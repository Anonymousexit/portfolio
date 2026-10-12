import { gsap } from 'gsap';

export function animateHovers() {
  const events = new AbortController();
  document.querySelectorAll('.action, .project-art, .polaroid').forEach((element) => {
    const target = element.querySelector('.action-icon, .art-word, .photo-slot');
    const tween = gsap.to(target, {
      rotation: element.matches('.action') ? 90 : 0,
      y: element.matches('.project-art') ? -8 : 0,
      scale: element.matches('.polaroid') ? 1.04 : 1,
      duration: 0.4,
      ease: 'power2.out',
      paused: true,
    });
    ['pointerenter', 'focusin'].forEach((event) =>
      element.addEventListener(event, () => tween.play(), { signal: events.signal }),
    );
    ['pointerleave', 'focusout'].forEach((event) =>
      element.addEventListener(event, () => tween.reverse(), { signal: events.signal }),
    );
  });
  return () => events.abort();
}
