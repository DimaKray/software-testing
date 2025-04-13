const { UserService } = require("../labAssignment-lab4.js")

// <==================== Тест 1 ====================>
    describe("UserService - метод привітання", () => {
        it("повинен викликати функцію формування імені з аргументами 'John' і 'Doe'", () => {
          const mockNameFormatter = jest.fn(() => "John Doe");
          const service = new UserService(mockNameFormatter);
      
          service.greet();
      
          expect(mockNameFormatter).toHaveBeenCalledWith("John", "Doe");
        });
      
        it("повертає правильне вітання у верхньому регістрі", () => {
          const mockNameFormatter = jest.fn(() => "John Doe");
          const service = new UserService(mockNameFormatter);
      
          const greetingText = service.greet();
      
          expect(greetingText).toBe("HELLO, JOHN DOE!");
        });
      });