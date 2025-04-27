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

describe("Test Case: Register, Login and Logout User", () => {
  let driver

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
    const signupLink = await driver.findElement(By.linkText("Signup / Login"))
    await signupLink.click()

    const signupHeader = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(),'New User Signup!')]")), 10000)
    expect(await signupHeader.getText()).toBe("New User Signup!")
  })

  test("Enter user details and click Signup", async () => {
    await driver.findElement(By.name("name")).sendKeys(userData.name)
    await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(userData.email)
    await driver.findElement(By.css('button[data-qa="signup-button"]')).click()

    const enterInfoHeader = await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Enter Account Information')]")), 10000)
    expect(await enterInfoHeader.getText()).toContain("ENTER ACCOUNT INFORMATION")
  })

  test("Fill account details", async () => {
    await driver.findElement(By.id("id_gender1")).click()
    await driver.findElement(By.id("password")).sendKeys(userData.password)
    await driver.findElement(By.id("days")).sendKeys("10")
    await driver.findElement(By.id("months")).sendKeys("May")
    await driver.findElement(By.id("years")).sendKeys("1995")

    await driver.findElement(By.id("newsletter")).click()
    await driver.findElement(By.id("optin")).click()

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
  })

  test("Create account and verify account created", async () => {
    await driver.findElement(By.css('button[data-qa="create-account"]')).click()

    const accountCreated = await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Account Created!')]")), 10000)
    expect(await accountCreated.getText()).toContain("ACCOUNT CREATED!")
  })

  test("Verify user logged in", async () => {
    jest.setTimeout(15000)

    // Натискаємо кнопку 'Continue'
    await driver.findElement(By.css('a[data-qa="continue-button"]')).click()

    // Очікуємо появи елементу з текстом 'Logged in as'
    const loggedInElement = await driver.wait(until.elementLocated(By.xpath("//a[contains(., 'Logged in as')]")), 15000)

    const text = await loggedInElement.getText()
    expect(text).toMatch(/Logged in as/i)
  })

  test("Click 'Logout' button", async () => {
    await driver.findElement(By.linkText("Logout")).click()
  })

  test("Verify that user is navigated to login page", async () => {
    const loginHeader = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Login to your account')]")), 10000)
    expect(await loginHeader.getText()).toBe("Login to your account")
  })
})