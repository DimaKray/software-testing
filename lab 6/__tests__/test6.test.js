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

describe("Register a new user", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://automationexercise.com/")
  }, 20000)

  afterAll(async () => {
    await driver.quit()
  })

  test("Create a new user account", async () => {
    // Створюю новий аккаунт, бо аккаунт з попереднього тесту за умовою не видалявся
    const randomNum = Math.floor(Math.random() * 100000)
    const userData = {
      name: "TestUser",
      email: `testuser${randomNum}@mail.com`,
      password: "Test1234",
      firstName: "John",
      lastName: "Doe",
      company: "TestCorp",
      address1: "123 Test Street",
      address2: "Apt 4B",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zipcode: "M5H 2N2",
      mobileNumber: "1234567890",
    }

    await driver.findElement(By.linkText("Signup / Login")).click()
    await driver.wait(until.elementLocated(By.name("name")), 10000)

    await driver.findElement(By.name("name")).sendKeys(userData.name)
    await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(userData.email)
    await driver.findElement(By.css('button[data-qa="signup-button"]')).click()

    await driver.wait(until.elementLocated(By.id("id_gender1")), 10000)
    await driver.findElement(By.id("id_gender1")).click()
    await driver.findElement(By.id("password")).sendKeys(userData.password)

    await driver.findElement(By.id("days")).sendKeys("1")
    await driver.findElement(By.id("months")).sendKeys("January")
    await driver.findElement(By.id("years")).sendKeys("2000")

    await driver.findElement(By.id("first_name")).sendKeys(userData.firstName)
    await driver.findElement(By.id("last_name")).sendKeys(userData.lastName)
    await driver.findElement(By.id("company")).sendKeys(userData.company)
    await driver.findElement(By.id("address1")).sendKeys(userData.address1)
    await driver.findElement(By.id("address2")).sendKeys(userData.address2)
    await driver.findElement(By.id("country")).sendKeys(userData.country)
    await driver.findElement(By.id("state")).sendKeys(userData.state)
    await driver.findElement(By.id("city")).sendKeys(userData.city)
    await driver.findElement(By.id("zipcode")).sendKeys(userData.zipcode)
    await driver.findElement(By.id("mobile_number")).sendKeys(userData.mobileNumber)

    await driver.findElement(By.css('button[data-qa="create-account"]')).click()

    const success = await driver.wait(until.elementLocated(By.xpath("//b[text()='Account Created!']")), 10000)

    const successText = await success.getText()
    expect(successText).toBe("ACCOUNT CREATED!")
  })
})