import { Locator, Page } from '@playwright/test';
import BasePage from './basePage.page';

export class ProductsPage extends BasePage {
  readonly itemsNames: Locator;
  readonly itemsDescriptions: Locator;
  readonly header: Locator;
  readonly itemsPrices: Locator;
  readonly addtoCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.itemsNames = this.page.getByTestId('inventory-item-name');
    this.itemsDescriptions = this.page.getByTestId('inventory-item-desc');
    this.header = this.page.getByTestId('title');
    this.itemsPrices = this.page.getByTestId('inventory-item-price');
    this.addtoCartButtons = this.page.locator('//button[text()="Add to cart"]');
  }

  private getItemNameLocator(itemName: string): Locator {
    return this.itemsNames.filter({ hasText: itemName });
  }

  private getItemDescriptionLocator(itemName: string): Locator {
    return this.itemsNames.filter({ hasText: itemName }).locator('..').locator('..').locator(this.itemsDescriptions);
  }

  public async getItemName(itemName: string): Promise<string> {
    return await this.getItemNameLocator(itemName).innerText();
  }

  public async getItemDescription(itemName: string): Promise<string> {
    return await this.getItemDescriptionLocator(itemName).innerText();
  }

  private getItemPriceLocator(itemName: string): Locator {
    return this.itemsNames
      .filter({ hasText: itemName })
      .locator('..')
      .locator('..')
      .locator('..')
      .locator(this.itemsPrices);
  }

  public async getItemPrice(itemName: string): Promise<string> {
    return await this.getItemPriceLocator(itemName).innerText();
  }

  private getAddToCartButtonLocator(itemName: string): Locator {
    return this.itemsNames
      .filter({ hasText: itemName })
      .locator('..')
      .locator('..')
      .locator('..')
      .locator(this.addtoCartButtons);
  }
  public async addItemToCart(itemName: string): Promise<void> {
    return await this.getAddToCartButtonLocator(itemName).click();
  }
}
