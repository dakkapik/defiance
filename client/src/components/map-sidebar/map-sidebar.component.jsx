import React, { useState } from "react";

import { connect } from "react-redux";

import "./map-sidebar.styles.scss";
//Actions
import {
  expandOrderDragDropSideBar,
  compressOrderDragDropSideBar,
} from "../../redux/orders/orders.action";

import {
  clearActiveDriver,
  showStorePanel,
} from "../../redux/drivers/drivers.action";
import { socketOff } from "../../redux/socket/socket.action";
//Components
import ArrowModalButton from "../arrow-modal-button/arrow-expanded-modal-button.component";
import Map from "../map/map.component";
import SaveModalButton from "../save-modal-button/save-modal-button.component";
import Button from "@material-ui/core/Button";
import StoreList from "../store-list/store-list.component";
import Orders from "../drag-drop-orders/orders.component";
//Assets
import arrow from "./arrow.png";
import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
import { DisconnectButtonStyles } from "./map-sidebar.styles";

/*
MapSideBar functionality
Renders: Map componenet always 
Renders components conditionally based on when the store buttons are clicked and the arrow button:
StoreList: conditionally
Dynamic Driver: conditionally
Orders: conditionally
*/

export const MapSideBar = ({
  // if no orders are within drivers then  compressOrderDragDropSidebar
  apiorders,
  unassigned_orders,
  //turn the socket off
  socketOff,

  //clear all drivers within the driver panel when disconnected
  clearActiveDriver,

  //when clicking the red arrow button
  showorders,
  expandOrderDragDropSideBar,
  compressOrderDragDropSideBar,

  //when pressing the disconnect button
  showStorePanel,
  // if true show driver panel, if false show store panel
  show_drivers_or_stores_panel,
}) => {
  const [show_arrow_modal, openArrowModal] = useState(false);
  const disconnect_button_classes = DisconnectButtonStyles();
  const handleClose = () => {
    openArrowModal(false);
  };

  const handleOpenArrowModal = () => {
    openArrowModal(true);
  };
  return (
    <div className="map-side-container">
      <Map />
      {/* 
       If Manager does click a store then socket=true  then dynamic driver loads with showorders being false
       */}
      {show_drivers_or_stores_panel ? (
        <div className="sidebar-container">
          <div className={showorders ? "side-bar-expanded " : "side-bar"}>
            {showorders ? (
              <div className="top-container-expanded">
                <div className="top-container-expanded__left-section" />
                <div className="top-container-expanded__right-section">
                  <SaveModalButton />
                </div>
              </div>
            ) : (
              <div className="top-container">
                <Button
                  classes={{
                    label: disconnect_button_classes.label,
                    root: disconnect_button_classes.root,
                  }}
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    socketOff();
                    showStorePanel();
                    clearActiveDriver();
                  }}
                >
                  Disconnect
                </Button>
              </div>
            )}

            {/*If Manager clicks the arrow then showorders is true then Order Component renders */}
            {showorders ? <Orders /> : <DynamicDriverList />}
          </div>
          <ArrowModalButton
            show_arrow_modal={show_arrow_modal}
            handleClose={handleClose}
          />
          {showorders ? (
            <img
              src={arrow}
              className="arrow-expanded"
              alt="expanded-arrow"
              onClick={() => {
                /*
               if no orders where dragged to a driver then don't popup a modal and go to full map screen   
              */

                apiorders.length === unassigned_orders.length
                  ? compressOrderDragDropSideBar()
                  : handleOpenArrowModal();
              }}
            />
          ) : (
            <img
              src={arrow}
              alt="arrow"
              onClick={() => {
                expandOrderDragDropSideBar();
              }}
              className="arrow"
            />
          )}
        </div>
      ) : (
        //If Manager does not click store socket=false then  StoreList component renders
        <div className="side-bar">
          <StoreList />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  apiorders: state.orders.apiorders,
  unassigned_orders: state.orders.currentdragdrop.columns["column-1"].orderIds,
  show_drivers_or_stores_panel: state.drivers.show_drivers_or_stores_panel,
  showorders: state.orders.showorders,
});

const mapDispatchToProps = (dispatch) => ({
  expandOrderDragDropSideBar: () => dispatch(expandOrderDragDropSideBar()),
  compressOrderDragDropSideBar: () => dispatch(compressOrderDragDropSideBar()),
  socketOff: () => dispatch(socketOff()),
  clearActiveDriver: () => dispatch(clearActiveDriver()),
  showStorePanel: () => dispatch(showStorePanel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSideBar);
