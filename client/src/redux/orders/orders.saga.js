import { takeLatest, put, all, call, select } from "redux-saga/effects";
import SocketActionTypes from "../socket/socket.types";
import { fetchOrders } from "./orders.utils";
import { OrderApiSuccess, SetdragDropSuccess } from "./orders.action";

//we want to get orders
const GetSocketStoreName = (state) => state.socket.socketStoreName.name; //socket is an Object

export function* callOrderApi() {
  const storename = yield select(GetSocketStoreName);

  try {
    //Here we can pass StoreName
    const orders = yield call(fetchOrders);
    const ordersAndStoreName = { orders: orders, storename: storename };
    yield put(OrderApiSuccess(ordersAndStoreName));
    yield put(SetdragDropSuccess(ordersAndStoreName));
  } catch (error) {
    console.log("Request to orderApi Failed!");
  }
}
// We want to start order socket in the background when manager connects to
// the store
export function* listentoSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, callOrderApi);
}

export function* ordersSagas() {
  yield all([call(listentoSocket)]);
}
