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

describe("Test Case: Attempt to register with an already registered email", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://automationexercise.com/")
  }, 20000)

  afterAll(async () => {
    await driver.quit()
  })

  test("Try to sign up again with the same email", async () => {
    await driver.findElement(By.linkText("Signup / Login")).click()
    await driver.wait(until.elementLocated(By.name("name")), 10000)

    await driver.findElement(By.name("name")).sendKeys("NewName")
    await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(userData.email)
    await driver.findElement(By.css('button[data-qa="signup-button"]')).click()

    const errorMessage = await driver.wait(until.elementLocated(By.xpath("//p[contains(text(),'Email Address already exist!')]")), 10000)
    const errorText = await errorMessage.getText()
    console.log("Error message: ", errorText)
    expect(errorText).toBe("Email Address already exist!")
  })
})