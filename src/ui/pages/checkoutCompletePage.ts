import { Locator, Page } from '@playwright/test';
import BasePage from './basePage.page';

export class CheckoutCompletePage extends BasePage {
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.getByTestId('title');
    this.completeHeader = this.page.getByTestId('complete-header');
    this.completeText = this.page.getByTestId('complete-text');
  }

  public async getTitle(): Promise<string> {
    return await this.title.innerText();
  }

  public async getCompleteHeaderText(): Promise<string> {
    return await this.completeHeader.innerText();
  }

  public async getCompleteText(): Promise<string> {
    return await this.completeText.innerText();
  }
}
