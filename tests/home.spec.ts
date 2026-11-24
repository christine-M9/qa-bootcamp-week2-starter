import { test, expect } from '@playwright/test';

// The home page loads and has the right title.
test('home page has the Toolshop title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/);
});
