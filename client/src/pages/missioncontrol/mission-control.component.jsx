import React, { useState, useEffect, useRef } from "react";

import SocketStatus from "../../components/socket-status/socket-status.component";
import DynamicDriverList from "../../components/dynamic-driverlist/dynamic-driverlist.component";
import MapContainer from "../../components/map-container/map-container.component";
import StoreList from "../../components/store-list/store-list.component";
import { isEqual, clone } from "lodash";
import "./missioncontrol.styles.scss";
import { connect } from "react-redux";
/*
Position's state changes drivers position state
during socket inialization 
*/

const MissionControl = ({ socket }) => {
  // Renders the Map Mark
  const [drivers, setDrivers] = useState([]);
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

  const [store, setStore] = useState({ store: {} });
  //callback
  const handleStore = (store) => {
    setStore({
      store: { name: store.name, id: store.number, location: store.location },
    });
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

  return (
    <div>
      <div className="map">
        {/* <MapContainer store={store.store} drivers={drivers} /> */}
        {socket ? (
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

const mapStateToProps = (state) => ({
  socket: state.drivers.socket,
});
export default connect(mapStateToProps, null)(MissionControl);
