import { gsap } from 'gsap';
import { loopInView } from './loop.js';

export function animateContact() {
  const cleanups = [];
  const events = new AbortController();
  const character = document.querySelector('.contact-character');
  gsap.set('.character-body', { svgOrigin: '160 160' });
  gsap.set('.character-eyes', { transformOrigin: '50% 50%' });
  const tumble = gsap.timeline({ repeat: -1 });
  [90, 180, 270, 360].forEach((rotation, index) => {
    tumble.to(
      '.character-body',
      { rotation, duration: 1.5, ease: 'elastic.out(1,0.65)' },
      index * 3.5 + 2,
    );
  });
  const blink = gsap
    .timeline({ repeat: -1, repeatDelay: 3.8 })
    .to('.character-eyes', { scaleY: 0.12, duration: 0.09 })
    .to('.character-eyes', { scaleY: 1, duration: 0.17 });
  cleanups.push(loopInView(tumble, character), loopInView(blink, character));

  const bob = gsap.to('.contact-label', {
    y: -16,
    rotation: 3,
    duration: 3.3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
  cleanups.push(loopInView(bob, '.contact-banner'));
  gsap.fromTo(
    '.contact-pattern g',
    { x: -55, scaleX: 1.12 },
    {
      x: 55,
      scaleX: 1.02,
      ease: 'none',
      scrollTrigger: {
        trigger: '.contact-banner',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7,
      },
    },
  );

  const hover = gsap.to('.contact-label', {
    scale: 1.045,
    duration: 0.35,
    ease: 'power2.out',
    paused: true,
  });
  const banner = document.querySelector('.contact-banner');
  ['pointerenter', 'focus'].forEach((event) =>
    banner.addEventListener(event, () => hover.play(), { signal: events.signal }),
  );
  ['pointerleave', 'blur'].forEach((event) =>
    banner.addEventListener(event, () => hover.reverse(), { signal: events.signal }),
  );
  return () => {
    events.abort();
    cleanups.forEach((fn) => fn());
  };
}
