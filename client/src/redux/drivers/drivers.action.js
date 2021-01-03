import DriversActionTypes from "./drivers.types";

export const toggleDriversSocket = (bool) => ({
  type: DriversActionTypes.TOGGLE_DRIVERS_SOCKET,
  payload: bool,
});

export const setDrivers = (bool) => ({
  type: DriversActionTypes.SET_DRIVERS,
  payload: bool,
});
