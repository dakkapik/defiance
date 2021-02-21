import OrdersActionTypes from "./orders.types";
const INITIAL_STATE = {
  showorders: false,
  orders: {},
  dragdropdata: {
    orders: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Orders",
        orderIds: [],
      },
    },
    columnOrder: ["column-1"],
  },
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case OrdersActionTypes.ORDER_API_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default ordersReducer;
