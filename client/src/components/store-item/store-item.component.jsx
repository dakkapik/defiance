import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";
import { connect } from "react-redux";

import { DriverSocketOn } from "../../redux/drivers/drivers.action";
import { setConnectedStore } from "../../redux/stores/stores.action";
export const StoreItem = ({ storeInfo, DriverSocketOn, setConnectedStore }) => {
  return (
    <div className="storeitem">
      {/* <div className="storeitem storeitem--text"></div> */}
      <Button
        onClick={() => {
          DriverSocketOn(storeInfo);
          setConnectedStore(storeInfo);
        }}
        variant="outlined"
        color="inherit"
      >
        {storeInfo.name}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  DriverSocketOn: (info) => dispatch(DriverSocketOn(info)),
  setConnectedStore: (info) => dispatch(setConnectedStore(info)),
});

export default connect(null, mapDispatchToProps)(StoreItem);
