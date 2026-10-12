import { gsap } from 'gsap';

export function animateHovers() {
  const events = new AbortController();
  document.querySelectorAll('.action, .project-link').forEach((element) => {
    const roll = gsap.to(element.querySelectorAll('.roll-line'), {
      yPercent: -100,
      duration: 0.45,
      ease: 'power3.inOut',
      paused: true,
    });
    ['pointerenter', 'focusin'].forEach((event) =>
      element.addEventListener(event, () => roll.play(), { signal: events.signal }),
    );
    ['pointerleave', 'focusout'].forEach((event) =>
      element.addEventListener(event, () => roll.reverse(), { signal: events.signal }),
    );
  });
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
