import { gsap } from 'gsap';
import { loopInView } from './loop.js';

export function animateIcons() {
  const cleanups = [];
  const events = new AbortController();
  const center = { transformOrigin: '50% 50%' };

  // Animate child geometry, leaving layout, entrance, and hover transforms independent.
  document
    .querySelectorAll(
      '.target-mark, .flower, .inline-flower, .inline-tile, .skill-symbol, .contact-label [data-icon]',
    )
    .forEach((host, index) => {
      const svg = host.querySelector('.icon');
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.8 + (index % 3) * 0.4 });
      const name = host.dataset.icon;
      if (name === 'target') {
        loop
          .to(svg.querySelectorAll('.icon-ring'), {
            ...center,
            scale: 0.87,
            opacity: 0.45,
            duration: 0.7,
            stagger: 0.18,
            ease: 'sine.inOut',
          })
          .to(svg.querySelectorAll('.icon-ring'), {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            stagger: 0.18,
            ease: 'sine.inOut',
          });
      } else if (name === 'code') {
        loop
          .to(svg.querySelector('.code-left'), { x: 1.5, duration: 0.65, ease: 'sine.inOut' })
          .to(svg.querySelector('.code-right'), { x: -1.5, duration: 0.65, ease: 'sine.inOut' }, 0)
          .to(svg.querySelectorAll('.code-left, .code-right'), {
            x: 0,
            duration: 0.65,
            ease: 'sine.inOut',
          });
      } else if (name === 'eye') {
        loop
          .to(svg.querySelector('.icon-pupil'), { x: 1.7, duration: 0.6, ease: 'sine.inOut' })
          .to(svg.querySelector('.icon-pupil'), { x: 0, duration: 0.6 }, '+=0.7')
          .to(svg.querySelector('.icon-lid'), { ...center, scaleY: 0.08, duration: 0.1 }, '+=0.3')
          .to(svg.querySelector('.icon-lid'), { scaleY: 1, duration: 0.18 });
      } else if (name === 'dots') {
        loop
          .to(svg.querySelectorAll('.icon-dot'), {
            ...center,
            scale: 0.5,
            y: -1,
            duration: 0.35,
            stagger: 0.12,
            ease: 'sine.inOut',
          })
          .to(
            svg.querySelectorAll('.icon-dot'),
            { scale: 1, y: 0, duration: 0.4, stagger: 0.12, ease: 'sine.inOut' },
            0.65,
          );
      } else {
        loop.to(svg, {
          rotation: name === 'diamond' ? 90 : 180,
          duration: 2.2,
          ease: 'power2.inOut',
          ...center,
        });
      }
      cleanups.push(loopInView(loop, host));
    });

  // Large experiment art uses the same geometry, with a deliberately slower cadence.
  document.querySelectorAll('.experiment-two .icon').forEach((svg) => {
    cleanups.push(
      loopInView(
        gsap.to(svg, { rotation: 360, duration: 24, repeat: -1, ease: 'none', ...center }),
        svg,
      ),
    );
  });

  document
    .querySelectorAll('.topbar nav a, .brand, .contact-small, .action, .dialog-close')
    .forEach((control) => {
      const svg = control.querySelector('.icon');
      if (!svg) return;
      const motion = gsap.timeline({ paused: true });
      if (svg.matches('.icon-arrow')) {
        motion
          .to(svg.querySelectorAll('.icon-chevron'), {
            x: 2.5,
            duration: 0.22,
            stagger: 0.07,
            ease: 'power2.out',
          })
          .to(svg.querySelectorAll('.icon-chevron'), {
            x: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: 'power2.inOut',
          });
      } else if (svg.matches('.icon-dots')) {
        motion
          .to(svg.children, { y: -3, duration: 0.22, stagger: 0.06, ease: 'power2.out' })
          .to(svg.children, { y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.inOut' }, 0.35);
      } else if (svg.matches('.icon-heart')) {
        motion
          .to(svg, { ...center, scale: 1.18, duration: 0.18 })
          .to(svg, { scale: 1, duration: 0.18 })
          .to(svg, { scale: 1.12, duration: 0.16 })
          .to(svg, { scale: 1, duration: 0.3 });
      } else {
        motion
          .to(svg, {
            ...center,
            rotation: svg.matches('.icon-spark, .icon-close') ? 90 : -10,
            y: -2,
            duration: 0.28,
            ease: 'power2.out',
          })
          .to(svg, { rotation: 0, y: 0, duration: 0.5, ease: 'back.out(1.5)' });
      }
      ['pointerenter', 'focusin'].forEach((event) =>
        control.addEventListener(event, () => motion.restart(), { signal: events.signal }),
      );
    });

  return () => {
    events.abort();
    cleanups.forEach((cleanup) => cleanup());
  };
}
