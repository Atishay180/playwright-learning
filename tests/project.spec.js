import test, { expect } from "@playwright/test";

test("Login & Order Product", async ({ page }) => {
    const userEmailId = "testAtishay@gmail.com"
    const userPassword = "Test1234"

    await page.goto("https://rahulshettyacademy.com/client/")
    const email = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const btnLogin = page.locator("#login")

    const products = page.locator(".card-body")
    const productName = "ZARA COAT 3"

    //----------------------login page---------------------- 
    await email.fill(userEmailId)
    await password.fill(userPassword)
    await btnLogin.click()

    await page.waitForLoadState("networkidle")
    // await page.locator("div b").last().textContent()
    console.log(await page.locator(".card-body b").allTextContents())

    //----------Add Product - "ZARA COAT 3" to cart---------- 
    const productsCount = await products.count()
    for (let i = 0; i < productsCount; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            console.log("Product Found");
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }


    //---------Cart Section - product added to cart---------
    await page.locator("[routerlink*=cart]").click()
    await page.locator("ul h3").first().textContent()
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    const bool = await page.locator("text=ZARA COAT 3").isVisible()
    console.log("Value = " + bool)
    expect(bool).toBeTruthy()

    await page.locator("text=Checkout").click()


    //------------payment Section - Place Order------------
    const shippingEmail = page.locator('input.ng-pristine')
    await shippingEmail.last().fill("testAtishay@gmail.com")

    await page.locator("[placeholder*=Country]").pressSequentially("ind")
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text === " India") {
            await dropdown.locator("button").nth(i).click()
            break
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmailId)
    await page.locator("text=Place Order ").click()

    //-----------thanks section - order placed-----------
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(`Order Id = ${orderId}`);
    // await page.locator("text=Click To Download Order Details in CSV").click()
    await page.locator("button[routerlink*=myorders]").click()


    //------------my orders - match order id------------

    const orders = page.locator("tbody tr")
    await orders.first().waitFor()

    const ordersCount = await orders.count()
    console.log(`Orders Count = ${ordersCount}`)

    for (let i = 0; i < ordersCount; i++) {
        const id = await orders.nth(i).locator("th").textContent()
        if (orderId.includes(id)) {
            console.log(`Order Id matched`)
            await orders.nth(i).locator("button").first().click()
            break;
        }
    }

    const orderDetails = await page.locator(".col-text.-main").textContent()
    expect(orderId.includes(orderDetails)).toBeTruthy()

    const orderedProductName = await page.locator(".artwork-card-info .title").textContent()
    console.log(`Ordered Product Name = ${orderedProductName}`);

    expect(productName.trim().includes(orderedProductName.trim())).toBeTruthy()

    await page.pause()
})