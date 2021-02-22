import OrdersActionTypes from "./orders.types";

export const OrdersSocketOn = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_ON,
});
export const OrdersSocketOff = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_OFF,
});

export const OrderApiSuccess = (OrdersAndStore) => ({
  type: OrdersActionTypes.ORDER_API_SUCCESS,
  payload: OrdersAndStore,
});

export const SetdragDropSuccess = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION,
  payload: OrdersAndStore,
});

export const PresistOrderColumn = (onDragEndProperties) => ({
  type: OrdersActionTypes.PERSIST_ORDER_COLUMN,
  payload: onDragEndProperties,
});
