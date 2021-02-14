import React, { useState } from "react";

import { connect } from "react-redux";
import "./map-sidebar.styles.scss";
import Button from "@material-ui/core/Button";
import {
  DriverSocketOff,
  ClearActiveDriver,
} from "../../redux/drivers/drivers.action";
import { GenerateUser } from "../../components-test/generateuser.component";

import Map from "../map/map.component";
import StoreList from "../store-list/store-list.component";
import arrow from "./arrow.png";
import Orders from "../orders/orders.component";

const MapSideBar = ({ socket, DriverSocketOff, ClearActiveDriver }) => {
  const [isexpanded, setisexpanded] = useState(false);

  return (
    <div className="map-side-container">
      <Map />

      {socket ? (
        //Render Orders and Disconnect button
        <div className="sidebar-container">
          <div className={isexpanded ? "side-bar-expanded " : "side-bar"}>
            <div className="disconnect-container">
              <GenerateUser id={3533} />
              <GenerateUser id={4545} />
              <GenerateUser id={5679} />

              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  DriverSocketOff(false);
                  ClearActiveDriver();
                }}
              >
                Disconnect
              </Button>
            </div>
            <Orders isexpanded={isexpanded} />
          </div>
          <img
            src={arrow}
            alt="arrow"
            onClick={() => setisexpanded(!isexpanded)}
            className={isexpanded ? "arrow-expanded" : "arrow"}
          />
        </div>
      ) : (
        //Render Stores
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

const mapDispatchToProps = (dispatch) => ({
  DriverSocketOff: (bool) => dispatch(DriverSocketOff(bool)),
  ClearActiveDriver: () => dispatch(ClearActiveDriver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSideBar);
