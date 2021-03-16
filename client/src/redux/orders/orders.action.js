import OrdersActionTypes from "./orders.types";

// order Success
export const setdragDropSuccess = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION,
  payload: OrdersAndStore,
});

// order failure
export const setdragDropFailure = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_FAILURE_TO_COLLECTION,
  payload: OrdersAndStore,
});

export const saveOrders = () => ({
  type: OrdersActionTypes.SAVE_ORDER,
});

export const persistOrderColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ORDER_COLUMN,
  payload: onDragEndProperties,
});
export const persistAllColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ALL_COLUMN,
  payload: onDragEndProperties,
});

export const initDriverDragAndDrop = (driversAndstore) => ({
  type: OrdersActionTypes.INITALIZE_DRIVER_FOR_DRAG_AND_DROP,
  payload: driversAndstore,
});

export const removeDriverDragDrop = (driversAndremoveDriver) => ({
  type: OrdersActionTypes.REMOVE_DRIVER_FOR_DRAG_AND_DROP,
  payload: driversAndremoveDriver,
});

// UI CASES
export const ordersSocketOn = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_ON,
});
export const ordersSocketOff = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_OFF,
});
