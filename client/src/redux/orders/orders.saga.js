import { takeLatest, put, all, call } from "redux-saga/effects";
import DriversActionTypes from "../drivers/drivers.types";
import OrdersActionTypes from "../orders/orders.types";
import { fetchOrders } from "./orders.utils";
import { OrderApiSuccess } from "./orders.action";
// const getSTATE_FROM_DRIVER_REDUCER = (state) => state.drivers.justadded;

// export function* RETREIVE_DATA_FROM_LISTENER() {
//   const items = yield select(getSTATE_FROM_DRIVER_REDUCER);

//   console.log("ADD ACTIVE DRIVER IN STORE SAGA", items);
// }

export function* callOrderApi() {
  try {
    const orders = yield call(fetchOrders);
    yield put(OrderApiSuccess(orders));
  } catch (error) {
    console.log("Request to orderApi Failed!");
  }
}

export function* listenToOrders() {
  yield takeLatest(OrdersActionTypes.ORDERS_SOCKET_ON, callOrderApi);
}
export function* addDragdropData() {
  console.log("hello world");
}

export function* listenToActiveDriver() {
  yield takeLatest(DriversActionTypes.ADD_ACTIVE_DRIVER, addDragdropData);
}
export function* ordersSagas() {
  yield all([call(listenToOrders)]);
}
