import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.only("project using unique locators", async ({ page }) => {
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