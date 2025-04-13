const { asyncError } = require("../labAssignment-lab4.js");

// <==================== Тест 4 ====================>

describe("Асинхронна помилка", () => {
  it("повинна завершитись з винятком 'Something went wrong'", async () => {
    await expect(asyncError()).rejects.toThrow("Something went wrong");
  });
});