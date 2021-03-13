import { addDragDropToCollection, getCurrentDragandDrop } from "./orders.utils";

describe("Testing branches(if else) orders.utlis\n\n", () => {
  const mockPayload = {
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
  };
  const MockexistingOrderInCollection = [
    {
      columnOrder: ["column-1"],
      columns: {},
      orders: {},
      storename: "Royal Palm",
    },
  ];
  it("addDragDropToCollection FUNCTION\n\nif drag and drop does NOT exist in dragdropcollection. ADD it to dragdropcollection ARRAY ", () => {
    expect(addDragDropToCollection([], mockPayload).length).toBeGreaterThan(0);
  });
  it("addDragDropToCollection FUNCTION\n\nif drag and drop already exist in dragdropcollection: [] return current dragdropcollection ARRAY ", () => {
    expect(
      addDragDropToCollection(MockexistingOrderInCollection, mockPayload)
    ).toEqual(MockexistingOrderInCollection);
  });
  it("getCurrentDragandDrop FUNCTION\n\nif drag and drop data already exist in dragdropcollection: [] then return the currentdragdrop OBJECT  ", () => {
    expect(
      getCurrentDragandDrop(MockexistingOrderInCollection, mockPayload)
    ).toEqual(MockexistingOrderInCollection[0]);
  });
});
