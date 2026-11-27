import { test, expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';

// True when each price is the same as or more than the one before it.
function cheapestFirst(prices: number[]) {
  return prices.every((price, i) => i === 0 || prices[i - 1] <= price);
}

test('C3 Sort by price', async ({ page }) => {
  const productList = new ProductListPage(page);
  await productList.open();

  // Wait for the first price before sorting. The names show up earlier, and
  // sorting then lets the late default list replace the sorted one.
  await expect(productList.prices.first()).toBeVisible();

  await productList.sortBy('Price (Low - High)');

  // An empty list would count as sorted, so it must show more than one price.
  await expect
    .poll(
      async () => {
        const prices = await productList.readPrices();
        return prices.length > 1 && cheapestFirst(prices);
      },
      { message: 'prices should go from cheapest to most expensive' },
    )
    .toBe(true);
});
