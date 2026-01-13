import { expect, test } from "@playwright/test";

//if you want to launch the brower with cookies or proxy etc.
test("browser playwright test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
})


//if you want to lauch a fresh brower without any cookies or proxy
test("page playwright test", async ({ page }) => {
    await page.goto("https://youtube.com");
})

//assertions
test("assertions playwright test", async ({ page }) => {
    await page.goto("https://google.com");
    console.log(`Title = ${await page.title()}`);
    await expect(page).toHaveTitle("Google");
})

//locators and selectors
test("locators playwright test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("Atishay Jain")
    await page.locator("#password").fill("Test1234")
    await page.locator("#signInBtn").click();
})

//extracting text
test('extract text playwright test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("Atishay Jain")
    await page.locator("[type='password']").fill("Test1234")
    await page.locator("#signInBtn").click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
})

//extract multiple web elements
test("multiple element playwright test", async ({ page }) => {
    const txtUsername = page.locator("#username");
    const txtPassword = page.locator("[name='password']");
    const btnSignIn = page.locator("#signInBtn");
    const cardElement = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await txtUsername.fill("rahulshettyacademy");
    await txtPassword.fill("learning");

    await btnSignIn.click();

    console.log(await cardElement.first().textContent());
    console.log(await cardElement.last().textContent());
    console.log(await cardElement.nth(1).textContent());
 
})