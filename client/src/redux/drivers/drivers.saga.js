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
//We start by initalizing the driver saga and first listen to a sort of action
// for now we are just listening to the socket
export function* driversSagas() {
  yield all([call(onListenToSocket)]);
}
/*We listen to an action from the socket reducer socket.action.js
and commence DriverSocketFlow */
export function* onListenToSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, DriverSocketFlow);
}

//We can retrieve data from any reducer like this
//for this instance we are getting the socket(Object) and StoreName(STRING)
const getSocket = (state) => state.socket.socket;
const getSocketStoreName = (state) => state.socket.socketStoreName.name;

//We start DriverSocketflow once we have retrieved socket information
// and start to prepare socket.on
export function* DriverSocketFlow() {
  const socket = yield select(getSocket);
  //These two lines of code are for when the manager disconnects
  // and connects all drivers will show up
  const storeName = yield select(getSocketStoreName);
  const bug = yield call(socketbug, storeName);
  // Yield repersents that we are waiting for an action to be called
  while (true) {
    // fork Creates an Effect description that instructs the middleware to perform a non-blocking call on
    // on fn which basically means fork starts no matter what
    // this is where the socket operation starts
    const emitAction = yield fork(Read_Emit_Or_Write_Emit, socket);
    //                               function^          ^ pass in values
    // We listen to the manager when he is pressing the disconnect button
    // afterwards we perform the code after it
    yield take(SocketActionTypes.TOGGLE_SOCKET_OFF);
    //Pretty self explantory we call disconnect on the socket
    // to gracefully disconnect without the socket staying on
    yield call(disconnect, socket);
    yield call(disconnect, bug);
    // cancle the emitAction from the socket.on
    yield cancel(emitAction);
  }
}

export function* Read_Emit_Or_Write_Emit(socket) {
  yield fork(read, socket);
  // we can add a write emit here
}

export function* read(socket) {
  const channel = yield call(socketDriverOn, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
