import test, { expect } from "@playwright/test";

test("project using unique locators", async ({ page }) => {
    const userEmailId = "testAtishay@gmail.com"
    const userPassword = "Test1234"

    await page.goto("https://rahulshettyacademy.com/client/")
    const email = page.getByPlaceholder("email@example.com")
    const password = page.getByPlaceholder("enter your passsword")
    const btnLogin = page.getByRole("button", { name: "Login" })

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
    await products.filter({ hasText: productName }).getByRole("button", { name: " Add To Cart" }).click()

    //---------Cart Section - product added to cart---------
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click()

    await page.locator("ul h3").first().textContent()
    const bool = await page.locator("text=ZARA COAT 3").isVisible()
    console.log("Value = " + bool)
    expect(bool).toBeTruthy()

    await page.getByRole("button", { name: "Checkout" }).click()


    //------------payment Section - Place Order------------
    const shippingEmail = page.locator('input.ng-pristine')
    await shippingEmail.last().fill("testAtishay@gmail.com")

    await page.getByPlaceholder("Select Country").pressSequentially("ind")
    await page.getByRole("button", { name: " India" }).nth(1).click()

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmailId)
    await page.getByText("Place Order ").click()

    //-----------thanks section - order placed-----------
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(`Order Id = ${orderId}`);
    // await page.locator("text=Click To Download Order Details in CSV").click()
    await page.locator("button[routerlink*=myorders]").click()
    await page.getByRole("listitem").getByRole("button", { name: "ORDERS" }).click()


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