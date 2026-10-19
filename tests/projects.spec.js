import { test, expect } from '@playwright/test';
import { projects } from '../src/scripts/data/projects.js';

test('live project previews open the matching sites and the fourth remains a progress card', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const [index, project] of projects.slice(0, 3).entries()) {
    const card = page.locator('.project').nth(index);
    for (const selector of ['.project-link', '.project-art']) {
      await expect(card.locator(selector)).toHaveAttribute('href', project.url);
      await expect(card.locator(selector)).toHaveAttribute('target', '_blank');
    }
    const preview = card.locator('.project-preview img');
    await preview.scrollIntoViewIfNeeded();
    await expect
      .poll(() => preview.evaluate((image) => image.complete && image.naturalWidth > 0))
      .toBe(true);
    // Intercept the external navigation: verify the click without depending on that site's uptime.
    await page
      .context()
      .route(project.url, (route) => route.fulfill({ body: 'Project link verified' }));
    const popupPromise = page.waitForEvent('popup');
    await card.locator('.project-link').click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(project.url);
    await popup.close();
  }
  await expect(page.locator('.project').last().locator('a')).toHaveCount(0);
  await expect(page.locator('.progress-art')).toHaveAttribute('src', /still-in-progress\.svg$/);
  await expect(page.getByRole('img', { name: 'Open to work', exact: true })).toHaveCount(1);
});
