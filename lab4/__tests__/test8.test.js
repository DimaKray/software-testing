const { OrderProcessor } = require("../labAssignment-lab4.js")

// <==================== Тест 8 ====================>

describe("task 8 - OrderProcessor - processOrder() method", () => {
    test("should process the order correctly and convert currency", async () => {
      const mockCurrencyConverter = jest.fn().mockResolvedValue(500); // Замоканий конвертер повертає 500
      const orderProcessor = new OrderProcessor(mockCurrencyConverter);
  
      const order = {
        items: [
          { price: 100, quantity: 2 }, // 200
          { price: 50, quantity: 1 }, // 50
        ],
        taxRate: 0.2, // 20% податок
        currency: "USD",
        discountService: {
          getDiscount: () => 0.1, // 10% знижка
        },
      };
  
      const result = await orderProcessor.processOrder(order, "EUR");
  
      // Перевіряємо, чи викликаний конвертер із правильними параметрами
      expect(mockCurrencyConverter).toHaveBeenCalledWith(270, "USD", "EUR");
      // Очікуємо, що після конвертації сума буде 500
      expect(result).toBe(500);
    });
  
    test("should return the original price if currency conversion fails", async () => {
      const mockCurrencyConverter = jest.fn().mockRejectedValue(new Error("Conversion failed")); // Конвертер кидає помилку
      const orderProcessor = new OrderProcessor(mockCurrencyConverter);
  
      const order = {
        items: [
          { price: 100, quantity: 2 }, // 200
          { price: 50, quantity: 1 }, // 50
        ],
        taxRate: 0.2, // 20% податок
        currency: "USD",
        discountService: {
          getDiscount: () => 0.1, // 10% знижка
        },
      };
  
      const result = await orderProcessor.processOrder(order, "EUR");
  
      // Якщо конвертація не вдалася, результат повинен бути без змін — 270
      expect(result).toBe(270);
    });
  });