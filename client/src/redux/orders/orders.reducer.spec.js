import OrdersActionTypes from "./orders.types";
import ordersReducer from "./orders.reducer";
import { expect } from "chai";
//https://www.youtube.com/watch?v=UOGxfvNwv-8
describe("Order Reducer", () => {
  it("should return default state", () => {
    const newState = ordersReducer(undefined, {});
    expect(newState).toEqual();
  });
});
