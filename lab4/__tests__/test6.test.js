const { ApiHelper } = require("../labAssignment-lab4.js");

// <==================== Тест 6 ====================>

describe("Допоміжний метод отримання даних", () => {
  it("повертає коректні дані, якщо API відповідає правильно", async () => {
    const mockApiCall = jest.fn().mockResolvedValue({ data: "test data" });
    const helper = new ApiHelper();

    const output = await helper.fetchViaHelper(mockApiCall);

    expect(output).toEqual({ data: "test data" });
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });

  it("викидає помилку, якщо API повертає некоректне значення", async () => {
    const mockApiCall = jest.fn().mockResolvedValue(null);
    const helper = new ApiHelper();

    await expect(helper.fetchViaHelper(mockApiCall)).rejects.toThrow("Invalid data");
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });
});