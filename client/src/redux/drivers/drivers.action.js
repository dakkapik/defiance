import DriversActionTypes from "./drivers.types";
/*

 Data Flow for calling actions
 
 Components -> Actions(Checks Type(String)) -> Reducers

 Data Flow for calling action with Saga

 Components ->  Saga(Generator function) -> Actions(Checks Type(String)) -> Reducers

 */

/**
 * @param {boolean} socketstatus
 * ToggleDriverSocket takes in boolean true or false
 * to activate or disable driversocket
 */

export const AddActiveDriver = (driver) => ({
  type: DriversActionTypes.ADD_ACTIVE_DRIVER,
  payload: driver,
});

export const toggleDriversSocket = (socketstatus) => ({
  type: DriversActionTypes.TOGGLE_DRIVERS_SOCKET,
  payload: socketstatus,
});

export const DriverSocketOn = (info) => ({
  type: DriversActionTypes.DRIVERS_SOCKET_ON,
  payload: info,
});

export const DriverSocketOff = (info) => ({
  type: DriversActionTypes.DRIVERS_SOCKET_OFF,
  payload: info,
});
