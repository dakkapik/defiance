import React from "react";

import SocketStatus from "../../components/socket-status/socket-status.component";
import DynamicDriverList from "../../components/dynamic-driverlist/dynamic-driverlist.component";
import MapContainer from "../../components/map-container/map-container.component";
import StoreList from "../../components/store-list/store-list.component";

import "./missioncontrol.styles.scss";
import { connect } from "react-redux";
/*
Position's state changes drivers position state
during socket inialization 
*/

const MissionControl = ({ socket }) => {
  return (
    <div>
      <div className="map">
        <MapContainer />
        {socket ? (
          <div className="socket-dynamicdrivers">
            <SocketStatus />
            <DynamicDriverList />
          </div>
        ) : (
          <StoreList />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.drivers.socket,
});
export default connect(mapStateToProps, null)(MissionControl);
