import OrdersActionTypes from "./orders.types";
import {
  addDragDropToCollection,
  getCurrentDragandDrop,
  persistOrderColumn,
  saveDragDropCollection,
  deltaDriverDragDrop,
  persistAllColumn,
  removeDriverFromDragAndDrop,
} from "./orders.utils";

const INITIAL_STATE = {
  showorders: false, // red arrow component ui changes
  apiorders: [],
  dragdropcollection: [], // disconnecting and reconnect things will be saved

  /*orderIds array dynamically changes when a order is being dragged to the columns key
  columns: { "5578": { id: "5578", orderIds: [], title: "Orders" } },
  meaning if i drag orders to a driver an order will get pushed to their orderids KEY
  columns: { "5578": { id: "5578", orderIds: ['50'], title: "Orders" } },
  every columns key will have an orderIds even column-1 !

  However,Note! you might run into issues with both columnOrder key and columns key
  because both have to be in sync otherwise react beautiful dnd will crash!
  columnOrder: ["column-1","4545"],
  columns: { 
    "column-1": { id: "column-1", orderIds: [], title: "Orders" },
    "4545": { id: "4545", orderIds: [], title: "Orders" },
  },
  */
  currentdragdrop: {
    columnOrder: ["column-1"],
    columns: { "column-1": { id: "column-1", orderIds: [], title: "Orders" } },
    orders: {},
    storename: "",
  },
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION:
      return {
        ...state,
        apiorders: action.payload.orders,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          action.payload
        ),
      };

    case OrdersActionTypes.PERSIST_ORDER_COLUMN:
      const NewDragDropData = persistOrderColumn(
        state.currentdragdrop,
        action.payload
      );
      return {
        ...state,
        currentdragdrop: NewDragDropData,

        /* if the manager were to disconnect and reconnect
        then the orders would be left in tacked
        */
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewDragDropData
        ),
      };
    case OrdersActionTypes.PERSIST_ALL_COLUMN:
      const NewDragAllDropData = persistAllColumn(
        state.currentdragdrop,
        action.payload
      );

      return {
        ...state,
        currentdragdrop: { ...NewDragAllDropData },
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewDragAllDropData
        ),
      };

    /*When a manager connects to a store and disconnects and the
    drivers are incoming and leaving  in the background
    Initalize driver will update the drag and drop */
    case OrdersActionTypes.INITALIZE_DRIVER_FOR_DRAG_AND_DROP:
      //first find drag drop in collection
      const FoundDragDropInCollections = state.dragdropcollection.find(
        (collection) => collection.storename === action.payload.storename
      );

      if (FoundDragDropInCollections === undefined) return { ...state };
      const NewCurrentDragDrop = deltaDriverDragDrop(
        FoundDragDropInCollections,
        action.payload.driver
      );
      return {
        ...state,
        currentdragdrop: NewCurrentDragDrop,
        dragdropcollection: saveDragDropCollection(
          state.dragdropcollection,
          NewCurrentDragDrop
        ),
      };

    case OrdersActionTypes.REMOVE_DRIVER_FOR_DRAG_AND_DROP:
      const NewDriver = removeDriverFromDragAndDrop(
        state.currentdragdrop,
        action.payload
      );
      return {
        ...state,
        currentdragdrop: { ...NewDriver },
        dragdropcollection: saveDragDropCollection(state.dragdropcollection, {
          ...NewDriver,
        }),
      };
    case OrdersActionTypes.ADD_DRAG_DROP_FAILURE_TO_COLLECTION:
      return {
        ...state,
        apiorders: action.payload.orders,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          action.payload
        ),
      };

    case OrdersActionTypes.SAVE_ORDER:
      //https://material-ui.com/components/dialogs/#dialog
      let orderIds = [];
      for (const i in state.currentdragdrop.columns) {
        if (state.currentdragdrop.columns[i].id !== "column-1") {
          state.currentdragdrop.columns[i].orderIds.forEach(
            (orderid, index) => {
              orderIds.push(state.currentdragdrop.orders[orderid]);
            }
          );
        }
      }
      console.log(JSON.stringify(orderIds));

      return {
        ...state,
      };

    //UI UPDATES
    case OrdersActionTypes.ORDERS_SOCKET_ON:
      return {
        ...state,
        showorders: true,
      };
    case OrdersActionTypes.ORDERS_SOCKET_OFF:
      return {
        ...state,
        showorders: false,
      };

    default:
      return state;
  }
};

export default ordersReducer;
