import { test, request, expect } from "@playwright/test";
import { ApiUtils } from "../utils/ApiUtils";

const url = "https://rahulshettyacademy.com/client/"
const productId = "6960ea76c941646b7a8b3dd5"
const productName = "iphone 13 pro"
let response = {}

const loginPayload = {
    userEmail: "testAtishay@gmail.com",
    userPassword: "Test1234"
}

const orderPayload = {
    orders: [
        {
            country: "Spain",
            productOrderedId: productId
        }
    ]
}

test.beforeAll(async () => {
    try {
        const apiContext = await request.newContext()
        const apiUtils = new ApiUtils(apiContext, loginPayload)
        response = await apiUtils.createOrder(orderPayload)
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
})

test.only("Web api test", async ({ page }) => {
    const userEmailId = "testAtishay@gmail.com"
    const userPassword = "Test1234"

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token)
    await page.goto(url)


    //------------my orders - match order id------------
    await page.locator('button[routerlink*="myorders"]').click();
    const orders = page.locator("tbody tr")
    await orders.first().waitFor()

    const ordersCount = await orders.count()
    console.log(`Orders Count = ${ordersCount}`)

    for (let i = 0; i < ordersCount; i++) {
        const id = await orders.nth(i).locator("th").textContent()
        if (response.orderId.includes(id)) {
            console.log(`Order Id matched`)
            await orders.nth(i).locator("button").first().click()
            break;
        }
    }

    const orderDetails = await page.locator(".col-text.-main").textContent()
    expect(response.orderId.includes(orderDetails)).toBeTruthy()

    const orderedProductName = await page.locator(".artwork-card-info .title").textContent()
    console.log(`Ordered Product Name = ${orderedProductName}`);

    expect(productName.trim().includes(orderedProductName.trim())).toBeTruthy()
})