import { combineReducers } from "redux";
//caching

import { createFilter } from "redux-persist-transform-filter";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { createWhitelistFilter } from "redux-persist-transform-filter";
import driverReducer from "./drivers/drivers.reducer";
import storesReducer from "./stores/stores.reducer";

//Caches only drivers with the subset of ActiveMovingDriver /aka array of position
//Also The reducers on initial load will only be
/*

drivers{
  ActiveMovingDriver: []
}
At First!

then after some updates it will load the rest of the reducer

*/
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
