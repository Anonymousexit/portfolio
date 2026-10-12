import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ambient timelines run only while their section and the browser tab are visible.
export function loopInView(animation, element) {
  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => animation.paused(!self.isActive || document.hidden),
  });
  const sync = () => animation.paused(!trigger.isActive || document.hidden);
  sync();
  document.addEventListener('visibilitychange', sync);
  return () => document.removeEventListener('visibilitychange', sync);
}
