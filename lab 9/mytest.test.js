const pactum = require('pactum');

describe('Тестування API валют', () => {
  it('Отримання списку доступних валют', async () => {
    await pactum.spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .expectStatus(200)
      .expectJsonSchema({ type: 'object' });
  });

  it('Курс євро по відношенню до інших валют', async () => {
    await pactum.spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        required: ['date', 'eur']
      });
  });

  it('Перевірка відповіді для неіснуючої валюти', async () => {
    await pactum.spec()
      .get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eurpian.json')
      .expectStatus(404);
  });
});

describe('Тестування API святкових днів', () => {
  it('Перевірка наявності основних категорій свят', async () => {
    await pactum.spec()
      .get('https://www.gov.uk/bank-holidays.json')
      .expectStatus(200)
      .expectJsonSchema({
        type: 'object',
        required: ['england-and-wales', 'scotland', 'northern-ireland']
      })
      .expectJsonLength('england-and-wales.events', 75)
      .expectJsonLength('scotland.events', 84)
      .expectJsonLength('northern-ireland.events', 93);
  });

  it('Пошук Великоднього понеділка серед подій', async () => {
    const spec = pactum.spec();
  
    await spec
      .get('https://www.gov.uk/bank-holidays.json')
      .expectStatus(200);
  
    const response = spec._response.body; // Беремо відповідь через _response.body
  
    expect(response).toBeDefined();
    expect(response['england-and-wales']).toBeDefined();
  
    const events = response['england-and-wales'].events;
    const hasEasterMonday = events.some(event => event.title.includes('Easter Monday'));
  
    expect(hasEasterMonday).toBe(true);
  });  
});

describe('Тестування Dictionary API', () => {
  it('Перевірка даних для слова "concurrency"', async () => {
    await pactum.spec()
      .get('https://api.dictionaryapi.dev/api/v2/entries/en/concurrency')
      .expectStatus(200)
      .expectJsonSchema({
        type: 'array'
      })
      .expectJsonLike([
        {
          word: 'concurrency'
        }
      ]);
  });
});
