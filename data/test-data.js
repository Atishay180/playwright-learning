import { test as base } from "@playwright/test"

export const baseTest = base.extend({
    testData: {
        userEmailId: "testAtishay@gmail.com",
        userPassword: "Test1234",
        productName: "ZARA COAT 3",
    }
})