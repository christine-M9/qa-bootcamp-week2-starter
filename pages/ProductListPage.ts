import { Page, Locator } from '@playwright/test';

// The product list on the home page.
export class ProductListPage {
  readonly page: Page;
  readonly sortBox: Locator;
  readonly prices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortBox = page.getByRole('combobox', { name: 'sort' });
    // A price looks like $14.15.
    this.prices = page.getByText(/^\$\d+\.\d{2}$/);
  }

  async open() {
    await this.page.goto('/');
  }

  async sortBy(option: string) {
    await this.sortBox.selectOption({ label: option });
  }

  // The prices on the page, as numbers, so $9.17 comes before $10.00.
  async readPrices(): Promise<number[]> {
    const texts = await this.prices.allTextContents();
    return texts.map((text) => Number(text.replace('$', '')));
  }
}
