import { gsap } from 'gsap';

export function initProjectStack() {
  const cards = gsap.utils.toArray('.project');
  const stack = document.querySelector('.project-stack');
  function naturalTop(index) {
    const gap = parseFloat(getComputedStyle(stack).rowGap);
    return (
      stack.getBoundingClientRect().top +
      scrollY +
      cards.slice(0, index).reduce((height, card) => height + card.offsetHeight + gap, 0)
    );
  }
  cards.slice(0, -1).forEach((card, index) => {
    // Animate children only: transforming the sticky article changes its stacking geometry.
    gsap
      .timeline({
        scrollTrigger: {
          trigger: cards[index + 1],
          // Measure the normal flow, even if a refresh happens while cards are already sticky.
          start: () => naturalTop(index + 1) - innerHeight * 0.85,
          end: () => naturalTop(index + 1) - 143,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(card.querySelector('.project-copy'), { opacity: 0.18, ease: 'none' }, 0)
      .to(card.querySelector('.project-art'), { '--cover-progress': 1, ease: 'none' }, 0);
  });
}
