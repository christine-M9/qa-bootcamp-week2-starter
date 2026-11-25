import { Page, Locator } from '@playwright/test';

// Everything the tests need to know about the cart page.
export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'cart' });
  }

  // Open the cart from the cart icon in the top menu.
  async open() {
    await this.cartLink.click();
    await this.page.waitForURL('**/checkout');
  }

  quantityOf(productName: string): Locator {
    return this.page.getByRole('spinbutton', { name: `Quantity for ${productName}` });
  }

  lineTotalOf(productName: string): Locator {
    return this.rowOf(productName).locator('[data-test="line-price"]');
  }

  private rowOf(productName: string): Locator {
    return this.page.getByRole('row').filter({ has: this.quantityOf(productName) });
  }
}
