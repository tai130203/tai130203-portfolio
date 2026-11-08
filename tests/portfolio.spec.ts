import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
  test(`layout and project details at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Hi, I’m')).toContainText('Đoàn Công Tài');
    expect(await page.locator('.hero-art img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0 && image.naturalWidth === image.naturalHeight)).toBe(true);

    for (const id of ['work', 'skills', 'about', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }

    const trigger = page.getByRole('button', { name: 'Explore Library Management', exact: true });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Library Management', exact: true })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'View repository' })).toHaveAttribute('href', 'https://github.com/tai130203/SE_104');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();

    await page.getByRole('button', { name: 'Explore Management Dashboard', exact: true }).click();
    await expect(dialog).toContainText('a connected backend, authentication system, and production deployment are not claimed');
    await dialog.getByRole('button', { name: 'Close project details' }).click();
    await expect(dialog).not.toBeVisible();
    expect(errors).toEqual([]);

    await page.locator('#home').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true, animations: 'disabled' });
  });
}

test('mobile navigation works with a keyboard and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.getByRole('navigation')).not.toBeVisible();
  await menu.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('navigation')).not.toBeVisible();
});

test('reduced motion keeps all sections readable and links use real destinations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const reveals = page.locator('.reveal');
  for (const element of await reveals.all()) await expect(element).toHaveCSS('opacity', '1');
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto');
  for (const link of await page.locator('a').all()) {
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).not.toBe('#');
    if (href!.startsWith('#')) await expect(page.locator(href!)).toHaveCount(1);
    else expect(new URL(href!).hostname).toBe('github.com');
  }
});
