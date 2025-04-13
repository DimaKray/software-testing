const { ApiClient } = require("../labAssignment-lab4.js");

// <==================== Тест 5 ====================>

describe("Метод отримання даних з API", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: "test data" }),
      })
    );
  });

  it("повертає об'єкт з полем 'fetchedAt' та правильними даними", async () => {
    const client = new ApiClient();
    const response = await client.fetchData();

    expect(response).toMatchObject({
      data: "test data",
      fetchedAt: expect.any(Number),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});