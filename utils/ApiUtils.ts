import { expect, APIRequestContext } from "@playwright/test"

interface LoginPayload {
    userEmail: string;
    userPassword: string;
}

interface OrderPayload {
    orders: Array<{ country: string; productOrderedId: string }>;
}

class ApiUtils {

    readonly apiContext: APIRequestContext;
    readonly loginPayload: LoginPayload;

    constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
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

    async createOrder(orderPayload: OrderPayload) {
        let response: any = {};
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