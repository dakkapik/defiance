import { takeLatest, put, all, call } from "redux-saga/effects";
import SocketActionTypes from "../socket/socket.types";
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

export function* listentoSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, callOrderApi);
}

export function* ordersSagas() {
  yield all([call(listentoSocket)]);
}
