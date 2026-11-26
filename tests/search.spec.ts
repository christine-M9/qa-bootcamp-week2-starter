import { test, expect } from '@playwright/test';

// Searching for "pliers" shows only products with "pliers" in the name.
test('search for pliers returns only pliers', async ({ page }) => {
  await page.goto('/');

  // Wait for a condition, not a guess: the first products have loaded.
  // Searching before this lets the late home page list replace the results.
  await expect(page.getByRole('heading', { level: 5, name: /\w/ }).first()).toBeVisible();

  // The search box is a textbox labelled Search, not a searchbox role.
  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  // Wait for the page to confirm the search ran.
  await expect(page.getByRole('heading', { name: 'Searched for: pliers' })).toBeVisible();

  // The product names can still be empty for a moment after that, so
  // expect.poll keeps reading them until the check passes or times out.
  // The list must not be empty, and every name must contain "pliers".
  const productNames = page.getByRole('heading', { level: 5 });
  await expect
    .poll(async () => {
      const names = await productNames.allTextContents();
      return names.length > 0 && names.every((name) => name.toLowerCase().includes('pliers'));
    })
    .toBe(true);
});
