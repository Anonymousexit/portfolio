import { test, expect } from '@playwright/test';
import { profile } from '../src/scripts/data/profile.js';

const transform = (locator) => locator.evaluate((element) => getComputedStyle(element).transform);

test('typography stays readable through motion toggles and responsive reflow', async ({ page }) => {
  await page.goto('/');
  const name = page.getByRole('heading', { name: profile.name, exact: true });
  await expect(name).toBeVisible();
  await expect.poll(() => page.locator('#hero-name .type-char').count()).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(page.locator('.type-char')).toHaveCount(0);
  await expect(name).toHaveText(profile.name);
  await page.getByRole('button', { name: 'Resume animations' }).click();
  const heading = page.locator('.playground-head h2');
  await heading.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      heading
        .locator('.type-char')
        .evaluateAll((chars) =>
          chars.every((char) => Number(getComputedStyle(char).opacity) > 0.99),
        ),
    )
    .toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveText('EXPERIMENTS');
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    .toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.type-char')).toHaveCount(0);
  await expect(heading).toBeVisible();
});

test('rolling labels support keyboard focus and paused dialogs remain visible', async ({
  page,
}) => {
  await page.goto('/');
  const action = page.locator('.hero .action');
  await expect(action).toBeVisible();
  await action.focus();
  const line = action.locator('.roll-line').first();
  await expect.poll(() => transform(line)).not.toBe('none');
  await expect(action.locator('.roll-line[aria-hidden="true"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(line).toHaveCSS('transform', 'none');
  await page.locator('.contact-small').click();
  await expect(page.locator('dialog')).toHaveCSS('opacity', '1');
  await expect(page.locator('.contact-placeholder')).toBeVisible();
});

test('hero motion stops on pause and resumes without hiding content', async ({ page }) => {
  await page.goto('/');
  const sticker = page.locator('.sticker-yellow');
  const initial = await transform(sticker);
  await expect.poll(() => transform(sticker)).not.toBe(initial);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  const frozen = await transform(sticker);
  await page.waitForTimeout(700);
  expect(await transform(sticker)).toBe(frozen);
  await expect(page.locator('#hero-name')).toBeVisible();
  await expect(page.locator('.scene-one')).toHaveCSS('opacity', '1');
  await expect(page.locator('.scene-two')).toHaveCSS('opacity', '0');
  const skills = page.locator('.skills > *');
  expect(
    await skills.evaluateAll((items) =>
      items.every((item) => getComputedStyle(item).opacity === '1'),
    ),
  ).toBe(true);
  await page.getByRole('button', { name: 'Resume animations' }).click();
  await expect.poll(() => transform(sticker)).not.toBe(frozen);
});

test('animated project stack finishes, reverses, and resets across breakpoints', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    const last = document.querySelector('.project:last-child');
    scrollTo(0, last.getBoundingClientRect().top + scrollY + 20);
  });
  await expect
    .poll(() =>
      page
        .locator('.folder-tab')
        .evaluateAll((tabs) =>
          tabs.every((tab) => Math.abs(tab.getBoundingClientRect().top - 80) < 1),
        ),
    )
    .toBe(true);
  const copies = page.locator('.project-copy');
  await expect
    .poll(() => copies.first().evaluate((el) => Number(getComputedStyle(el).opacity)))
    .toBeLessThan(0.3);
  await expect(copies.last()).toHaveCSS('opacity', '1');
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(copies.first()).toHaveCSS('opacity', '1');
  // Resuming while already stacked must measure each card's original flow position.
  await page.getByRole('button', { name: 'Resume animations' }).click();
  await expect
    .poll(() => copies.first().evaluate((el) => Number(getComputedStyle(el).opacity)))
    .toBeLessThan(0.3);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(copies.first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.project').first()).toHaveCSS('position', 'relative');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => scrollTo(0, 0));
  await expect(copies.first()).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('contact character animates and the banner remains a working contact control', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelector('.contact-character').scrollIntoView({ block: 'center' });
  });
  const character = page.locator('.character-body');
  const initial = await transform(character);
  await expect.poll(() => transform(character), { timeout: 6000 }).not.toBe(initial);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  const frozen = await transform(character);
  await page.waitForTimeout(700);
  expect(await transform(character)).toBe(frozen);
  const banner = page.locator('.contact-banner');
  await page.keyboard.press('Tab');
  await banner.focus();
  await expect(banner.locator('.selection-frame')).toHaveCSS('opacity', '1');
  await page.keyboard.press('Enter');
  await expect(page.locator('.contact-placeholder')).toBeVisible();
});
