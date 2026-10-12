import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export function animateTypography({ desktop, intro }) {
  // SplitText owns responsive re-splitting, accessible labels, and restoration on pause.
  if (intro) {
    SplitText.create('#hero-name', {
      type: 'lines,chars',
      mask: 'lines',
      autoSplit: true,
      linesClass: 'type-line',
      charsClass: 'type-char',
      onSplit: (split) =>
        gsap.from(split.chars, {
          yPercent: 115,
          rotationX: -45,
          transformOrigin: '50% 100%',
          opacity: 0,
          duration: 1.05,
          stagger: 0.045,
          delay: 0.25,
          ease: 'power4.out',
        }),
    });
    gsap.from('.scribble', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.75,
      delay: 0.45,
      ease: 'power3.inOut',
    });
  }

  document
    .querySelectorAll(
      '.section-heading h2, .playground-head h2, .journal-heading h2, .contact-intro h2',
    )
    .forEach((heading) => {
      const alreadyPassed = heading.getBoundingClientRect().bottom < 0;
      if (alreadyPassed) return;
      SplitText.create(heading, {
        type: 'lines,words,chars',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'type-line',
        charsClass: 'type-char',
        onSplit: (split) =>
          gsap.from(split.chars, {
            yPercent: 110,
            rotationX: -35,
            opacity: 0,
            transformOrigin: '50% 100%',
            stagger: { amount: 0.28 },
            duration: 0.95,
            ease: 'power4.out',
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          }),
      });
    });

  const about = document.querySelector('.about-statement');
  SplitText.create(about, {
    type: 'words',
    wordsClass: 'reading-word',
    ignore: '.inline-tile, .inline-flower',
    onSplit: (split) =>
      gsap.from(split.words, {
        opacity: desktop ? 0.22 : 0,
        y: desktop ? 0 : 12,
        stagger: 0.08,
        duration: 0.6,
        ease: desktop ? 'none' : 'power3.out',
        scrollTrigger: desktop
          ? { trigger: about, start: 'top 85%', end: 'bottom 58%', scrub: 0.45 }
          : { trigger: about, start: 'top 90%', once: true },
      }),
  });
}
