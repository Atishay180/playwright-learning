import { expect, type Page, type Locator } from "@playwright/test"

class DashboardPage {

    readonly page: Page;
    readonly products: Locator;
    readonly btnCheckout: Locator;
    readonly shippingEmail: Locator;
    readonly btnPlaceOrder: Locator;
    readonly btnMyOrders: Locator;
    readonly orders: Locator;

    constructor(page: Page) {
        this.page = page
        this.products = page.locator(".card-body")

        this.btnCheckout = page.getByRole("button", { name: "Checkout" })

        this.shippingEmail = page.locator('input.ng-pristine')
        this.btnPlaceOrder = page.getByText("Place Order ")

        this.btnMyOrders = page.locator("button[routerlink*=myorders]")

        this.orders = page.locator("tbody tr")
    }

    //---------Add Product - "ZARA COAT 3" to cart----------
    async addProductToCart(productName: string) {
        await this.page.waitForLoadState("networkidle")
        console.log(await this.page.locator(".card-body b").allTextContents())

        await this.products.filter({ hasText: productName }).getByRole("button", { name: " Add To Cart" }).click()
    }

    //---------Cart Section - product added to cart---------
    async verifyProductInCart() {
        await this.page.getByRole("listitem").getByRole("button", { name: "Cart" }).click()

        await this.page.locator("ul h3").first().textContent()
        const bool = await this.page.locator("text=ZARA COAT 3").isVisible()
        console.log("Value = " + bool)
        expect(bool).toBeTruthy()

        await this.btnCheckout.click()
    }

    //-------------Payment Section - Place Order------------
    async paymentAndPlaceOrder(userEmailId: string) {
        await this.shippingEmail.last().fill("testAtishay@gmail.com")

        await this.page.getByPlaceholder("Select Country").pressSequentially("ind")
        await this.page.getByRole("button", { name: " India" }).nth(1).click()

        await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(userEmailId)
        await this.btnPlaceOrder.click()
    }

    async thanksAndCopyOrderId() {
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
        const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent()
        console.log(`Order Id = ${orderId}`);
        // await this.page.locator("text=Click To Download Order Details in CSV").click()
        await this.btnMyOrders.click()
        await this.page.getByRole("listitem").getByRole("button", { name: "ORDERS" }).click()

        return orderId
    }

    //--------------My orders - match order id--------------
    async myOrders(orderId: string, productName: string) {

        await this.orders.first().waitFor()

        const ordersCount = await this.orders.count()
        console.log(`Orders Count = ${ordersCount}`)

        for (let i = 0; i < ordersCount; i++) {
            const id: any = await this.orders.nth(i).locator("th").textContent()
            if (orderId.includes(id)) {
                console.log(`Order Id matched`)
                await this.orders.nth(i).locator("button").first().click()
                break;
            }
        }

        const orderDetails: any = await this.page.locator(".col-text.-main").textContent()
        expect(orderId.includes(orderDetails)).toBeTruthy()

        const orderedProductName: any = await this.page.locator(".artwork-card-info .title").textContent()
        console.log(`Ordered Product Name = ${orderedProductName}`);

        expect(productName.trim().includes(orderedProductName.trim())).toBeTruthy()
    }
}

export { DashboardPage }