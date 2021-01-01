import React, { useState, useEffect, useRef } from "react";

import SocketStatus from "../assets/SocketStatus";
import DynamicDriverList from "../assets/DynamicDriverList";
import MapContainer from "../assets/MapContainer";

import StoreList from "../components/store-list/store-list.component";
import axios from "axios";
import "./missioncontrol.styles.scss";
import { isEqual, isEmpty, clone } from "lodash";

/*

Position's state changes drivers position state

during socket inialization 

*/
export default function MissionControl() {
  const [activeDrivers, setActiveDrivers] = useState([
    { id: 3533 },
    { id: 4545 },
  ]);
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
  ]); // this one most generate the driver element that can be manipulated seperatly

  //
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

  const [users, setUsers] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get("/api/users", {
        cancelToken: source.token,
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log("Catched error: " + err.message);
      });

    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);
  function GetPreviousPosition(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevPosition = GetPreviousPosition(position);

  useEffect(() => {
    // Compare prevPosition and current position then SetDrivers()
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
  }, [position, drivers]);
  // let lat = drivers[0].position.coords.latitude;
  // console.log("socket", loadSocket);
  let latpos = position.position.coords.latitude;

  return (
    <div>
      <div className="map">
        {/* <MapContainer store={store.store} drivers={drivers} /> */}
        {loadSocket ? (
          <div>
            <SocketStatus
              store={store}
              handleConnect={handleStore}
              setActiveDrivers={setActiveDrivers}
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
  //setDrivers([(drivers[0].position.coords.latitude = lat + 1)])
  function handleStore(store) {
    setStore({
      store: { name: store.name, id: store.number, location: store.location },
    });
    setLoadSocket((prevState) => !prevState);
  }
}
