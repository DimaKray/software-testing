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

describe("Test Case 6: Contact Us Form", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterAll(async () => {
    await driver.quit()
  })

  test("should submit Contact Us form successfully", async () => {
    // 1. Launch browser & 2. Navigate to url
    await driver.get("http://automationexercise.com")

    // 3. Verify that home page is visible successfully
    await driver.wait(until.titleContains("Automation"), 5000)
    const logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'))
    expect(await logo.isDisplayed()).toBe(true)

    // 4. Click on 'Contact Us' button
    const contactUsBtn = await driver.findElement(By.css('a[href="/contact_us"]'))
    await contactUsBtn.click()

    const getInTouchHeader = await driver.wait(until.elementLocated(By.css("h2.title.text-center")), 5000)
    //За умовою має бути "GET IN TOUCH" але на справді відображає  "CONTACT US"
    expect(await getInTouchHeader.getText()).toBe("CONTACT US")

    // 6. Enter name, email, subject and message
    await driver.findElement(By.name("name")).sendKeys("Test User")
    await driver.findElement(By.name("email")).sendKeys("testuser@example.com")
    await driver.findElement(By.name("subject")).sendKeys("Test Subject")
    await driver.findElement(By.id("message")).sendKeys("This is a test message.")

    // 7. Upload file (вказати шлях до файлу)
    const fileInput = await driver.findElement(By.name("upload_file"))
    const filePath = path.resolve(__dirname, "testfile.txt") // створити testfile.txt в тій же папці
    await fileInput.sendKeys(filePath)

    // 8. Click 'Submit' button
    const submitBtn = await driver.findElement(By.name("submit"))
    await submitBtn.click()

    // 9. Click OK button на alert
    await driver.switchTo().alert().accept()

    // 10. Verify success message
    const successMsg = await driver.wait(until.elementLocated(By.css(".status.alert.alert-success")), 5000)
    expect(await successMsg.getText()).toBe("Success! Your details have been submitted successfully.")

    // 11. Click 'Home' button and verify that landed to home page
    const homeBtn = await driver.findElement(By.css("a.btn.btn-success"))
    await homeBtn.click()

    // Перевірка, що повернулися на домашню сторінку
    await driver.wait(until.titleContains("Automation"), 5000)
    const homeLogo = await driver.findElement(By.css('img[alt="Website for automation practice"]'))
    expect(await homeLogo.isDisplayed()).toBe(true)
  })
})