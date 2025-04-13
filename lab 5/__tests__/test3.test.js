const { Builder, By, Key, until } = require('selenium-webdriver');

// <----------------------------Тест 3-------------------------------->

describe('task 3 - Wikipedia Search functionality tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.wikipedia.org');
  }, 20000);

  afterAll(async () => {
    await driver.quit();
  });

  test('виконання пошуку за допомогою sendKeys та Enter або кнопки пошуку', async () => {
    const searchBox = await driver.findElement(By.name('search'));
    await searchBox.sendKeys('Selenium (software)'); // Тестуємо введення тексту у поле пошуку
    await searchBox.sendKeys(Key.ENTER); // Натискання клавіші Enter для запуску пошуку

    // Перевірка, чи змінився заголовок сторінки після введення пошукового запиту
    try {
      await driver.wait(until.titleContains('Selenium (software)'), 10000);
    } catch (error) {
      // Якщо Enter не спрацював, натискаємо кнопку пошуку
      const searchButton = await driver.findElement(By.css('button[type="submit"], .search-button, .search-icon'));
      await searchButton.click();
      await driver.wait(until.titleContains('Selenium (software)'), 10000);
    }

    // Перевіряємо, чи містить заголовок сторінки запит "Selenium (software)"
    const title = await driver.getTitle();
    expect(title).toContain('Selenium (software)');
  });
});