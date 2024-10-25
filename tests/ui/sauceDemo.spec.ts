import { generateCustomerData } from '../../src/fixtures/genrateCustomerData.fixture';
import { test, expect } from '../../src/fixtures/webApp.fixture';
import fs from 'fs';

let rawdata = fs.readFileSync('./src/test-data/testData.json');
const customerData = generateCustomerData();
const testData: TestData = JSON.parse(rawdata.toString());
testData.firstScenario.customerData = customerData;

test('Should succesfully complete product order', async ({ webApp }) => {
  await test.step('Should check if item is present', async () => {
    await expect(webApp.productsPage.header).toBeVisible();
    expect(await webApp.productsPage.getItemName(testData.firstScenario.itemName)).toBe(
      testData.firstScenario.itemName,
    );
    expect(await webApp.productsPage.getItemDescription(testData.firstScenario.itemName)).toBe(
      testData.firstScenario.itemDescription,
    );
    expect(await webApp.productsPage.getItemPrice(testData.firstScenario.itemName)).toBe(
      testData.firstScenario.itemPrice,
    );
  });

  await test.step('Should add item to cart', async () => {
    await webApp.productsPage.addItemToCart(testData.firstScenario.itemName);
    await expect(webApp.pageHeaderComponent.shoppingCartBadge).toBeVisible();
  });

  await test.step('Should open shopping cart page', async () => {
    await webApp.pageHeaderComponent.clickShopingCartLink();
    expect(await webApp.cartPage.getTitle()).toBe(testData.cartTitle);
  });

  await test.step('Should check if item was added to cart', async () => {
    expect(await webApp.cartPage.getItemName(0)).toBe(testData.firstScenario.itemName);
    expect(await webApp.cartPage.getItemDescription(0)).toBe(testData.firstScenario.itemDescription);
    expect(await webApp.cartPage.getItemPrice(0)).toBe(testData.firstScenario.itemPrice);
  });

  await test.step('Should click checkout button', async () => {
    await webApp.cartPage.clickCheckoutButton();
  });

  await test.step('Should fill customer information form and proced to checkout overview page', async () => {
    await webApp.customerInformationPage.fillCustomerForm(
      testData.firstScenario.customerData.firstName,
      testData.firstScenario.customerData.lastName,
      testData.firstScenario.customerData.postalCode,
    );
    await webApp.customerInformationPage.clickContinueButton();
  });

  await test.step('Should check checkout overview page', async () => {
    expect(await webApp.chekoutOverviewPage.getTitle()).toBe(testData.checkoutOverviewTitle);
    expect(await webApp.chekoutOverviewPage.getItemName(0)).toBe(testData.firstScenario.itemName);
    expect(await webApp.chekoutOverviewPage.getItemDescription(0)).toBe(testData.firstScenario.itemDescription);
    expect(await webApp.chekoutOverviewPage.getItemPrice(0)).toBe(testData.firstScenario.itemPrice);
    expect(await webApp.chekoutOverviewPage.getPaymentInformation()).toContain(
      testData.firstScenario.paymentInformation,
    );
    expect(await webApp.chekoutOverviewPage.getShipingInformation()).toContain(
      testData.firstScenario.shippingInformation,
    );
    expect(await webApp.chekoutOverviewPage.getItemTotalPrice()).toContain(testData.firstScenario.itemTotalPrice);
    expect(await webApp.chekoutOverviewPage.getTax()).toContain(testData.firstScenario.tax);
    expect(await webApp.chekoutOverviewPage.getTotalPrice()).toContain(testData.firstScenario.totalPrice);
  });

  await test.step('Should confirm order ', async () => {
    await webApp.chekoutOverviewPage.clickFinishButton();
  });

  await test.step('Should check checkout complete page ', async () => {
    expect(await webApp.checkoutCompletePage.getTitle()).toBe(testData.checkoutCompleteTitle);
    expect(await webApp.checkoutCompletePage.getCompleteHeaderText()).toBe(testData.completeHeader);
    expect(await webApp.checkoutCompletePage.getCompleteText()).toBe(testData.completeText);
  });
});

test('Should succesfully remove product from cart', async ({ webApp }) => {
  await test.step('Should check if item is present', async () => {
    await expect(webApp.productsPage.header).toBeVisible();
    expect(await webApp.productsPage.getItemName(testData.firstScenario.itemName)).toBe(
      testData.firstScenario.itemName,
    );
    expect(await webApp.productsPage.getItemDescription(testData.firstScenario.itemName)).toBe(
      testData.firstScenario.itemDescription,
    );
    expect(await webApp.productsPage.getItemPrice(testData.firstScenario.itemName)).toBe(
      testData.firstScenario.itemPrice,
    );
  });

  await test.step('Should add item to cart', async () => {
    await webApp.productsPage.addItemToCart(testData.firstScenario.itemName);
    await expect(webApp.pageHeaderComponent.shoppingCartBadge).toBeVisible();
  });

  await test.step('Should open shopping cart page', async () => {
    await webApp.pageHeaderComponent.clickShopingCartLink();
    expect(await webApp.cartPage.getTitle()).toBe(testData.cartTitle);
  });

  await test.step('Should check if item was added to cart', async () => {
    expect(await webApp.cartPage.getItemName(0)).toBe(testData.firstScenario.itemName);
    expect(await webApp.cartPage.getItemDescription(0)).toBe(testData.firstScenario.itemDescription);
    expect(await webApp.cartPage.getItemPrice(0)).toBe(testData.firstScenario.itemPrice);
  });

  await test.step('Should remove item from cart', async () => {
    await webApp.cartPage.clickRemoveButton(0);
  });

  await test.step('Should check if item was removed from cart', async () => {
    await expect(webApp.cartPage.itemName).toBeHidden();
    await expect(webApp.cartPage.itemDescription).toBeHidden();
    await expect(webApp.cartPage.itemPrice).toBeHidden();
    await expect(webApp.pageHeaderComponent.shoppingCartBadge).toBeHidden();
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
