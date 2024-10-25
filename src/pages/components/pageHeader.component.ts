import { Locator, Page } from '@playwright/test';
import BaseComponent from './baseComponent.component';

export class PageHeaderComponent extends BaseComponent {
  readonly shopingCartLink: Locator = this.page.getByTestId('shopping-cart-link');
  readonly shoppingCartBadge: Locator = this.page.getByTestId('shopping-cart-badge');

  constructor(page: Page) {
    super(page);
  }

  public async clickShopingCartLink(): Promise<void> {
    await this.shopingCartLink.click();
  }
}
