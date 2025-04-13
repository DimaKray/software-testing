const { computeValue } = require("../labAssignment-lab4.js");

// <==================== Тест 3 ====================>

describe("Функція обчислення значення", () => {
  it("повертає 94 як результат розрахунку", async () => {
    const value = await computeValue();
    expect(value).toBe(94);
  });
});