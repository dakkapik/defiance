import DriversActionTypes from "./drivers.types";

const INITIAL_STATE = {
  ActiveMovingDriver: [],
  currentDrivers: [],
  justadded: undefined,
  disconnectedDriver: undefined,
  disconnectTrigger: false,
  // historydriver: [],
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
      let justadded = {};
      if (state.currentDrivers) {
        if (state.currentDrivers.length === 0) {
          justadded = action.payload[0];
        } else {
          justadded = action.payload[action.payload.length - 1];
        }
      }
      // Code for recording drivers throughout the day
      // const unquie_id_only = [];
      // if (state.historydriver) {
      //   const array = [...state.historydriver, ...action.payload];
      //   const map = new Map();

      //   for (const item of array) {
      //     //unquie by id only
      //     if (!map.has(item.employeeId)) {
      //       map.set(item.employeeId, true); // set any value to Map
      //       if (item.employeeId) {
      //         unquie_id_only.push({
      //           employeeId: item.employeeId,
      //           firstName: item.firstName,
      //           lastName: item.lastName,
      //           isActive: item.isActive,
      //           isAdmin: item.isAdmin,
      //           __v: item.__v,
      //           _id: item._id,
      //         });
      //       }
      //     }
      //   }
      // }

      return {
        ...state,
        currentDrivers: action.payload,
        // historydriver: unquie_id_only,
        justadded: justadded,
      };

    case DriversActionTypes.REMOVE_ACTIVE_DRIVER:
      return {
        ...state,

        currentDrivers: state.currentDrivers.filter(
          (driver) => driver.employeeId !== action.payload
        ),
        disconnectedDriver: action.payload,
        disconnectTrigger: !state.disconnectTrigger,
      };

    case DriversActionTypes.SET_ACTIVE_DRIVER_POSITION:
      //find the index driver with there position
      let index = state.currentDrivers.findIndex(
        (driver) => driver.employeeId === action.payload.id
      );
      // use action.payload.id which is position data to find the driver in current driver
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
      // if Active driver does not exist  in action.payload
      if (Activeindex === -1) {
        return {
          ...state,
          position: action.payload,
          ActiveMovingDriver: [ModifiedDriver, ...state.ActiveMovingDriver],
        };
      } else {
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
