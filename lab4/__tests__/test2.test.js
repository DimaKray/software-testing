const { UserService } = require("../labAssignment-lab4.js")
const { computeValue } = require("../labAssignment-lab4.js")
const { asyncError } = require("../labAssignment-lab4.js")
const { ApiClient } = require("../labAssignment-lab4.js")
const { ApiHelper } = require("../labAssignment-lab4.js")
const { calculateFinalPrice } = require("../labAssignment-lab4.js")
const { OrderProcessor } = require("../labAssignment-lab4.js")
// <----------------------------Завдання 2-------------------------------->

describe("task 2 - asyncHello function", () => {
    const asyncHello = () => {
      return Promise.resolve("hello world")
    }
  
    test('asyncHello should resolve with "hello world"', () => {
      return expect(asyncHello()).resolves.toBe("hello world")
    })
  })