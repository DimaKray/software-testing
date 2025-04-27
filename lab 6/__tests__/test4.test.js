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

describe("Test Case: Login with incorrect email and password", () => {
  let driver
  const userData = {
    email: "incorrectemail@mail.com", // Невірна пошта
    password: "IncorrectPassword", // Невірний пароль
  }

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://automationexercise.com/")
  }, 20000)

  afterAll(async () => {
    await driver.quit()
  })

  test("Launch browser and navigate to homepage", async () => {
    const logo = await driver.wait(until.elementLocated(By.css("img[alt='Website for automation practice']")), 10000)
    expect(await logo.isDisplayed()).toBe(true)
  })

  test("Click on 'Signup / Login'", async () => {
    const loginLink = await driver.findElement(By.linkText("Signup / Login"))
    await loginLink.click()

    const loginHeader = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Login to your account')]")), 10000)
    expect(await loginHeader.getText()).toBe("Login to your account")
  })

  test("Enter incorrect email address and password", async () => {
    await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys(userData.email)
    await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys(userData.password)
  })

  test("Click 'login' button", async () => {
    await driver.findElement(By.css('button[data-qa="login-button"]')).click()
  })

  test("Verify error 'Your email or password is incorrect!' is visible", async () => {
    const errorMessage = await driver.wait(until.elementLocated(By.xpath("//p[contains(text(),'Your email or password is incorrect!')]")), 10000)
    expect(await errorMessage.getText()).toBe("Your email or password is incorrect!")
  })
})
