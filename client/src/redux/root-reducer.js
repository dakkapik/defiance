import { combineReducers } from "redux";
//caching

import {
  createFilter,
  createBlacklistFilter,
} from "redux-persist-transform-filter";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { createWhitelistFilter } from "redux-persist-transform-filter";
import driverReducer from "./drivers/drivers.reducer";
import storesReducer from "./stores/stores.reducer";

const saveSubsetFilter = createFilter("drivers", ["ActiveMovingDriver"]);

const persistConfig = {
  key: "root",
  storage,
  transforms: [saveSubsetFilter],
  // transforms: [createWhitelistFilter("drivers", [])],
};

const rootReducer = combineReducers({
  drivers: driverReducer,
  stores: storesReducer,
});

export default persistReducer(persistConfig, rootReducer);
