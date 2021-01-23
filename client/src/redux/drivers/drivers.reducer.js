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
      //what we are putting in the state
      const unquie_id_only = [];
      /*
      **Objective show circle status***

      It would make sense to make request to the server for whoever
      lies within that room maybe the user would have an array of stores in their
      object

      Take for instance this  felipe object 

      {
      employeeId:6666,
      Name:'felipe',
      store:['Royal Palms']
      }

      Thus when the client does  /api/users/   pass in params {store:'royal palm'}
      ......
      it would return all the users that are associated with royal palms
      and maybe if they work at two stores? which i don't think it be possible lol

      
      ....
      Anyways...

      Once all the users are retreived with the their associated stores
      then we can compare it with the socket.on('current-users')

      and toggle who is online and who is offline...


      ***important****
      this would require the user for reactNative to update /api/users/ object 
      and add a new key in there with their associated store

      */
      if (state.currentDrivers) {
        const array = [...state.currentDrivers, ...action.payload];
        const map = new Map();
        //You can get unquie object in many different ways
        // but i decided to get unquie id by EmployeeId
        /*
        here's how it works
        Example 
        Input
        [{id: 32}, {id:32}, {id:2}]

        Output 
         [{id: 32} {id:2}]
        */
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
      //only begin when there is at least one set inside unquie_id_only
      if (unquie_id_only.length) {
        console.log(action.payload);
        for (let index_driver in unquie_id_only) {
          //if they are 0 people online put them all offline!
          if (action.payload.length === 0) {
            for (let driver_index in unquie_id_only) {
              unquie_id_only[driver_index].isActive = false;
            }
            break;
          }
          // Compare what's in state and current-user socket
          // switch isActive to true or false;
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
