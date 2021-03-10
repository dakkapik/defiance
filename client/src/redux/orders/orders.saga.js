//External libraries
import { takeLatest, put, all, call, select } from "redux-saga/effects";
//Listener
import SocketActionTypes from "../socket/socket.types";
import DriversActionTypes from "../drivers/drivers.types";
//Functions
import { fetchOrders } from "./orders.utils";
//Actions
import {
  SetdragDropSuccess,
  SetdragDropFailure,
  InitDriverDragAndDrop,
  RemoveDriverDragDrop,
} from "./orders.action";

//get storename
const GetStoreNameFromReducer = (state) => state.socket.socketStoreName.name; //socket is an Object

//get drivers
const GetDriverFromReducer = (state) => state.drivers.currentDrivers;

// we want to put the orders in the reducer apiorders: {},
// And we want to to showcase the orders in the reducer currentdragdrop: {},
// And we to save the drag and drop in the reducer dragdropcollection: []
export function* putOrdersAndDragAndDrop() {
  const storename = yield select(GetStoreNameFromReducer);

  try {
    //Right Now it's not dynamic so we make api call to Royal Palms
    const orders = yield call(fetchOrders);

    // we want to pass storeName because we want to specify
    // what drag and drop to save in dragdropcollections
    const ordersStoreName = {
      orders: orders,
      storename: storename,
    };

    yield put(SetdragDropSuccess(ordersStoreName));
  } catch (error) {
    const ordersFailure = {
      orders: [
        {
          address:
            "Try checking your internet connection and refreshing this page.Otherwise contact the admin",
          orderNumber: 404,
        },
      ],
      storename: storename,
    };
    //For any reason if /api/orders fails if the internet goes down we pass a failing order^
    yield put(SetdragDropFailure(ordersFailure));
    alert("Request to /api/orders has failed please refresh the page");
  }
}

// When a new Driver is added then we want to initalize the driver
// to our drag and drop
export function* InitalizeDriverDragAndDrop() {
  const driver = yield select(GetDriverFromReducer);
  const storename = yield select(GetStoreNameFromReducer);
  yield put(InitDriverDragAndDrop({ driver: driver, storename: storename }));
}
//get drivers
const GetRemovedDriverFromReducer = (state) => state.drivers.disconnectedDriver;
export function* RemoveDriverDragAndDrop() {
  const RemoveDriver = yield select(GetRemovedDriverFromReducer);
  const drivers = yield select(GetDriverFromReducer);
  yield put(
    RemoveDriverDragDrop({ currentdrivers: drivers, remove: RemoveDriver })
  );
}

//Start the order socket when a manager hits any store button
export function* listentoSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, putOrdersAndDragAndDrop);
}

// Listen to when a driver is connecting
export function* listentoAddActiveDriver() {
  yield takeLatest(
    DriversActionTypes.ADD_ACTIVE_DRIVER,
    InitalizeDriverDragAndDrop
  );
}
// Listen to when a driver is disconnecting
export function* listentoRemoveDriver() {
  yield takeLatest(
    DriversActionTypes.REMOVE_ACTIVE_DRIVER,
    RemoveDriverDragAndDrop
  );
}
//Begin with a listener here
export function* ordersSagas() {
  yield all([
    call(listentoSocket),
    call(listentoAddActiveDriver),
    call(listentoRemoveDriver),
  ]);
}
