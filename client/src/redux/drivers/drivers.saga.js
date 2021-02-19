import {
  all,
  take,
  call,
  takeLatest,
  cancel,
  select,
  fork,
  put,
} from "redux-saga/effects";

import SocketActionTypes from "../socket/socket.types";

import { disconnect, socketDriverOn, socketbug } from "./drivers.utlis";

const getSocket = (state) => state.socket.socket;
const getSocketStoreName = (state) => state.socket.socketStoreName.name;

function* read(socket) {
  const channel = yield call(socketDriverOn, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export function* Read_Emit_Or_Write_Emit(socket) {
  yield fork(read, socket);
}

export function* DriverSocketFlow() {
  const socket = yield select(getSocket);
  const storeName = yield select(getSocketStoreName);
  const bug = yield call(socketbug, storeName);
  while (true) {
    const emitAction = yield fork(Read_Emit_Or_Write_Emit, socket);
    //                                   function^          ^ pass in values
    //turn off everything if Driver_socket_off action has been called
    yield take(SocketActionTypes.TOGGLE_SOCKET_OFF);
    //Pretty self explantory we call disconnect on the socket
    yield call(disconnect, socket);
    yield call(disconnect, bug);
    // cancle the emitAction from the socket
    yield cancel(emitAction);
  }
}

// WE NEED TO LISTEN TO SOCKET REDUCER  IN ORDER  TO COMMENCE DriverSocketFlow
export function* onListenToSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, DriverSocketFlow);
}

export function* driversSagas() {
  yield all([call(onListenToSocket)]);
}
