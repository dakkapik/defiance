import DriversActionTypes from "./drivers.types";
import { uniqWith, isEqual } from "lodash";
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
      /*
      if equal do nothing
      if not equal do something
      */
      // console.log("prevstate=", state.currentDrivers);

      /*

      // for (let index_online in online) {
      //   console.log(online[index_online].employeeId, "is online");
      // }
      removeDuplicateDriver = uniqWith(
          [...state.currentDrivers, ...action.payload],
          isEqual
        );
      */
      // let removeDuplicateDriver = [];
      const unquie_id_only = [];

      if (state.currentDrivers) {
        const array = [...state.currentDrivers, ...action.payload];
        const map = new Map();

        for (const item of array) {
          //unquie by id only
          if (!map.has(item.employeeId)) {
            map.set(item.employeeId, true); // set any value to Map
            if (item.employeeId) {
              unquie_id_only.push({
                employeeId: item.employeeId,
                firstName: item.firstName,
                lastName: item.lastName,
                isActive: item.isActive,
                isAdmin: item.isAdmin,
                __v: item.__v,
                _id: item._id,
              });
            }
          }
        }
      }

      if (unquie_id_only.length) {
        console.log("payload=", action.payload);
        console.log("unquie=", unquie_id_only);

        // isEqual(unquie_id_only, action.payload)
        for (let index_driver in unquie_id_only) {
          for (let index_online in action.payload) {
            if (
              unquie_id_only[index_driver].employeeId ===
              action.payload[index_online].employeeId
            ) {
              console.log(unquie_id_only[index_driver].firstName, "online");
              unquie_id_only[index_driver].isActive = true;
              break;
            } else {
              unquie_id_only[index_driver].isActive = false;
              console.log(unquie_id_only[index_driver].firstName, "offline");
            }
          }
        }
      }

      return {
        ...state,
        currentDrivers: unquie_id_only,
      };
    // {...state.currentDrivers[index], ...action.payload.coords }
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
