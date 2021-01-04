/*
Data Flow(With Sagas)
            
 Components ->  Saga(Generator function) -> Actions(Checks Type(String)) -> Reducers

*/
import { all, call } from "redux-saga/effects";

export function* CallDrivers() {
  try {
    yield;
    // yield put(ActiveDriverSocket(payload));
  } catch (error) {}
}

export function* OnToggleDrivers() {
  /*
  takeLatest allows only one fetchData task to run at
  any moment. And it will be the latest started task.
  This calls the function Drivers
  */
  yield;
  // yield takeLatest(DriversActionTypes.TOGGLE_DRIVERS_SOCKET, CallDrivers);
}

export function* driversSagas() {
  yield all([call(OnToggleDrivers)]);
}
