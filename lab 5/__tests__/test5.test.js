const { Builder, By, Key, until } = require('selenium-webdriver');

// <----------------------------Тест 5-------------------------------->

describe("Test Case 1: Register User", () => {
  let driver
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

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get("https://automationexercise.com/")
  }, 30000)

  afterAll(async () => {
    await driver.quit()
  })

  test("Register new user", async () => {
    // 3. Перевірка, що головна сторінка завантажена
    await driver.wait(until.titleContains("Automation Exercise"), 10000)

    // 4. Клік по 'Signup / Login'
    await driver.findElement(By.linkText("Signup / Login")).click()

    // 5. Перевірка 'New User Signup!'
    const signupHeader = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(),'New User Signup!')]")), 10000)
    expect(await signupHeader.getText()).toBe("New User Signup!")

    // 6. Введення імені та email
    await driver.findElement(By.name("name")).sendKeys(userData.name)
    await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(userData.email)

    // 7. Клік по кнопці Signup
    await driver.findElement(By.css('button[data-qa="signup-button"]')).click()

    // 8. Перевірка 'ENTER ACCOUNT INFORMATION'
    const enterInfoHeader = await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Enter Account Information')]")), 10000)
    expect(await enterInfoHeader.getText()).toContain("ENTER ACCOUNT INFORMATION")

    // 9. Заповнення: Title, Name, Email, Password, Date of birth
    await driver.findElement(By.id("id_gender1")).click()
    await driver.findElement(By.id("password")).sendKeys(userData.password)
    await driver.findElement(By.id("days")).sendKeys("10")
    await driver.findElement(By.id("months")).sendKeys("May")
    await driver.findElement(By.id("years")).sendKeys("1995")

    // 10–11. Чекбокси
    await driver.wait(until.elementIsVisible(driver.findElement(By.id("newsletter"))), 10000)  // Очікуємо, поки елемент стане видимим
    await driver.executeScript("arguments[0].click();", await driver.findElement(By.id("newsletter")))  // Клік через JS

    // Прокручуємо до елемента, щоб він став доступним для кліку
    const optinElement = await driver.findElement(By.id("optin"))
    await driver.executeScript("arguments[0].scrollIntoView(true);", optinElement)  // Прокрутка до чекбоксу
    await driver.sleep(500)  // Невелика затримка

    // Очікуємо, поки реклама не зникне або не стане неактивною
    await driver.sleep(2000)

    // Тепер спробуємо клікнути через JavaScript, щоб уникнути перекриття
    await driver.executeScript("arguments[0].click();", optinElement)

    // 12. Заповнення адреси
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

    // 13. Створити акаунт
    const createAccountBtn = await driver.findElement(By.css('button[data-qa="create-account"]'))
    await driver.executeScript("arguments[0].scrollIntoView(true);", createAccountBtn)  // Прокрутка до кнопки
    await driver.sleep(500)  // Невелика затримка
    await driver.executeScript("arguments[0].click();", createAccountBtn)  // Клік через JS, щоб уникнути перешкод реклами

    // 14. Перевірка 'ACCOUNT CREATED!'
    const accountCreated = await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Account Created!')]")), 10000)
    expect(await accountCreated.getText()).toContain("ACCOUNT CREATED!")

    // 15. Натискання кнопки Continue
    await driver.findElement(By.css('a[data-qa="continue-button"]')).click()

    // 16. Перевірка 'Logged in as username'
    await driver.wait(until.elementLocated(By.xpath(`//a[contains(text(),'Logged in as ${userData.name}')]`)), 10000)

    // 17. Видалення акаунту
    await driver.findElement(By.linkText("Delete Account")).click()

    // 18. Перевірка 'ACCOUNT DELETED!'
    const deletedMsg = await driver.wait(until.elementLocated(By.xpath("//b[contains(text(),'Account Deleted!')]")), 10000)
    expect(await deletedMsg.getText()).toContain("ACCOUNT DELETED!")

    // Натискання кнопки Continue
    await driver.findElement(By.css('a[data-qa="continue-button"]')).click()
  }, 60000)
})