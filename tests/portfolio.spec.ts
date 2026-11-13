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

    for (const id of ['work', 'path', 'skills', 'notes', 'about', 'contact']) {
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

    await page.getByRole('link', { name: /TAI130203.*back to top/ }).click();
    await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(0);
    await expect(page.locator('.hero-copy')).toHaveCSS('visibility', 'visible');
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
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
  await menu.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
});

test('desktop scroll reveals the portal story, supports direct navigation and reverses', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const runway = page.locator('.hero-runway');
  const story = page.locator('.hero-story');
  await expect(runway).toHaveClass(/scene-active/);
  await expect(story).toHaveJSProperty('inert', true);
  await page.evaluate(() => {
    const runway = document.querySelector<HTMLElement>('.hero-runway')!;
    window.scrollTo({ top: (runway.offsetHeight - innerHeight) * .94, behavior: 'instant' });
  });
  await expect(story).toHaveCSS('opacity', '1');
  await expect(story).toHaveJSProperty('inert', false);
  await expect(page.locator('.hero-copy')).toHaveJSProperty('inert', true);
  for (const word of await page.locator('.story-word').all()) await expect(word).toHaveCSS('opacity', '1');
  expect(await page.locator('.reading-progress span').evaluate(element => parseFloat(element.style.transform.slice(7)))).toBeGreaterThan(0);
  await story.getByRole('link', { name: 'Meet the work' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('button', { name: 'Explore Library Management', exact: true })).toBeInViewport();
  await page.getByRole('link', { name: /TAI130203.*back to top/ }).click();
  await expect(page.locator('.hero-copy')).toHaveJSProperty('inert', false);
  await expect(story).toHaveJSProperty('inert', true);
});

test('motion preferences and viewport changes restore the static story', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => window.scrollTo({ top: innerHeight * .8, behavior: 'instant' }));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero-runway')).not.toHaveClass(/scene-active/);
  await expect(page.locator('.hero-story')).toHaveJSProperty('inert', false);
  await expect(page.locator('.hero-copy')).toHaveJSProperty('inert', false);
  for (const word of await page.locator('.story-word').all()) await expect(word).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.hero-runway')).toHaveClass(/scene-active/);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('.hero-runway')).not.toHaveClass(/scene-active/);
  await expect(page.locator('.hero-story')).toHaveJSProperty('inert', false);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('project lighting responds to a mouse and ignores touch and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const card = page.getByRole('button', { name: 'Explore Library Management', exact: true });
  await card.hover({ position: { x: 45, y: 50 } });
  const position = await card.evaluate(element => element.style.getPropertyValue('--pointer-x'));
  expect(position).not.toBe('');
  await card.dispatchEvent('pointermove', { pointerType: 'touch', clientX: 900, clientY: 900 });
  expect(await card.evaluate(element => element.style.getPropertyValue('--pointer-x'))).toBe(position);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.dispatchEvent('pointermove', { pointerType: 'mouse', clientX: 1000, clientY: 1000 });
  expect(await card.evaluate(element => element.style.getPropertyValue('--pointer-x'))).toBe(position);
  await expect(card).toHaveCSS('transform', 'none');
});

test('the orbit spark works by keyboard with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Send a little spark' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('A LITTLE CURIOSITY GOES A LONG WAY.');
  await expect(page.locator('.orbit-pulse')).toHaveCSS('display', 'none');
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

test('the request path works as tabs, traces itself and opens case studies', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const tabs = page.getByRole('tablist', { name: 'Layers of a request' });
  const panel = page.getByRole('tabpanel');
  await expect(tabs.getByRole('tab')).toHaveCount(5);
  await expect(tabs.getByRole('tab', { name: 'Interface' })).toHaveAttribute('aria-selected', 'true');
  await tabs.getByRole('tab', { name: 'Interface' }).focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByRole('tab', { name: 'API' })).toBeFocused();
  await expect(panel).toContainText('NEXT CHAPTER');
  await expect(panel).toContainText('Not in a public project yet');
  await expect(panel.getByRole('button')).toHaveCount(0);
  await page.keyboard.press('End');
  await expect(panel).toContainText('Relationships worth keeping.');
  await panel.getByRole('button', { name: 'Open the Library Management case study' }).click();
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Library Management', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: 'Trace a request' }).click();
  await expect(tabs.getByRole('tab', { name: 'Interface' })).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.getByRole('tab', { name: 'Data' })).toHaveAttribute('aria-selected', 'true', { timeout: 8000 });
  await expect(page.getByRole('button', { name: 'Trace a request' })).toBeEnabled();
});

test('the constellation map follows the page on desktop and stays out of the way on phones', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const map = page.getByRole('navigation', { name: 'Section map' });
  await expect(map).toBeVisible();
  await expect(map.getByRole('link')).toHaveCount(7);
  await expect(map.getByRole('link', { name: 'Start' })).toHaveAttribute('aria-current', 'location');
  await map.getByRole('link', { name: 'Notes' }).click();
  await expect(page).toHaveURL(/#notes$/);
  await expect(map.getByRole('link', { name: 'Notes' })).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('.starfield')).toHaveCSS('pointer-events', 'none');
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(map).not.toBeVisible();
});

test('the logbook keeps one note open at a time', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const notes = page.locator('.log details');
  await expect(notes).toHaveCount(3);
  await expect(notes.nth(0)).toHaveAttribute('open', '');
  await notes.nth(2).locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(notes.nth(2)).toHaveAttribute('open', '');
  await expect(notes.nth(0)).not.toHaveAttribute('open', '');
  await expect(notes.nth(2)).toContainText('If the page works without the effect');
  await expect(page.locator('.about-details time')).toHaveText(/^\d{2}:\d{2} · GMT\+7$/);
});
