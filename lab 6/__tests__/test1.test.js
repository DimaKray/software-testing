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

describe("Automation Exercise - Головна сторінка", () => {
    let driver
  
    beforeAll(async () => {
      driver = await new Builder().forBrowser("chrome").build()
      await driver.get("https://automationexercise.com/")
    }, 20000)
  
    afterAll(async () => {
      await driver.quit()
    })
  
    test("логотип сайту присутній (alt-текст перевірка)", async () => {
      const logo = await driver.wait(until.elementLocated(By.css('img[alt="Website for automation practice"]')), 10000)
      const altText = await logo.getAttribute("alt")
      expect(altText).toBe("Website for automation practice")
    })
  
    test("верхнє меню навігації присутнє (перевірка ul.nav)", async () => {
      const navMenu = await driver.findElement(By.css("ul.nav.navbar-nav"))
      expect(navMenu).toBeDefined()
    })
  
    test("кнопка 'Signup / Login' присутня (за текстом посилання)", async () => {
      const loginBtn = await driver.findElement(By.linkText("Signup / Login"))
      const btnText = await loginBtn.getText()
      expect(btnText).toContain("Signup")
    })
  })