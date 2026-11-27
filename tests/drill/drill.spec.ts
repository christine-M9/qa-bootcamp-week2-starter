import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import path from 'path';

// open page
const drillPage = pathToFileURL(path.join(__dirname, 'index.html')).href;

// Fixed: wait for the message, not for a guessed time.
test('drill: Save shows Saved', async ({ page }) => {
  await page.goto(drillPage);
  await page.getByRole('button', { name: 'Save' }).click();

  // The message comes after 0 to 1 second.
  // toHaveText keeps checking until it says Saved.
  await expect(page.locator('#status')).toHaveText('Saved');
});
