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

describe("Test Case 10: Verify Subscription in home page", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterAll(async () => {
    await driver.quit()
  })

  test("should subscribe successfully from the home page", async () => {
    // 1-2. Launch browser & navigate to URL
    await driver.get("http://automationexercise.com")

    // 3. Verify that home page is visible successfully
    await driver.wait(until.titleContains("Automation"), 5000)
    const logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'))
    expect(await logo.isDisplayed()).toBe(true)

    // 4. Scroll down to footer
    await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)")

    // 5. Verify text 'SUBSCRIPTION'
    const subscriptionText = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(), 'Subscription')]")), 5000)
    expect(await subscriptionText.isDisplayed()).toBe(true)

    // 6. Enter email address in input and click arrow button (використовуємо випадкову електронну пошту)
    const emailInput = await driver.findElement(By.id("susbscribe_email"))
    await emailInput.sendKeys(userData.email)

    const subscribeBtn = await driver.findElement(By.id("subscribe"))
    await subscribeBtn.click()

    // Збільшений час очікування для успішного повідомлення
    const successMsg = await driver.wait(
      until.elementLocated(By.css(".alert-success.alert")),
      10000 // Таймаут збільшено до 10 секунд
    )

    // Перевірка тексту успішного повідомлення
    const successText = await successMsg.getText()
    expect(successText).toBe("You have been successfully subscribed!")

    // Перевірка, чи є повідомлення після підписки
    expect(successText).not.toBeNull()
  })
})