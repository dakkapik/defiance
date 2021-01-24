import React, { useState } from "react";

import SocketStatus from "../../components/socket-status/socket-status.component";
import DynamicDriverList from "../../components/dynamic-driverlist/dynamic-driverlist.component";
import MapContainer from "../../components/map-container/map-container.component";
import StoreList from "../../components/store-list/store-list.component";

import "./missioncontrol.styles.scss";

import { connect } from "react-redux";

const MissionControl = ({ socket }) => {
  const [isexpanded, setisexpanded] = useState(false);
  console.log(isexpanded);
  return (
    <div className="misson-control-container">
      <div className="map-driver-container">
        <MapContainer />

        <div>
          {socket ? (
            <div
              className={
                isexpanded ? "side-bar-expanded " : "side-bar-container"
              }
            >
              {" "}
              <SocketStatus />
              <DynamicDriverList />
              <div onClick={() => setisexpanded(!isexpanded)} className="emoji">
                🔻
              </div>
            </div>
          ) : (
            <div className="side-bar-container">
              <StoreList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.drivers.socket,
});
export default connect(mapStateToProps, null)(MissionControl);
