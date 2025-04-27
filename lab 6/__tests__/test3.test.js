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

describe("Test Case 2: Login User with correct email and password", () => {
    let driver
  
    beforeAll(async () => {
      driver = await new Builder().forBrowser("chrome").build()
      await driver.get("https://automationexercise.com/")
  
      // Реєстрація нового унікального користувача
      await driver.findElement(By.linkText("Signup / Login")).click()
      await driver.findElement(By.name("name")).sendKeys(userData.name)
      await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(userData.email)
      await driver.findElement(By.css('button[data-qa="signup-button"]')).click()
  
      await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Enter Account Information')]")), 10000)
  
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
  
      await driver.findElement(By.css('button[data-qa="create-account"]')).click()
  
      await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Account Created!')]")), 10000)
      await driver.findElement(By.css('a[data-qa="continue-button"]')).click()
      await driver.findElement(By.linkText("Logout")).click()
    }, 60000)
  
    afterAll(async () => {
      await driver.quit()
    })
  
    test("Launch browser and navigate to homepage", async () => {
      await driver.get("https://automationexercise.com/")
      const logo = await driver.wait(until.elementLocated(By.css("img[alt='Website for automation practice']")), 10000)
      expect(await logo.isDisplayed()).toBe(true)
    })
  
    test("Click on 'Signup / Login'", async () => {
      const loginLink = await driver.findElement(By.linkText("Signup / Login"))
      await loginLink.click()
  
      const loginHeader = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(),'Login to your account')]")), 10000)
      expect(await loginHeader.getText()).toBe("Login to your account")
    })
  
    test("Login with correct credentials", async () => {
      await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys(userData.email)
      await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys(userData.password)
      await driver.findElement(By.css('button[data-qa="login-button"]')).click()
    })
  
    test("Verify user logged in", async () => {
      const loggedInElement = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(),'Logged in as')]")), 10000)
      const text = await loggedInElement.getText()
      expect(text).toContain(`Logged in as ${userData.name}`)
    })
  
    test("Delete account", async () => {
      await driver.findElement(By.linkText("Delete Account")).click()
  
      const deletedMsg = await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Account Deleted!')]")), 10000)
      expect(await deletedMsg.getText()).toContain("ACCOUNT DELETED!")
  
      await driver.findElement(By.css('a[data-qa="continue-button"]')).click()
    })
  })