class LoginPage {
    constructor(page) {
        this.page = page
        this.email = page.getByPlaceholder("email@example.com")
        this.password = page.getByPlaceholder("enter your passsword")
        this.btnLogin = page.getByRole("button", { name: "Login" })
    }

    async redirectTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/")
    }

    async login(userEmailId, userPassword) {
        await this.email.fill(userEmailId)
        await this.password.fill(userPassword)
        await this.btnLogin.click()
    }
}

export { LoginPage }