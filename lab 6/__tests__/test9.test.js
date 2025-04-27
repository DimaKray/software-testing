const { Builder, By, until, Key, Actions } = require("selenium-webdriver")

const path = require("path")

const randomNum = Math.floor(Math.random() * 100000)
const userData = {
  name: "TestName",
  email: `testname${randomNum}@mail.com`,
  password: "Test1234",
  firstName: "Sana",
  lastName: "Montana",
  company: "Test",
  address1: "876 Street",
  address2: "Apt 32",
  country: "USA",
  state: "Ontario",
  city: "New York",
  zipcode: "M5H 6N3",
  mobileNumber: "0987654321",
}

describe("Test Case 7: Verify Test Cases Page", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterAll(async () => {
    await driver.quit()
  })

  test("should navigate to test cases page successfully", async () => {
    // 1-2. Launch browser & navigate to URL
    await driver.get("http://automationexercise.com")

    // 3. Verify that home page is visible successfully
    await driver.wait(until.titleContains("Automation"), 5000)
    const logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'))
    expect(await logo.isDisplayed()).toBe(true)

    // 4. Click on 'Test Cases' button
    const testCasesBtn = await driver.findElement(By.css('a[href="/test_cases"]'))
    await testCasesBtn.click()

    // 5. Verify user is navigated to test cases page
    await driver.wait(until.urlContains("/test_cases"), 5000)

    // Очікуємо на заголовок сторінки
    const testCasesHeader = await driver.wait(until.elementLocated(By.css("h2.title.text-center")), 5000)
    const headerText = await testCasesHeader.getText()
    expect(headerText.toUpperCase()).toContain("TEST CASES")
  })
})