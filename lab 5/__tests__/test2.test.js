const { Builder, By, until } = require('selenium-webdriver');

// <----------------------------Тест 2-------------------------------->

describe('task2 - Wikipedia homepage test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.wikipedia.org');
  }, 20000);

  afterAll(async () => {
    await driver.quit();
  });

  test('поле пошуку присутнє (за допомогою name)', async () => {
    const searchBox = await driver.findElement(By.name('search'));
    expect(searchBox).toBeTruthy(); // Перевірка наявності поля пошуку
  });

  test('логотип Wikipedia присутній (за тегом img)', async () => {
    const logo = await driver.wait(until.elementLocated(By.tagName('img')), 10000);
    expect(logo).toBeTruthy(); // Перевірка наявності логотипу
  });
});
