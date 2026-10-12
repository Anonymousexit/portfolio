import { test, expect } from '@playwright/test';
import { profile } from '../src/scripts/data/profile.js';
import { projects } from '../src/scripts/data/projects.js';

test('content and local assets load without runtime or request failures', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => errors.push(request.url()));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/');
  await expect(page.locator('#hero-name')).toHaveText(profile.name);
  await expect(page.locator('.project')).toHaveCount(projects.length);
  await expect(page.locator('.experiment')).toHaveCount(4);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() => [...document.fonts].every((font) => font.status === 'loaded')),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test('project and contact dialogs open, close, and return keyboard focus', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('.project-link').first();
  await link.click();
  await expect(page.locator('dialog')).toBeVisible();
  await expect(page.locator('#dialog-content h2')).toHaveText(projects[0].title);
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
  await expect(link).toBeFocused();
  await page.locator('.contact-small').click();
  await expect(page.locator('.contact-placeholder')).toBeVisible();
  await page.locator('.dialog-close').click();
  await expect(page.locator('.contact-small')).toBeFocused();
});

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1350, height: 680 },
  { width: 1000, height: 800 },
]) {
  test(`all four project tabs finish stacking at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      const finalCard = document.querySelector('.project:last-child');
      const target = finalCard.getBoundingClientRect().top + scrollY - 80 + 100;
      scrollTo(0, target);
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
  });
}

test('mobile navigation and project layout remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('nav a[href="#work"]').click();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(
    await page
      .locator('.project')
      .first()
      .evaluate((element) => getComputedStyle(element).position),
  ).toBe('relative');
  await page.locator('.project-link').last().click();
  await expect(page.locator('#dialog-content h2')).toHaveText(projects.at(-1).title);
});

test('motion preferences and pause controls remain available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/motion-paused/);
  await expect(page.locator('.flower')).toHaveCSS('animation-name', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).not.toHaveClass(/motion-paused/);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(page.locator('html')).toHaveClass(/motion-paused/);
});
