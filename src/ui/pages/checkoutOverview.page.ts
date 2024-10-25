import { Locator, Page } from '@playwright/test';
import BasePage from './basePage.page';

export class CheckoutOverviewPage extends BasePage {
  readonly title: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;
  readonly finishButton: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInforamtion: Locator;
  readonly itemTotalPrice: Locator;
  readonly tax: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.getByTestId('title');
    this.itemName = this.page.getByTestId('inventory-item-name');
    this.itemDescription = this.page.getByTestId('inventory-item-desc');
    this.itemPrice = this.page.getByTestId('inventory-item-price');
    this.finishButton = this.page.getByTestId('finish');
    this.paymentInformation = this.page.getByTestId('payment-info-value');
    this.shippingInforamtion = this.page.getByTestId('shipping-info-value');
    this.itemTotalPrice = this.page.getByTestId('subtotal-label');
    this.tax = this.page.getByTestId('tax-label');
    this.totalPrice = this.page.getByTestId('total-label');
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

  public async getPaymentInformation(): Promise<string> {
    return await this.paymentInformation.innerText();
  }

  public async getShipingInformation(): Promise<string> {
    return await this.shippingInforamtion.innerText();
  }

  public async getItemTotalPrice(): Promise<string> {
    return await this.itemTotalPrice.innerText();
  }

  public async getTax(): Promise<string> {
    return await this.tax.innerText();
  }

  public async getTotalPrice(): Promise<string> {
    return await this.totalPrice.innerText();
  }

  public async clickFinishButton(): Promise<void> {
    await this.finishButton.click();
  }
}
