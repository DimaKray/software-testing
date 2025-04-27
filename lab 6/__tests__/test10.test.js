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

describe("Test Case 8: View Product Details", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterAll(async () => {
    await driver.quit()
  })

  test("should display product details correctly", async () => {
    // 1-2. Launch browser & navigate to URL
    await driver.get("http://automationexercise.com")

    // 3. Verify that home page is visible successfully
    await driver.wait(until.titleContains("Automation"), 5000)
    const logo = await driver.findElement(By.css('img[alt="Website for automation practice"]'))
    expect(await logo.isDisplayed()).toBe(true)

    // 4. Click on 'Products' button
    const productsBtn = await driver.findElement(By.css('a[href="/products"]'))
    await productsBtn.click()

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await driver.wait(until.titleContains("All Products"), 5000)

    // 6. The products list is visible
    const productList = await driver.wait(until.elementLocated(By.css(".features_items")), 5000)
    expect(await productList.isDisplayed()).toBe(true)

    // 7. Click on 'View Product' of first product
    const viewProduct = await driver.findElement(By.css('a[href="/product_details/1"]'))
    await viewProduct.click()

    // 8. User is landed to product detail page
    await driver.wait(until.urlContains("/product_details/1"), 5000)

    // 9. Verify that product details are visible
    const productName = await driver.findElement(By.css(".product-information h2"))
    const category = await driver.findElement(By.xpath("//p[contains(text(),'Category')]"))
    const price = await driver.findElement(By.css(".product-information span span"))
    const availability = await driver.findElement(By.xpath("//b[contains(text(),'Availability')]"))
    const condition = await driver.findElement(By.xpath("//b[contains(text(),'Condition')]"))
    const brand = await driver.findElement(By.xpath("//b[contains(text(),'Brand')]"))

    expect(await productName.isDisplayed()).toBe(true)
    expect(await category.isDisplayed()).toBe(true)
    expect(await price.isDisplayed()).toBe(true)
    expect(await availability.isDisplayed()).toBe(true)
    expect(await condition.isDisplayed()).toBe(true)
    expect(await brand.isDisplayed()).toBe(true)
  })
})