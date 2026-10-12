export function initNavigation() {
  const menu = document.querySelector('.menu-toggle'),
    nav = document.querySelector('.topbar nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'CLOSE' : 'MENU';
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'MENU';
    }),
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'MENU';
    }
  });
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          nav
            .querySelectorAll('a')
            .forEach((a) => a.classList.toggle('active', a.hash === '#' + e.target.id));
        }
      });
    },
    { rootMargin: '-15% 0px -60% 0px' },
  );
  document.querySelectorAll('main>section[id]').forEach((s) => sectionObserver.observe(s));
}
