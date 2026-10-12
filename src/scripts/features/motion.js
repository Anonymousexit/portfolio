import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHero } from './motion/hero.js';
import { animateSections } from './motion/sections.js';
import { animateContact } from './motion/contact.js';
import { animateHovers } from './motion/hovers.js';
import { initProjectStack } from './project-stack.js';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  let paused = preference.matches;
  let media;
  let introPlayed = false;

  function syncMotion() {
    // Revert only this feature's animations. A pause must also reveal hidden content.
    media?.revert();
    document.documentElement.classList.toggle('motion-paused', paused);
    document.body.classList.toggle('gsap-ready', !paused);
    toggle.textContent = paused ? '▷' : 'Ⅱ';
    toggle.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
    toggle.title = paused ? 'Resume animations' : 'Pause animations';
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) return;

    media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 761px)', mobile: '(max-width: 760px)' }, (context) => {
      const { desktop } = context.conditions;
      const cleanups = [
        animateHero({ desktop, intro: !introPlayed && scrollY < 80 }),
        animateSections({ desktop }),
        animateContact(),
        animateHovers(),
      ];
      if (desktop) initProjectStack();
      introPlayed = true;
      return () => cleanups.forEach((cleanup) => cleanup?.());
    });
    ScrollTrigger.refresh();
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    syncMotion();
  });
  preference.addEventListener('change', (event) => {
    paused = event.matches;
    syncMotion();
  });
  syncMotion();
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
