import { combineReducers } from "redux";
//caching

import { createFilter } from "redux-persist-transform-filter";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import driverReducer from "./drivers/drivers.reducer";
import storesReducer from "./stores/stores.reducer";
import socketReducer from "./socket/socket.reducer";
import ordersReducer from "./orders/orders.reducer";
import usersReducer from './users/users.reducer'
// READ ABOUT REDUX PERSIST HERE
//Documentation- https://github.com/rt2zz/redux-persist#readme
const cacheActiveMovingDriverONLY = createFilter("drivers", [
    "ActiveMovingDriver",
]);

// const cacheActiveMovingUserONLY = createFilter("users", [
//     "jwt-token",
// ]);

const persistConfig = {
    key: "root",
    storage,
    transforms: [cacheActiveMovingDriverONLY],
    // We don't want to cache orders,stores, and socket
    blacklist: ["orders", "stores", "socket", "users"],
};

const rootReducer = combineReducers({
    socket: socketReducer,
    drivers: driverReducer,
    stores: storesReducer,
    orders: ordersReducer,
    users: usersReducer
});

export default persistReducer(persistConfig, rootReducer);