import DriversActionTypes from "./drivers.types";

const INITIAL_STATE = {
  currentDrivers: [],
  position: {},
  socket: false,
};

const driverReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DriversActionTypes.DRIVERS_SOCKET_ON:
      return {
        ...state,
        socket: true,
      };

    case DriversActionTypes.ADD_ACTIVE_DRIVER:
      return {
        ...state,
        currentDrivers: action.payload,
      };
    case DriversActionTypes.DRIVERS_SOCKET_OFF:
      return {
        ...state,
        socket: false,
      };

    default:
      return state;
  }
};

export default driverReducer;
