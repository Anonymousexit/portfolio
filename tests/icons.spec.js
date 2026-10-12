import { test, expect } from '@playwright/test';

test('SVG icons stay aligned and controls retain accessible names at both sizes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Resume animations' })).toBeVisible();
    await expect(page.locator('.motion-toggle .icon-play')).toHaveCount(1);
    const issues = await page.locator('[data-icon]').evaluateAll((hosts) =>
      hosts.flatMap((host) => {
        const svg = host.querySelector('svg');
        if (!svg || svg.getAttribute('aria-hidden') !== 'true') return [host.dataset.icon];
        if (!host.checkVisibility()) return [];
        const rect = svg.getBoundingClientRect();
        return rect.width < 10 || rect.height < 10 ? [host.dataset.icon] : [];
      }),
    );
    expect(issues).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    if (width === 1440) {
      await expect(page.getByRole('link', { name: 'HOME', exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'CONTACT', exact: true }).first().click();
      await page.getByRole('button', { name: 'Close dialog' }).click();
      await expect(page.locator('dialog')).not.toBeVisible();
    }
  }
});

test('small icon motion pauses offscreen and fully respects the motion control', async ({
  page,
}) => {
  await page.goto('/');
  const ring = page.locator('.target-mark .icon-ring').first();
  const state = () => ring.evaluate((el) => el.getAttribute('style'));
  const start = await state();
  await expect.poll(state).not.toBe(start);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelector('#journal').scrollIntoView();
  });
  await page.waitForTimeout(300);
  const offscreen = await state();
  await page.waitForTimeout(500);
  expect(await state()).toBe(offscreen);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(page.locator('.motion-toggle .icon-play')).toHaveCount(1);
  await page.evaluate(() => scrollTo(0, 0));
  const paused = await state();
  await page.waitForTimeout(500);
  expect(await state()).toBe(paused);
  const homeIcon = page.locator('nav .icon-home');
  await page.getByRole('link', { name: 'HOME', exact: true }).focus();
  await expect(homeIcon).toHaveCSS('transform', 'none');
  await page.getByRole('button', { name: 'Resume animations' }).click();
  await expect(page.locator('.motion-toggle .icon-pause')).toHaveCount(1);
  await expect.poll(state).not.toBe(paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.motion-toggle .icon-play')).toHaveCount(1);
  await expect(homeIcon).toHaveCSS('transform', 'none');
});
