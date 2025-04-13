const { Builder, By, Key, until } = require('selenium-webdriver');

// <----------------------------Тест 4------------------------------->

describe('task 4 - Wikipedia Article Test', () => {
    let driver;
  
    beforeAll(async () => {
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get('https://en.wikipedia.org/wiki/Selenium_(software)');
    }, 20000);
  
    afterAll(async () => {
      await driver.quit();
    });
  
    test('перевірка заголовку статті', async () => {
      const articleTitle = await driver.findElement(By.xpath("//h1[@id='firstHeading']"));
      const titleText = await articleTitle.getText();
      expect(titleText).toBe('Selenium (software)'); // Перевірка, що заголовок статті відповідає очікуваному
    });
  
    test('перевірка посилань у меню навігації', async () => {
      const navLinks = await driver.findElements(By.css('.vector-menu-content a'));
      let foundExternalLink = false;
  
      for (let link of navLinks) {
        const linkHref = await link.getAttribute('href');
        
        // Перевірка, чи є зовнішнє посилання (не на Wikipedia)
        if (linkHref && linkHref.startsWith('https://') && !linkHref.includes('en.wikipedia.org')) {
          foundExternalLink = true; // Знайшли зовнішнє посилання
          break;
        }
      }
  
      // Перевіряємо, чи знайшли хоча б одне зовнішнє посилання
      expect(foundExternalLink).toBe(true);
    });
  });