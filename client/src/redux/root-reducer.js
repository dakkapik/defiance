import { combineReducers } from "redux";

import driverReducer from "./drivers/drivers.reducer";
import storesReducer from "./stores/stores.reducer";
const rootReducer = combineReducers({
  drivers: driverReducer,
  stores: storesReducer,
});

export default rootReducer;
