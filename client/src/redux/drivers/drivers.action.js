import DriversActionTypes from "./drivers.types";

export const ClearActiveDriver = () => ({
  type: DriversActionTypes.CLEAR_ACTIVE_DRIVER,
});

export const AddActiveDriver = (driver) => ({
  type: DriversActionTypes.ADD_ACTIVE_DRIVER,
  payload: driver,
});

export const RemoveActiveDriver = (driver) => ({
  type: DriversActionTypes.REMOVE_ACTIVE_DRIVER,
  payload: driver,
});

export const SetActiveDriverPosition = (position) => ({
  type: DriversActionTypes.SET_ACTIVE_DRIVER_POSITION,
  payload: position,
});
