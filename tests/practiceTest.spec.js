import { expect, test } from "@playwright/test";

test("practice playwright test", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(`Page Title = ${await page.title()}`);

    await expect(page).toHaveTitle("Google");

    await page.locator("#username").fill("atishay jain");
})