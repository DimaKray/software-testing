const { calculateFinalPrice } = require("../labAssignment-lab4.js");

// <==================== Тест 7 ====================>

describe("Функція підрахунку підсумкової вартості", () => {
  it("коректно обчислює суму з урахуванням податку та знижки", () => {
    const mockOrder = {
      items: [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 },
      ],
      taxRate: 0.2,
    };

    const fakeDiscountService = {
      getDiscount: () => 0.1,
    };

    const total = calculateFinalPrice(mockOrder, fakeDiscountService);
    expect(total).toBe(270);
  });

  it("обмежує максимальну знижку до 50%", () => {
    const mockOrder = {
      items: [
        { price: 200, quantity: 1 },
        { price: 150, quantity: 1 },
      ],
      taxRate: 0.2,
    };

    const aggressiveDiscount = {
      getDiscount: () => 0.6,
    };

    const total = calculateFinalPrice(mockOrder, aggressiveDiscount);
    expect(total).toBe(210);
  });

  it("викидає помилку, якщо замовлення не містить товарів", () => {
    const emptyOrder = {
      items: [],
      taxRate: 0.2,
    };

    expect(() => calculateFinalPrice(emptyOrder)).toThrow("Invalid order");
  });

  it("викидає помилку при негативній ціні або кількості", () => {
    const brokenOrder = {
      items: [
        { price: -100, quantity: 2 },
        { price: 50, quantity: 1 },
      ],
      taxRate: 0.2,
    };

    const someService = {
      getDiscount: () => 0.1,
    };

    expect(() => calculateFinalPrice(brokenOrder, someService)).toThrow("Invalid item data");
  });
});
