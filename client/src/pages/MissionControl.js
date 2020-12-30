import React, { useState, useEffect, useRef } from "react";

import SocketStatus from "../assets/SocketStatus";
import DynamicDriverList from "../assets/DynamicDriverList";
import MapContainer from "../assets/MapContainer";
import StoreList from "../components/store-list/store-list.component";
import axios from "axios";
import "../style/MissionControl.css";

import { isEqual } from "lodash";
///api/users
export default function MissionControl() {
  // this one most generate the driver element that can be manipulated seperatly
  const [users, setUsers] = useState();
  const [activeDrivers, setActiveDrivers] = useState([]);

  const [drivers, setDrivers] = useState([{}]);

  const [position, setPosition] = useState({});

  const [loadSocket, setLoadSocket] = useState(false);

  const [store, setStore] = useState({ store: {} });

  //componentdidMount
  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  //ComponentDidUpdate
  useEffect(() => {
    const driverList = [];

    activeDrivers.forEach((driver) => {
      users.forEach((user) => {
        if (user.employeeId === driver.id) {
          driverList.push(user);
        }
      });
    });

    setDrivers(driverList);

    //dynamic driver elements
  }, [users, activeDrivers]);

  //ComponentDidUpdate

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevAmount = usePrevious(position);
  useEffect(() => {
    let x = isEqual(prevAmount, position);

    if (x === false) {
      let positions = drivers.map((driver) => {
        if (driver.employeeId === position.id) {
          driver.position = position.position;
        }
        return driver;
      });
      console.log("hello");
      setDrivers(positions);
    } else {
      console.log("suh");
      // console.log("nothing");
    }
  }, [drivers, position, prevAmount]);

  // destructering
  // const {
  //   position: {
  //     position: {
  //       coords: { accuracy },
  //     },
  //   },
  // } = position;

  return (
    <div className="body">
      <div className="map">
        <MapContainer store={store.store} drivers={drivers} />
        {loadSocket ? (
          <SocketStatus
            store={store}
            handleConnect={handleStore}
            setActiveDrivers={setActiveDrivers}
            setPosition={setPosition}
          />
        ) : null}

        {loadSocket ? (
          <DynamicDriverList drivers={drivers} />
        ) : (
          <StoreList handleConnect={handleStore} />
        )}
      </div>
      {/* <button
        onClick={() =>
          setPosition({
            position: {
              id: 3533,
              position: {
                coords: {
                  accuracy: accuracy + 1,
                  altitude: 0,
                  latitude: 26.259,
                  longitude: -80.27,
                },
                mocked: false,
                timestamp: 5325324523,
              },
            },
          })
        }
      >
        setposition
      </button>
      <button
        onClick={() =>
          setPosition({
            position: {
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
            },
          })
        }
      >
        setsameposition
      </button> */}
      <div className="bottom-bar">bottom bar</div>
    </div>
  );

  function handleStore(i) {
    setStore({ store: { name: i.name, id: i.number, location: i.location } });
    setLoadSocket((prevState) => !prevState);
  }
}
