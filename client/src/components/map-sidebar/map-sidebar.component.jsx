import React, { useState } from "react";
import { connect } from "react-redux";
import "./map-sidebar.styles.scss";
import SocketStatus from "../socket-status/socket-status.component";

import Map from "../map/map.component";
import StoreList from "../store-list/store-list.component";
import arrow from "./arrow.png";
import Orders from "../orders/orders.component";
const MapSideBar = ({ socket }) => {
  const [isexpanded, setisexpanded] = useState(false);
  return (
    <div className="map-side-container">
      <Map />

      {socket ? (
        <div className="sidebar-container">
          <div className={isexpanded ? "side-bar-expanded " : "side-bar"}>
            <SocketStatus />
            <Orders isexpanded={isexpanded} />
          </div>
          <img
            src={arrow}
            alt="arrow"
            onClick={() => setisexpanded(!isexpanded)}
            className={isexpanded ? "emoji-expanded" : "emoji"}
          />
        </div>
      ) : (
        <div className="side-bar">
          <StoreList />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket: state.drivers.socket,
});
export default connect(mapStateToProps, null)(MapSideBar);
