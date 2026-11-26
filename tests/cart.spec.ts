import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

// CJ-18 (TS-104): quantity 3 adds 3 to the cart.
test('quantity 3 adds 3 Pliers to the cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await productPage.open('Pliers');
  await productPage.setQuantity(3);
  await productPage.addToCart();
  await expect(productPage.addedMessage).toBeVisible();

  await cartPage.open();
  await expect(cartPage.quantityOf('Pliers')).toHaveValue('3');
  await expect(cartPage.lineTotalOf('Pliers')).toHaveText('$36.03');
});
