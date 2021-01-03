import DriversActionTypes from "./drivers.types";

const INITIAL_STATE = {
  currentDrivers: [{}],
  position: {},
  socket: false,
};

const driverReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DriversActionTypes.SET_DRIVERS:
      return {
        ...state,
        currentDrivers: action.payload,
        socket: action.payload,
      };

    case DriversActionTypes.SET_DRIVER_POSITION:
      return {
        ...state,
        position: action.payload,
      };

    default:
      return state;
  }
};

export default driverReducer;
