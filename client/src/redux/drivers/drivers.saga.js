import { takeLatest, all, call, put } from "redux-saga/effects";
import DriversActionTypes from "./drivers.types";
import { setDrivers } from "./drivers.action";
//destructure  it to reaveal variable
export function* Drivers({ payload }) {
  try {
    yield put(setDrivers(payload));
  } catch (error) {}
}

export function* OnDrivers() {
  yield takeLatest(DriversActionTypes.TOGGLE_DRIVERS_SOCKET, Drivers);
}

export function* driversSagas() {
  yield all([call(OnDrivers)]);
}
