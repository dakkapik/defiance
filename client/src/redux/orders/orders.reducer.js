import OrdersActionTypes from "./orders.types";
import {
  addDragDropToCollection,
  getCurrentDragandDrop,
  PresistOrderColumn,
  SaveDragDropCollection,
  initalizeDriverDragDrop,
} from "./orders.utils";
import { differenceBy } from "lodash";
const INITIAL_STATE = {
  showorders: false,
  apiorders: {},
  dragdropcollection: [],
  currentdragdrop: {},
  driverdragdrop: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersActionTypes.ADD_DRAG_DROP_TO_COLLECTION:
      return {
        ...state,
        dragdropcollection: addDragDropToCollection(
          state.dragdropcollection,
          action.payload
        ),
        currentdragdrop: getCurrentDragandDrop(
          state.dragdropcollection,
          action.payload
        ),
      };
    case OrdersActionTypes.ORDER_API_SUCCESS:
      return {
        ...state,
        apiorders: action.payload,
      };
    case OrdersActionTypes.PERSIST_ORDER_COLUMN:
      const NewDragDropData = PresistOrderColumn(
        state.currentdragdrop,
        action.payload
      );

      return {
        ...state,
        currentdragdrop: NewDragDropData,
        dragdropcollection: SaveDragDropCollection(
          state.dragdropcollection,
          NewDragDropData
        ),
      };
    /*
    When a manager connects to a store and disconnects and drivers are incoming and leaving
    Initalize driver will update the drag and drop
    */
    case OrdersActionTypes.INITALIZE_DRIVER_FOR_DRAG_AND_DROP:
      const AddDriver = differenceBy(
        action.payload,
        state.driverdragdrop,
        "employeeId"
      );
      //if disconnect is hit  and drivers are going offline
      const RemoveDriver = differenceBy(
        state.driverdragdrop,
        action.payload,
        "employeeId"
      );
      const NewDragDrop = initalizeDriverDragDrop(
        state.currentdragdrop,
        AddDriver,
        RemoveDriver
      );
      console.log(NewDragDrop);
      return {
        ...state,
        driverdragdrop: action.payload,
      };

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
