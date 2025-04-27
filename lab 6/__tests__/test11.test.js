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

describe("Test Case 9: Search Product", () => {
  let driver

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterAll(async () => {
    await driver.quit()
  })

  test("should search for a product and display results", async () => {
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
    const allProductsSection = await driver.findElement(By.css(".features_items"))
    expect(await allProductsSection.isDisplayed()).toBe(true)

    // 6. Enter product name in search input and click search button
    const searchInput = await driver.findElement(By.id("search_product"))
    await searchInput.sendKeys("Dress")

    const searchBtn = await driver.findElement(By.id("submit_search"))
    await searchBtn.click()

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    const searchedHeader = await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(), 'Searched Products')]")), 5000)
    expect(await searchedHeader.isDisplayed()).toBe(true)

    // 8. Verify all the products related to search are visible
    const searchResults = await driver.findElements(By.css(".features_items .product-image-wrapper"))
    expect(searchResults.length).toBeGreaterThan(0)

    // Додатково: перевірка, що кожен продукт відображається
    for (const product of searchResults) {
      expect(await product.isDisplayed()).toBe(true)
    }
  })
})