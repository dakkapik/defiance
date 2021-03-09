import OrdersActionTypes from "./orders.types";
import ordersReducer from "./orders.reducer";

//https://www.youtube.com/watch?v=UOGxfvNwv-8
describe("Order Reducer", () => {
  const defaultState = {
    showorders: false,
    apiorders: {},
    dragdropcollection: [],
    currentdragdrop: {},
  };
  it("should return default state", () => {
    const newState = ordersReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });

  it("should return new state if receiving type", () => {
    const newState = ordersReducer(defaultState, {
      type: OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION,
      payload: {
        orders: [
          {
            address: "3620 NW 59TH PLACE",
            city: " COCONUT CREEK",
            date: " Feb 17",
            orderNumber: 50,
            phone: "5612996419 ",
            status: "completed",
            __v: 0,
            _id: "6038546f26348019c05b7049",
          },
        ],
        storename: "Royal Palm",
      },
    });

    // expect(newState).toEqual(posts);
  });
});
