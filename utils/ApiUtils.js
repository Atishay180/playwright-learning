import { expect } from "@playwright/test"

class ApiUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload })
        expect(loginResponse.ok()).toBeTruthy()
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token
        console.log(`Token = ${token}`)
        return token
    }

    async createOrder(orderPayload) {
        let response = {}
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": response.token,
                }
            }
        )

        expect(orderResponse.ok()).toBeTruthy()
        const orderResponseJson = await orderResponse.json()
        console.log(orderResponseJson);
        response.orderId = orderResponseJson.orders[0]
        console.log(`Order Id = ${response.orderId}`);
        return response
    }
}

export { ApiUtils }