import test, { expect } from "@playwright/test"
import Exceljs from "exceljs"

//helper function
const writeExcel = async (searchText, newPrice, change, filePath) => {
    const workbook = new Exceljs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet("Sheet1")

    const output = readExcel(worksheet, searchText)

    const cell = worksheet.getCell(output.row, output.col + change.colChange)
    cell.value = newPrice
    await workbook.xlsx.writeFile(filePath)
}

//helper function
const readExcel = (worksheet, searchText) => {
    const output = { row: -1, col: -1 }

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber
                output.col = colNumber
            }
        })
    })

    return output
}

//-------upload file with updated input test automation------- 
test.only('Handle excel utils', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

    const textSearch = "Mango"
    const updatedValue = 129

    const downloadPromise = page.waitForEvent("download")

    await page.locator("#downloadButton").click()
    const download = await downloadPromise

    const filePath = 'C:/Users/atish/Downloads/download.xlsx'
    await download.saveAs(filePath)

    await writeExcel(textSearch, updatedValue, { rowChange: 0, colChange: 2 }, filePath)
    await page.locator("#fileinput").setInputFiles(filePath)

    const textLocator = page.getByText(textSearch)
    const desiredRow = page.getByRole("row").filter({ has: textLocator })

    console.log(`Updated Value = ${await desiredRow.locator("#cell-4-undefined").textContent()}`);
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue.toString())
})