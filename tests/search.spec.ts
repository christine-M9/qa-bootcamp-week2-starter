import { test, expect } from '@playwright/test';

// Searching for "pliers" shows only products with "pliers" in the name.
test('search for pliers returns only pliers', async ({ page }) => {
  await page.goto('/');

  // The search box is a textbox labelled Search, not a searchbox role.
  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  // expect.poll keeps retrying until the results update, so no fixed wait.
  // The list must not be empty, and every name must contain "pliers".
  const productNames = page.getByRole('heading', { level: 5 });
  await expect
    .poll(async () => {
      const names = await productNames.allTextContents();
      return names.length > 0 && names.every((name) => name.toLowerCase().includes('pliers'));
    })
    .toBe(true);
});
