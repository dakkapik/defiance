import { combineReducers } from "redux";

import driverReducer from "./drivers/drivers.reducer";

const rootReducer = combineReducers({
  drivers: driverReducer,
});

export default rootReducer;
