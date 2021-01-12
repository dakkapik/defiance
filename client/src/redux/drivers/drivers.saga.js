import {
  all,
  take,
  call,
  takeLatest,
  cancel,
  fork,
  put,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import DriversActionTypes from "./drivers.types";
import io from "socket.io-client";
import axios from "axios";
import { AddActiveDriver } from "./drivers.action";

export function disconnect(socket) {
  socket.disconnect();
}

const getUser = (driverId) => {
  return axios.get(`/api/users/${driverId}`).then((res) => res.data);
};
/*
let GetUserPromises = [];

        Active_driver.forEach((id) => {
          GetUserPromises.push(getUser(id));
        });
        Promise.all(GetUserPromises).then((users) => {
         
        });
*/
/*
 let GetUserPromises = [];

        Active_driver.forEach((id) => {
          GetUserPromises.push(getUser(id));
        });

        Promise.all(GetUserPromises).then((users) => {
          emit(AddActiveDriver(users));
        });
*/
function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on("current-users", async (data) => {
      try {

        //Here lies a bunch of promises
        let Active_driver = Object.values(data.users);
        console.log(Active_driver)
        emit(AddActiveDriver(Active_driver));
      } catch (err) {
        console.log("User does not exist");
      }
    });
    socket.on("disconnect", (e) => {
      console.log(e);
    });
    return () => {
      socket.disconnect();
    };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* Read_Emit_Or_Write_Emit(socket) {
  yield fork(read, socket);
}

export function connect(storeName) {
  const socket = io(process.env.REACT_APP_endpoint);
  return new Promise((resolve, reject) => {
    socket.on("connect", (data) => {
      resolve(socket);
      socket.emit("new-user", {
        id: "mission-control",
        room: storeName,
        ms: true,
      });
    });
  });
}

export function* DriverSocketFlow({ payload: { name: StoreName } }) {
  //connect to the socket
  const socket = yield call(connect, StoreName);
  //                    function^   ^ pass in values

  while (true) {
    // not an infinite loop due to yield take(DriversActionTypes.DRIVERS_SOCKET_OFF))

    const emitAction = yield fork(Read_Emit_Or_Write_Emit, socket);
    //                                   function^          ^ pass in values
    //turn off everything if Driver_socket_off action has been called
    yield take(DriversActionTypes.DRIVERS_SOCKET_OFF);
    yield cancel(emitAction);
    yield call(disconnect, socket);
  }
}
// export default DriverSocketFlow;
//Also a listener listen's Driversocketon within action
export function* onDriverSocketStart() {
  yield takeLatest(DriversActionTypes.DRIVERS_SOCKET_ON, DriverSocketFlow);
}

export function* driversSagas() {
  yield all([call(onDriverSocketStart)]);
}
