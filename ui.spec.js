import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://mms2.beniten.jp/blog/');
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByText('Media Site 2 Media Site 0002 Menu Home About Blog Contact Dinner Gala in Tokyo').click();
  await page.getByRole('link', { name: 'Contact' }).click();
});


