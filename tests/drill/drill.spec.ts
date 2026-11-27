import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import path from 'path';

// open page
const drillPage = pathToFileURL(path.join(__dirname, 'index.html')).href;

// Unfixed on purpose: a fixed wait, then one plain check.
test('drill: Save shows Saved', async ({ page }) => {
  await page.goto(drillPage);
  await page.getByRole('button', { name: 'Save' }).click();

  // The message comes after 0 to 1 second.
  await page.waitForTimeout(500);

  // Reading the message once. toBe does not retry.
  const message = await page.locator('#status').textContent();
  expect(message).toBe('Saved');
});
