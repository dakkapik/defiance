import { all, call, put, takeLatest } from "redux-saga/effects";
import SocketActionTypes from "./socket.types";

import { Socket } from "./socket.action";
import { Connect_To_Socket_With_StoreId } from "./socket.utils";

export function* SetSocket({ payload: { storeId } }) {
  const socket = yield call(Connect_To_Socket_With_StoreId, {
    storeId: storeId,
  });
  //Rember to do a try and catch with this
  yield put(Socket(socket));
}
//SET_SOCKET_STORE_NAME is being listened from store-item component
export function* onSetSocket() {
  yield takeLatest(SocketActionTypes.SET_SOCKET_STORE_NAME, SetSocket);
}

export function* socketSagas() {
  yield all([call(onSetSocket)]);
}
