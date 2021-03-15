import OrdersActionTypes from "./orders.types";

export const OrdersSocketOn = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_ON,
});
export const OrdersSocketOff = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_OFF,
});
// order Success
export const OrderApiSuccess = (OrdersAndStore) => ({
  type: OrdersActionTypes.ORDER_API_SUCCESS,
  payload: OrdersAndStore,
});
// order  Success
export const SetdragDropSuccess = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION,
  payload: OrdersAndStore,
});
// order failure
export const OrderApiFailure = (OrdersAndStore) => ({
  type: OrdersActionTypes.ORDER_API_FAILURE,
  payload: OrdersAndStore,
});
// order failure
export const SetdragDropFailure = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_FAILURE_TO_COLLECTION,
  payload: OrdersAndStore,
});

export const saveOrders = () => ({
  type: OrdersActionTypes.SAVE_ORDER,
});

export const PresistOrderColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ORDER_COLUMN,
  payload: onDragEndProperties,
});
export const PresistAllColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ALL_COLUMN,
  payload: onDragEndProperties,
});

export const InitDriverDragAndDrop = (driversAndstore) => ({
  type: OrdersActionTypes.INITALIZE_DRIVER_FOR_DRAG_AND_DROP,
  payload: driversAndstore,
});

export const RemoveDriverDragDrop = (driversAndremoveDriver) => ({
  type: OrdersActionTypes.REMOVE_DRIVER_FOR_DRAG_AND_DROP,
  payload: driversAndremoveDriver,
});
