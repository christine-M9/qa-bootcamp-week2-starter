import { test, expect } from '@playwright/test';

// Logging in with a wrong email and password shows an error.
test('invalid login shows an error message', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByRole('textbox', { name: 'Email address' }).fill('christine.juma@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Christine@2025');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
