import DriversActionTypes from "./drivers.types";

const INITIAL_STATE = {
  ActiveMovingDriver: [],
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
    // {...state.currentDrivers[index], ...action.payload.coords }
    case DriversActionTypes.SET_ACTIVE_DRIVER_POSITION:
      //find the index driver

      let index = state.currentDrivers.findIndex(
        (driver) => driver.employeeId === action.payload.id
      );

      // GET ACTIVE DRIVER DATA
      let Driver = state.currentDrivers[index];

      let ModifiedDriver;
      if (Driver) {
        //Merge Driver and position
        ModifiedDriver = { ...Driver, ...action.payload.coords };
      } else {
        return {
          ...state,
        };
      }
      let Activeindex = state.ActiveMovingDriver.findIndex(
        (active) => active.employeeId === action.payload.id
      );

      if (Activeindex === -1) {
        return {
          ...state,
          position: action.payload,
          ActiveMovingDriver: [ModifiedDriver, ...state.ActiveMovingDriver],
        };
      } else {
        //arr[index] = obj;

        state.ActiveMovingDriver.splice(Activeindex, 1);

        return {
          ...state,
          position: action.payload,
          ActiveMovingDriver: [ModifiedDriver, ...state.ActiveMovingDriver],
        };
      }

    case DriversActionTypes.DRIVERS_SOCKET_OFF:
      return {
        ...state,
        socket: false,
      };
    case DriversActionTypes.CLEAR_ACTIVE_DRIVER:
      return {
        ...state,
        ActiveMovingDriver: [],
      };

    default:
      return state;
  }
};

export default driverReducer;
