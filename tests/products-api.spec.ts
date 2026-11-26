import { test, expect } from '@playwright/test';

// The full API address, from .env.
const API_URL = process.env.TOOLSHOP_API_URL ?? 'https://api.practicesoftwaretesting.com';

// A GET to /products returns 200 and a list with at least one product.
test('GET /products returns a list of products', async ({ request }) => {
  const response = await request.get(`${API_URL}/products`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});
