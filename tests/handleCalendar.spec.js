import test, { expect } from "@playwright/test";

test.only("handle calendar", async ({ page }) => {

    const day = "12"
    const month = "6"
    const year = "2025"

    const expectedDate = [month, day, year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click()
    await page.locator(`//abbr[text()='${day}']`).click()

    const inputDate = page.locator(".react-date-picker__inputGroup__input")

    for (let i = 0; i < expectedDate.length; i++) {
        const value = await inputDate.nth(i).inputValue()
        expect(value).toEqual(expectedDate[i])
    }
    // expectedDate.map(async (item, idx) => {
    //     const value = await inputDate.nth(idx).inputValue()
    //     expect(value).toEqual(String(item))
    // })

    await page.pause()
})
