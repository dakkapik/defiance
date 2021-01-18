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
import { AddActiveDriver, SetActiveDriverPosition } from "./drivers.action";

export function disconnect(socket) {
  socket.disconnect();
}

const getUser = (driverId) => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get(`/api/users/${driverId}`, { cancelToken: token })
    .then((res) => res.data);
};
const ConvertIds = (UseridArray) => {
  let GetUserPromises = [];
  UseridArray.forEach((id) => {
    GetUserPromises.push(getUser(id));
  });
  return GetUserPromises;
};

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on("current-users", async (data) => {
      try {
        console.log(data);
        //Object.values(data.users) convert json to array
        const PromisesRequest = ConvertIds(Object.values(data.users));
        //Iterate through all the promises and put em in redux
        Promise.all(PromisesRequest).then((users) => {
          emit(AddActiveDriver(users));
        });
      } catch (err) {
        console.log(
          "A promise has failed to request to the API within PromisesRequest Array "
        );
      }
    });
    //most intensive
    socket.on("d-position", (position, id, store) => {
      position["id"] = id;
      position["store"] = store;

      emit(SetActiveDriverPosition(position));
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

export function* Read_Emit_Or_Write_Emit(socket) {
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
export function socketbug(storeName) {
  const sockbug = io(process.env.REACT_APP_endpoint);
  sockbug.on("connect", () => {
    sockbug.emit("new-user", {
      room: storeName,
      MS: false,
    });
  });
  return sockbug;
}

export function* DriverSocketFlow({ payload: { name: StoreName } }) {
  //connect to the socket
  const socket = yield call(connect, StoreName);
  //                    function^   ^ pass in values
  /*


  When you hit disconnect 
  and a user connect to a store example. Royal Palms
  socket.emit('current-users') won't activate. Thus does not show user.

  ****to test***** 
  
  first connect then disconnect from store to initalize the room

  then have a user 

  do 

  socket.on("connect", () => {
  socket.emit("new-user", {
    id: 4545,
    room: "Royal Palm",
    MS: false,
  });
  });

  it will not show up..


  */
  const bug = yield call(socketbug, StoreName);
  while (true) {
    // not an infinite loop due to yield take(DriversActionTypes.DRIVERS_SOCKET_OFF))

    const emitAction = yield fork(Read_Emit_Or_Write_Emit, socket);
    //                                   function^          ^ pass in values
    //turn off everything if Driver_socket_off action has been called
    yield take(DriversActionTypes.DRIVERS_SOCKET_OFF);

    yield call(disconnect, socket);
    yield call(disconnect, bug);
    yield cancel(emitAction);
  }
}

//Also a listener listen's Driversocketon within action
export function* onDriverSocketStart() {
  yield takeLatest(DriversActionTypes.DRIVERS_SOCKET_ON, DriverSocketFlow);
}

export function* driversSagas() {
  yield all([call(onDriverSocketStart)]);
}
