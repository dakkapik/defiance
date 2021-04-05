const OrdersActionTypes = {
  // UI TYPES
  ORDERS_SOCKET_ON: "ORDERS_SOCKET_ON",
  ORDERS_SOCKET_OFF: "ORDERS_SOCKET_OFF",
  //DRAG DROP TYPES
  DELTA_DRIVER_FOR_DRAG_AND_DROP: "DELTA_DRIVER_FOR_DRAG_AND_DROP",

  REMOVE_DRIVER_FROM_DRAG_AND_DROP: "REMOVE_DRIVER_FROM_DRAG_AND_DROP",
  REMOVE_ORDER_FROM_DRIVER: "REMOVE_ORDER_FROM_DRIVER",
  ADD_APIORDER_SUCCESS_DRAG_DROP_TO_COLLECTION:
    "ADD_APIORDER_SUCCESS_DRAG_DROP_TO_COLLECTION",
  ADD_APIORDER_FAILURE_DRAG_DROP_TO_COLLECTION:
    "ADD_APIORDER_FAILURE_DRAG_DROP_TO_COLLECTION",
  PERSIST_ORDER_COLUMN: "PERSIST_ORDER_COLUMN",
  PERSIST_ALL_COLUMN: "PERSIST_ALL_COLUMN",

  SAVE_ORDER: "SAVE_ORDER",
  DISCARD_ORDER_CHANGES: "DISCARD_ORDER_CHANGES",
  //socket updates
  ORDER_DISPLAY_SOCKET_UPDATE: "ORDER_DISPLAY_SOCKET_UPDATE",
};
export default OrdersActionTypes;
