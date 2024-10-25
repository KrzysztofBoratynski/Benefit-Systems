import { Locator, Page } from '@playwright/test';
import BasePage from './basePage.page';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.getByTestId('title');
    this.itemName = this.page.getByTestId('inventory-item-name');
    this.itemDescription = this.page.getByTestId('inventory-item-desc');
    this.itemPrice = this.page.getByTestId('inventory-item-price');
    this.checkoutButton = this.page.getByTestId('checkout');
    this.removeButtons = this.page.locator('//button[text()="Remove"]');
  }

  public async getTitle(): Promise<string> {
    return await this.title.innerText();
  }

  public async getItemName(index: number): Promise<string> {
    return await this.itemName.nth(index).innerText();
  }

  public async getItemDescription(index: number): Promise<string> {
    return await this.itemDescription.nth(index).innerText();
  }

  public async getItemPrice(index: number): Promise<string> {
    return await this.itemPrice.nth(index).innerText();
  }

  public async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }

  public async clickRemoveButton(index: number): Promise<void> {
    await this.removeButtons.nth(index).click();
  }
}
