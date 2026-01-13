import test, { expect } from "@playwright/test";

test("Special locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/")

    await page.getByPlaceholder("Password").fill("1234")

    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")

    await page.getByRole("button", { name: "Submit" }).click()

    const text = await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    expect(text).toBeTruthy()

    await page.getByRole("link", { name: "Shop" }).click()

    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click()

    await page.pause()
})