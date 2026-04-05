import { type Locator, type Page } from "@playwright/test";

class LoginPage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page
        this.email = page.getByPlaceholder("email@example.com")
        this.password = page.getByPlaceholder("enter your passsword")
        this.btnLogin = page.getByRole("button", { name: "Login" })
    }

    async redirectTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/")
    }

    async login(userEmailId: string, userPassword: string) {
        await this.email.fill(userEmailId)
        await this.password.fill(userPassword)
        await this.btnLogin.click()
    }
}

export { LoginPage }