import { test as base } from "@playwright/test"

interface TestData {
    testData: {
        userEmailId: string;
        userPassword: string;
        productName: string;
    }
}

export const baseTest = base.extend<TestData>({
    testData: {
        userEmailId: "testAtishay@gmail.com",
        userPassword: "Test1234",
        productName: "ZARA COAT 3",
    }
})