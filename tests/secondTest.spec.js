import { expect, test } from "@playwright/test";

test("dynamic wait playwright test", async ({ page }) => {
    const email = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const btnLogin = page.locator("#login")

    const cardTitles = page.locator(".card-body b")

    await page.goto("https://rahulshettyacademy.com/client/")
    await email.fill("testAtishay@gmail.com")
    await password.fill("Test1234")
    await btnLogin.click()

    // const title = await cardTitles.first().textContent();
    // await cardTitles.first().waitFor();
    await page.waitForLoadState("networkidle")
    const titles = await cardTitles.allTextContents()
    console.log(titles);

})

test("handling UI components", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const txtUsername = page.locator("#username");
    const txtPassword = page.locator("[name='password']")
    const checkboxUser = page.locator(".radiotextsty").last()
    const checkboxTerms = page.locator("#terms")
    const lnkDocument = page.locator("[href*=documents-request]");

    const btnSignIn = page.locator("#signInBtn")

    await txtUsername.fill("rahulshettyacademy")
    await txtPassword.fill("learning")

    await checkboxUser.click()
    await page.locator("#okayBtn").click()
    await expect(checkboxUser).toBeChecked()

    await page.locator("select.form-control").selectOption("consult")

    await checkboxTerms.click()
    await expect(checkboxTerms).toBeChecked()

    //verify blinking document link
    await expect(lnkDocument).toHaveAttribute("class", "blinkingText");

    //for unchecked assertion
    // expect(await checkboxTerms.isChecked()).toBeFalsy();

    await btnSignIn.click();
    await page.pause();


})

test("handling child window UI component", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    page.goto("https://rahulshettyacademy.com/loginpagePractise")

    const username = page.locator("#username")
    const lnkDocument = page.locator("[href*=documents-request]")

    // we use promise.all when we want to wait for more than one event to happen simultaneously
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        lnkDocument.click()
    ])

    //extract domain from new page
    const paragraph = await newPage.locator(".red").textContent()
    const newText = paragraph.split('@')[1]
    const domain = newText.split(' ')[0]

    await username.fill(domain)
    // console.log(`Text Content = ${await username.textContent()}`)
    console.log(`Text Content = ${await username.inputValue()}`)
})


//practice 
test("practice playwright", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    page.goto("https://rahulshettyacademy.com/loginpagePractise")

    const lnkDocs = page.locator(".blinkingText")
    const username = page.locator("#username")
    const password = page.locator("[name='password']")
    const checkboxUser = page.locator("input#usertype")
    const btnOkay = page.locator("#okayBtn")
    const checkboxTerms = page.locator("#terms")
    const btnSignIn = page.locator("#signInBtn")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        lnkDocs.click()
    ])

    console.log(`Text = ${await newPage.locator(".im-para.red").textContent()}`)
    
    await username.fill("rahulshettyacademy")
    await password.fill("learning")

    await checkboxUser.nth(1).click()
    await btnOkay.click()
    await expect(checkboxUser.nth(1)).toBeChecked()

    await page.locator('select.form-control').selectOption('consult')

    await checkboxTerms.click()
    await expect(checkboxTerms).toBeChecked()

    await btnSignIn.click()

    await page.pause()
})