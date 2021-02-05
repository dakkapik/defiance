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

      if (state.currentDrivers) {
        const array = [...state.currentDrivers, ...action.payload];
        const map = new Map();

        /*
        You can get unquie object in many different ways
        but i decided to get unquie id by EmployeeId
        The reason being is because there are many different ways to get a set
        a set such as this here's an example
        
        let obj = [{id:32, employeeId:2},{id:32,employeeId:2}, {id:6, employeeId:10}]
        
        the set of this by using the built in method Set(obj)

        would give [{id:32, employeeId:2} {id:6, employeeId:10}]
        

        This is a problem and the reason being is because we want to modify
        isActive within the object to true or false
        and if an object with isactive is false
        The set function would just be like ok i'm just gonna add a new Object
        with isActive false like this 

        Here's an example 

        let obj = [{id:32, isactive:true}, {id:32, isactive:false}]

        so say  line 71 executed the code below here that would turn isactive to true or false
        it would literally just add another object with  false

        so with this new map functionality we will set with just set with just the
        ID!
      
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
        //iterate through unquie_id_only  and set drivers online or offline
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
              unquie_id_only[index_driver].isActive = true;
              break;
            } else {
              unquie_id_only[index_driver].isActive = false;
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
