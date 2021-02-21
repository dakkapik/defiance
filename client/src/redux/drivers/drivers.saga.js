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

/*

We can listen to any action within the array
for now we want to listen to when the socket starts

*/

export function* driversSagas() {
  yield all([call(ListenToSocket)]);
}

/* 

We listen to when the manager clicks a on a store and commence the generator function
DriverSocketFlow

*/

export function* ListenToSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, DriverSocketFlow);
}

/*

First We need to retrieve data from the socket reducer

*/
//socket is an Object
const GetSocket = (state) => state.socket.socket;
//StoreName is a String
const GetSocketStoreName = (state) => state.socket.socketStoreName.name;

/* DriverSocketFlow deals with driver socket operations */

export function* DriverSocketFlow() {
  /* We can pull state from other reducers using redux saga library select method */

  const socket = yield select(GetSocket);

  /* 

   These two lines of code are for when the manager disconnects
   and connects which will make all drivers appear

  */

  const storeName = yield select(GetSocketStoreName);
  //we need the storeName first to connect an undefined user to display all the drivers
  const bug = yield call(socketbug, storeName);

  /* 

  Yield represents that we are waiting for an action to be called so
  this does not produce a infinite loop!

  */
  while (true) {
    /* 

    We start the flow of socket.on  or socket.emit  using  
    Read_Emit_Or_Write_Emit function which requires the socket Object

    */
    const emitAction = yield fork(Read_Emit_Or_Write_Emit, socket);
    //                                    function^          ^ pass in values

    /* 

    The loop stops here when we listen to when the manager
    is pressing the disconnect button aka socket disconnect action
    
    */

    yield take(SocketActionTypes.TOGGLE_SOCKET_OFF);

    /*

    afterwards we prepare to shutdown the socket gracefully

    */

    yield call(disconnect, socket);
    yield call(disconnect, bug);
    // canceling the emitAction from the socket.on and pulling away from the while loop
    yield cancel(emitAction);
  }
}

export function* Read_Emit_Or_Write_Emit(socket) {
  yield fork(read, socket);
  /*

  we can add a write emit here if for instance the 
  manager wants to give a speific message
  to a driver
  
  */
}

export function* read(socket) {
  /*

  You can check all the socket.on in driver.utlis.js socketDriverOn function
  which needs the socket object

  */

  const channel = yield call(socketDriverOn, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
