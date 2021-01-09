import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";
import { connect } from "react-redux";

import { DriverSocketOn } from "../../redux/drivers/drivers.action";

export const StoreItem = ({ storeInfo, DriverSocketOn }) => {
  return (
    <div className="storeitem">
      <div className="storeitem storeitem--text">{storeInfo.name}</div>
      <Button
        onClick={() => {
          DriverSocketOn(storeInfo);
        }}
        variant="outlined"
        color="inherit"
      >
        Connect
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  DriverSocketOn: (info) => dispatch(DriverSocketOn(info)),
});

export default connect(null, mapDispatchToProps)(StoreItem);
