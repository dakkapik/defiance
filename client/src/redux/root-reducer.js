import { combineReducers } from "redux";
//caching

import { createFilter } from "redux-persist-transform-filter";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import driverReducer from "./drivers/drivers.reducer";
import storesReducer from "./stores/stores.reducer";
import socketReducer from "./socket/socket.reducer";
import ordersReducer from "./orders/orders.reducer";

//Documentation- https://github.com/rt2zz/redux-persist#readme
const cacheActiveMovingDriverONLY = createFilter("drivers", [
  "ActiveMovingDriver",
]);

const cacheManagernameONLY = createFilter("socket", ["managerName"]);

const persistConfig = {
  key: "root",
  storage,
  transforms: [cacheActiveMovingDriverONLY, cacheManagernameONLY],
  // We don't want to cache orders,stores
  blacklist: ["orders", "stores"],
};

const rootReducer = combineReducers({
  socket: socketReducer,
  drivers: driverReducer,
  stores: storesReducer,
  orders: ordersReducer,
});

export default persistReducer(persistConfig, rootReducer);
