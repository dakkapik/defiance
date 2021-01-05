import { all, call } from "redux-saga/effects";
import { driversSagas } from "./drivers/drivers.saga";

export default function* rootSaga() {
  //Similiar to compose all the sagas
  yield all([call(driversSagas)]);
}
