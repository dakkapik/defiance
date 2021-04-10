import OrdersActionTypes from "./orders.types";

//  when api order succeeds add it to currentdragdrop reducer
export const setupCurrentDragDrop = (OrdersAndStore) => ({
  type: OrdersActionTypes.SETUP_CURRENT_DRAG_DROP,
  payload: OrdersAndStore,
});
//when socket gives an order update
export const socketOrderDisplayUpdate = (driver_completed_order) => ({
  type: OrdersActionTypes.ORDER_DISPLAY_SOCKET_UPDATE,
  payload: driver_completed_order,
});

// when api order fails add custom failure to currentdragdrop reducer
export const addApiOrderFailureDragDrop = (OrdersAndStore) => ({
  type: OrdersActionTypes.ADD_APIORDER_FAILURE_DRAG_DROP_TO_COLLECTION,
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
  type: OrdersActionTypes.REMOVE_DRIVER_FROM_DRAG_AND_DROP,
  payload: driversAndremoveDriver,
});
//when manager presses x button to an order
export const removeOrderFromDriver = (order) => ({
  type: OrdersActionTypes.REMOVE_ORDER_FROM_DRIVER,
  payload: order,
});

export const discardOrderChanges = () => ({
  type: OrdersActionTypes.DISCARD_ORDER_CHANGES,
});

// UI CASES for expanded the mapsidebar-component and compressing
export const expandOrderDragDropSideBar = () => ({
  type: OrdersActionTypes.EXPAND_ORDER_DRAG_DROP_SIDEBAR,
});
export const compressOrderDragDropSideBar = () => ({
  type: OrdersActionTypes.COMPRESS_ORDER_DRAG_DROP_SIDEBAR,
});
