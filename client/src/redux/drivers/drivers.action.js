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
export const toggleDriversSocket = (socketstatus) => ({
  type: DriversActionTypes.TOGGLE_DRIVERS_SOCKET,
  payload: socketstatus,
});
