import test, { expect } from "@playwright/test";

test.only("handle alerts", async ({ page }) => {

    //------------------------handle multiple URL------------------------
    // await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://google.com")
    // await page.goBack()
    // await page.goForward()

    //------------------------handle alert popups------------------------
    // await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.getByPlaceholder("Enter Your Name").fill("ABCD")
    // page.on("dialog", dialog => dialog.accept())
    // page.on("dialog", dialog => dialog.dismiss())
    // await page.locator("#confirmbtn").click()
    // await page.pause()

    //--------------------------handle framees---------------------------
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const frame = page.frameLocator("#courses-iframe")
    await frame.locator("li a[href='lifetime-access']:visible").click()
    const textCheck = await frame.locator(".text h2").textContent()
    console.log(`Text = ${textCheck.split(' ')[1]}`)
})