import { gsap } from 'gsap';
import { loopInView } from './loop.js';

export function animateHero({ desktop, intro }) {
  if (intro) {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-intro', { autoAlpha: 0, y: 18, duration: 0.55 })
      .from('.name-wrap', { autoAlpha: 0, duration: 0.4 }, 0.12)
      .from('.name-wrap > i', { scale: 0, stagger: 0.06, ease: 'back.out(2)', duration: 0.35 }, 0.4)
      .from(
        '.mini-reel, .ribbon, .avatar',
        { autoAlpha: 0, y: 22, stagger: 0.07, duration: 0.75 },
        0.25,
      )
      .from(
        '.availability, .hero-bottom',
        { autoAlpha: 0, y: 16, stagger: 0.12, duration: 0.7 },
        0.48,
      )
      .from(
        '.sticker',
        { autoAlpha: 0, scale: 0.7, stagger: 0.12, duration: 0.65, ease: 'back.out(1.8)' },
        0.65,
      );
  }

  const drift = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });
  const distance = desktop ? 1 : 0.2;
  drift
    .to('.sticker-yellow', { x: 65 * distance, y: -22, rotation: -5, duration: 3.5 }, 0)
    .to('.sticker-yellow', { x: -35 * distance, y: 14, rotation: 9, duration: 4 }, 3.5)
    .to('.sticker-yellow', { x: 0, y: 0, rotation: 17, duration: 4.5 }, 7.5)
    .to('.sticker-pink', { x: -76 * distance, y: -40 * distance, rotation: 13, duration: 4 }, 0)
    .to('.sticker-pink', { x: 25 * distance, y: 14, rotation: -13, duration: 4.5 }, 4)
    .to('.sticker-pink', { x: 0, y: 0, rotation: -8, duration: 3.5 }, 8.5);

  const scenes = gsap.utils.toArray('.reel-scene');
  gsap.set(scenes, { autoAlpha: 0 });
  gsap.set(scenes[0], { autoAlpha: 1 });
  const reel = gsap.timeline({ repeat: -1 });
  for (let i = 1; i <= scenes.length; i++) {
    reel.to(scenes[i - 1], { autoAlpha: 0, duration: 0.5 }, i * 3);
    reel.fromTo(
      scenes[i % scenes.length],
      { autoAlpha: 0, scale: 1.08 },
      { autoAlpha: 1, scale: 1, duration: 0.65, ease: 'power2.out', immediateRender: false },
      i * 3,
    );
  }
  const cleanup = [loopInView(drift, '.hero'), loopInView(reel, '.hero')];
  return () => cleanup.forEach((fn) => fn());
}
