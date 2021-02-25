//External libraries
import { takeLatest, put, all, call, select } from "redux-saga/effects";
//Listener
import SocketActionTypes from "../socket/socket.types";
import DriversActionTypes from "../drivers/drivers.types";
//Functions
import { fetchOrders } from "./orders.utils";
//Actions
import {
  OrderApiSuccess,
  SetdragDropSuccess,
  InitDriverDragAndDrop,
} from "./orders.action";

//StoreName
const GetStoreNameFromReducer = (state) => state.socket.socketStoreName.name; //socket is an Object

export function* callOrderApi() {
  const storename = yield select(GetStoreNameFromReducer);

  try {
    //Right Now it's not dynamic so we make api call to Royal Palms
    const orders = yield call(fetchOrders);
    //Bind orders and storename
    const ordersAndStoreName = { orders: orders, storename: storename };
    //
    yield put(OrderApiSuccess(ordersAndStoreName));
    yield put(SetdragDropSuccess(ordersAndStoreName));
  } catch (error) {
    console.log("Request to orderApi Failed!");
  }
}

const GetDriverFromReducer = (state) => state.drivers.currentDrivers;

//We want to add all the driver to drag and drop
export function* InitalizeDriverDragAndDrop() {
  const driver = yield select(GetDriverFromReducer);
  yield put(InitDriverDragAndDrop(driver));
}

//Start the order socket when a manager hits any store button
export function* listentoSocket() {
  yield takeLatest(SocketActionTypes.INITALIZE_SOCKET, callOrderApi);
}
// Listen to when a driver is connecting
export function* listentoAddActiveDriver() {
  yield takeLatest(
    DriversActionTypes.ADD_ACTIVE_DRIVER,
    InitalizeDriverDragAndDrop
  );
}

export function* ordersSagas() {
  yield all([call(listentoSocket), call(listentoAddActiveDriver)]);
}
