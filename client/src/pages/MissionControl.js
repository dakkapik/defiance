import React, { useState, useEffect } from "react";

import MapContainer from "../assets/MapContainer";
import SocketStatus from "../assets/SocketStatus";
import DynamicDriverList from "../assets/DynamicDriverList";

import StoreList from "../components/store-list/store-list.component";

import "../style/MissionControl.css";

export default function MissionControl() {
  const [users, setUsers] = useState();
  const [activeDrivers, setActiveDrivers] = useState([]);

  const [drivers, setDrivers] = useState([]); // this one most generate the driver element that can be manipulated seperatly

  const [position, setPosition] = useState({});

  const [loadSocket, setLoadSocket] = useState(false);

  const [store, setStore] = useState({ store: {} });
  console.log(process.env.REACT_APP_endpoint);
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

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
  }, [activeDrivers]);

  useEffect(() => {
    let positions = drivers.map((driver) => {
      if (driver.employeeId === position.id) {
        driver.position = position.position;
      }
      return driver;
    });
    setDrivers(positions);
  }, [position]);

  return (
    <div className="body">
      <div className="map">
        {/* <MapContainer store={store.store} drivers={drivers} /> */}
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

      <div className="bottom-bar">bottom bar</div>
    </div>
  );

  function handleStore(i) {
    setStore({ store: { name: i.name, id: i.number, location: i.location } });
    setLoadSocket((prevState) => !prevState);
  }
}

async function getUsers() {
  return await fetch(process.env.REACT_APP_endpoint + "/api/users")
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("fetch error: " + error);
    });
}
