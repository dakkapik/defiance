import OrdersActionTypes from "./orders.types";

export const OrdersSocketOn = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_ON,
});
export const OrdersSocketOff = () => ({
  type: OrdersActionTypes.ORDERS_SOCKET_OFF,
});

export const OrderApiSuccess = (orders) => ({
  type: OrdersActionTypes.ORDER_API_SUCCESS,
  payload: orders,
});
