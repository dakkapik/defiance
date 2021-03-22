import OrdersActionTypes from "./orders.types";

// when order api is successful
export const setdragDropSuccess = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION,
  payload: OrdersAndStore,
});

// when order api fails
export const setdragDropFailure = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_FAILURE_TO_COLLECTION,
  payload: OrdersAndStore,
});
// When manager clicks the save button
export const saveOrders = () => ({
  type: OrdersActionTypes.SAVE_ORDER,
});
// When the manager drags an order within the order column
export const persistOrderColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ORDER_COLUMN,
  payload: onDragEndProperties,
});
// When the manager drags an order within other columns like drivers
export const persistAllColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ALL_COLUMN,
  payload: onDragEndProperties,
});
// check the difference of drivers within state
export const deltaDriverDragAndDrop = (driversAndstore) => ({
  type: OrdersActionTypes.DELTA_DRIVER_FOR_DRAG_AND_DROP,
  payload: driversAndstore,
});
// when a driver leaves within the socket for more detail it's in drivers.utlis in drivers folder
export const removeDriverDragDrop = (driversAndremoveDriver) => ({
  type: OrdersActionTypes.REMOVE_DRIVER_FOR_DRAG_AND_DROP,
  payload: driversAndremoveDriver,
});
//when manager presses x button to an order
export const removeOrderFromDriver = (order) => ({
  type: OrdersActionTypes.REMOVE_ORDER_FROM_DRIVER,
  payload: order,
});

// UI CASES for expanded the mapsidebar-component and compressing
export const ordersSocketOn = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_ON,
});
export const ordersSocketOff = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_OFF,
});
