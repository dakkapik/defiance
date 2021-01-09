import {
  all,
  take,
  call,
  fork,
  takeLatest,
  put,
  takeEvery,
  cancel,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import DriversActionTypes from "./drivers.types";
import io from "socket.io-client";
import { DriverSocketOn, DriverSocketOff } from "./drivers.action";

// function* read(socket) {
//   const channel = yield call(subscribe, socket);
//   while (true) {
//     let action = yield take(channel);
//     yield put(action);
//   }
// }

// function* handleIO(socket) {
//   yield fork(read, socket);
//   //yield fork(write, socket); //to send message to socket
// }

export function connect() {
  const socket = io(process.env.REACT_APP_endpoint);
  return new Promise((resolve, reject) => {
    socket.on("connect", (data) => {
      resolve(socket);
    });
  });
}

export function* DriverSocketFlow({ payload }) {
  //Listen for DriverSocketOn and get the payload
  //Payload is the onClicked store's information within storeitem component
  // console.log(payload);
  const socket = yield call(connect);

  // you can try catch the createsocketchannel
  while (true) {
    // connect to the socket
    //connect with id mission control and join room with the store's name
    socket.emit("new-user", {
      id: "mission-control",
      room: payload.name,
      ms: true,
    });
    // handle socket.on to ethier read or write(aka send message)
    // const task = yield fork(handleIO, socket);
    // Listen to the action DriverSocketOff  if it's called in a component
    // then disconnect the socket
    yield take(DriverSocketOff);
    socket.disconnect();
  }
}
export default DriverSocketFlow;
//Also a listener listen's Driversocketon within action
export function* onDriverSocketStart() {
  yield takeEvery(DriversActionTypes.DRIVERS_SOCKET_ON, DriverSocketFlow);
}

export function* driversSagas() {
  yield all([call(onDriverSocketStart)]);
}
