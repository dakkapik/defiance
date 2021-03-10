const OrdersActionTypes = {
  // UI TYPES
  ORDERS_SOCKET_ON: "ORDERS_SOCKET_ON",
  ORDERS_SOCKET_OFF: "ORDERS_SOCKET_OFF",
  //API TYPES
  ORDER_API_SUCCESS: "ORDER_API_SUCCESS",
  ORDER_API_FAILURE: "ORDER_API_FAILURE",
  //DRAG DROP TYPES
  INITALIZE_DRIVER_FOR_DRAG_AND_DROP: "INITALIZE_DRIVER_FOR_DRAG_AND_DROP",
  REMOVE_DRIVER_FOR_DRAG_AND_DROP: "REMOVE_DRIVER_FOR_DRAG_AND_DROP",
  ADD_DRAG_DROP_TO_COLLECTION: "ADD_DRAG_DROP_TO_COLLECTION",
  ADD_DRAG_DROP_FAILURE_TO_COLLECTION: "ADD_DRAG_DROP_FAILURE_TO_COLLECTION",
  PERSIST_ORDER_COLUMN: "PERSIST_ORDER_COLUMN",
  PERSIST_ALL_COLUMN: "PERSIST_ALL_COLUMN",
};
export default OrdersActionTypes;
