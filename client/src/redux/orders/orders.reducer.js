import OrdersActionTypes from "./orders.types";
import {
  addDragDropToCollection,
  getCurrentDragandDrop,
  PresistOrderColumn,
  UpdateDragDropCollection,
} from "./orders.utils";

const INITIAL_STATE = {
  showorders: false,
  apiorders: {},
  dragdropcollection: [],
  currentdragdrop: {},
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
        dragdropcollection: UpdateDragDropCollection(
          state.dragdropcollection,
          NewDragDropData
        ),
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
