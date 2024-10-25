import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { CheckoutOverviewPage } from '../pages/checkoutOverview.page';
import { PageHeaderComponent } from '../pages/components/pageHeader.component';
import { CustomerInformationPage } from '../pages/customerInformation.page';

type MyFixtures = {
  webApp: {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    pageHeaderComponent: PageHeaderComponent;
    cartPage: CartPage;
    customerInformationPage: CustomerInformationPage;
    chekoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
  };
};

export const test = base.extend<MyFixtures>({
  
  webApp: async ({ page }, use) => {
    const webApp = {
      loginPage : new LoginPage(page),
      productsPage: new ProductsPage(page),
      pageHeaderComponent: new PageHeaderComponent(page),
      cartPage: new CartPage(page),
      customerInformationPage: new CustomerInformationPage(page),
      chekoutOverviewPage: new CheckoutOverviewPage(page),
      checkoutCompletePage: new CheckoutCompletePage(page),
    };
    await webApp.loginPage.goTo(process.env.SAUCE_DEMO_URL as string);
    await webApp.loginPage.login(process.env.USERNAME as string, process.env.PASSWORD as string);
    await use(webApp);
  },
});
export { expect } from '@playwright/test';
