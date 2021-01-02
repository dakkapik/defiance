import React, { useState, useEffect, useRef } from "react";

import SocketStatus from "../assets/SocketStatus";
import DynamicDriverList from "../assets/DynamicDriverList";
import MapContainer from "../assets/MapContainer";
import StoreList from "../components/store-list/store-list.component";
import { isEqual, clone } from "lodash";
import "./missioncontrol.styles.scss";
/*

Position's state changes drivers position state

during socket inialization 


*/

const MissionControl = () => {
  // Renders the Map Mark

  const [drivers, setDrivers] = useState([
    {
      firstName: "Felipe",
      lastName: "Rodas",
      employeeId: 3533,
      position: {
        coords: {
          accuracy: 5,
          altitude: 0,
          latitude: 26.259,
          longitude: -80.27,
        },
        mocked: false,
        timestamp: 5325324523,
      },
    },
    {
      firstName: "George",
      lastName: "Marrone",
      employeeId: 4545,

      position: {
        coords: {
          accuracy: 5,
          altitude: 0,
          latitude: 26.3,
          longitude: -80.27,
        },
        mocked: false,
        timestamp: 5325324523,
      },
    },
  ]);
  const [position, setPosition] = useState({
    id: 3533,
    position: {
      coords: {
        accuracy: 5,
        altitude: 0,
        latitude: 26.259,
        longitude: -80.27,
      },
      mocked: false,
      timestamp: 5325324523,
    },
  });

  const [loadSocket, setLoadSocket] = useState(false);

  const [store, setStore] = useState({ store: {} });

  const handleStore = (store) => {
    setStore({
      store: { name: store.name, id: store.number, location: store.location },
    });
    setLoadSocket((prevState) => !prevState);
  };

  const GetPreviousPosition = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevPosition = GetPreviousPosition(position);
  //Updates the drivers position whenever position changes in the socket
  useEffect(() => {
    // Compares changes between prevPosition and position
    // This elimnate infinite loop and dependency Error
    if (isEqual(prevPosition, position) === false) {
      //Create a copy of
      let drivers_clone = clone(drivers).map((driver) => {
        if (driver.employeeId === position.id) {
          driver.position = position.position;
        }
        return driver;
      });
      setDrivers(drivers_clone);
    }
  }, [position, drivers, prevPosition]);
  let latpos = position.position.coords.latitude;
  console.log(store);

  //mission control passes the store and the drivers
  //Map container is dependent on missioncontrol
  return (
    <div>
      <div className="map">
        <MapContainer store={store.store} drivers={drivers} />
        {loadSocket ? (
          <div className="socket-dynamicdrivers">
            <SocketStatus
              store={store}
              handleConnect={handleStore}
              setPosition={setPosition}
            />
            <DynamicDriverList drivers={drivers} />
          </div>
        ) : (
          <StoreList handleConnect={handleStore} />
        )}
      </div>

      <div className="bottom-bar">
        <button
          onClick={() =>
            setPosition({
              id: 3533,
              position: {
                coords: {
                  accuracy: 5,
                  altitude: 0,
                  latitude: latpos + 0.001,
                  longitude: -80.27,
                },
                mocked: false,
                timestamp: 5325324523,
              },
            })
          }
        >
          changePos
        </button>
      </div>
    </div>
  );
};

export default MissionControl;
