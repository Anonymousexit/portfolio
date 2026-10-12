import { gsap } from 'gsap';

export function animateSections({ desktop }) {
  gsap.utils
    .toArray(
      '.section-heading > .hand, .sticky-note, .playground-head p, .journal-heading > .mono, .note-row',
    )
    .forEach((element) => {
      if (element.getBoundingClientRect().top < innerHeight * 0.9) return;
      gsap.from(element, {
        autoAlpha: 0,
        y: 36,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      });
    });
  gsap.from('.skills > *', {
    y: 24,
    autoAlpha: 0,
    scale: 0.94,
    stagger: 0.065,
    duration: 0.65,
    ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.skills', start: 'top 92%', once: true },
  });
  gsap.utils.toArray('.experiment').forEach((element) => {
    gsap.from(element, {
      y: 42,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 94%', once: true },
    });
  });
  if (!desktop) return;
  gsap.to('.about-curve path', {
    attr: { d: 'M-20 70 Q650 5 1460 105' },
    ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'top 10%', scrub: 0.6 },
  });
  gsap.from('.portrait', {
    x: -25,
    y: 55,
    rotation: 19,
    ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'center center', scrub: 0.6 },
  });
  gsap.from('.workspace', {
    x: 25,
    y: 75,
    rotation: -20,
    ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'center center', scrub: 0.6 },
  });
  gsap.from('.little-selection', {
    rotation: -5,
    ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'top 10%', scrub: 0.6 },
  });
}
