import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { baseTest } from "../data/test-data";

import testData from "../data/test-data.json";

//page object model
test("page object model", async ({ page }) => {
    const userEmailId = "testAtishay@gmail.com"
    const userPassword = "Test1234"
    const productName = "ZARA COAT 3"

    //----------------------Login Page---------------------- 
    const loginPage = new LoginPage(page)
    await loginPage.redirectTo()
    await loginPage.login(userEmailId, userPassword)

    //--------------------Dashboard Page-------------------- 
    const dashboardPage = new DashboardPage(page)

    //Add Product
    await dashboardPage.addProductToCart(productName)

    //Cart Section
    await dashboardPage.verifyProductInCart()

    //Payment Section
    await dashboardPage.paymentAndPlaceOrder(userEmailId)

    //Thanks section
    const orderId = await dashboardPage.thanksAndCopyOrderId()

    //My orders section
    await dashboardPage.myOrders(orderId, productName)

    await page.pause()
})

//page object model with json test data
test("page object model with json test data", async ({ page }) => {
    //----------------------Login Page---------------------- 
    const loginPage = new LoginPage(page)
    await loginPage.redirectTo()
    await loginPage.login(testData.userEmailId, testData.userPassword)

    //--------------------Dashboard Page-------------------- 
    const dashboardPage = new DashboardPage(page)

    //Add Product
    await dashboardPage.addProductToCart(testData.productName)

    //Cart Section
    await dashboardPage.verifyProductInCart()

    //Payment Section
    await dashboardPage.paymentAndPlaceOrder(testData.userEmailId)

    //Thanks section
    const orderId = await dashboardPage.thanksAndCopyOrderId()

    //My orders section
    await dashboardPage.myOrders(orderId, testData.productName)

    // await page.pause()
})

//page object model with custome fixture - test data
baseTest("page object model with custom fixtures", async ({ page, testData }) => {
    //----------------------Login Page---------------------- 
    const loginPage = new LoginPage(page)
    await loginPage.redirectTo()
    await loginPage.login(testData.userEmailId, testData.userPassword)

    //--------------------Dashboard Page-------------------- 
    const dashboardPage = new DashboardPage(page)

    //Add Product
    await dashboardPage.addProductToCart(testData.productName)

    //Cart Section
    await dashboardPage.verifyProductInCart()

    //Payment Section
    await dashboardPage.paymentAndPlaceOrder(testData.userEmailId)

    //Thanks section
    const orderId = await dashboardPage.thanksAndCopyOrderId()

    //My orders section
    await dashboardPage.myOrders(orderId, testData.productName)

    // await page.pause()
})