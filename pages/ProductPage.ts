import { Page, Locator } from '@playwright/test';

// Everything the tests need to know about a product page.
export class ProductPage {
  readonly page: Page;
  readonly quantityBox: Locator;
  readonly addToCartButton: Locator;
  readonly addedMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityBox = page.getByRole('spinbutton', { name: 'Quantity' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.addedMessage = page.getByRole('alert').filter({ hasText: 'Product added to shopping cart' });
  }

  // Open a product from the home page by its name.
  async open(productName: string) {
    await this.page.goto('/');
    await this.page.getByRole('heading', { level: 5, name: productName, exact: true }).click();
  }

  async setQuantity(quantity: number) {
    await this.quantityBox.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
