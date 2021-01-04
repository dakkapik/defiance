import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";
import { connect } from "react-redux";

import { toggleDriversSocket } from "../../redux/drivers/drivers.action";

export const StoreItem = ({ storeInfo, toggleDriversSocket }) => {
  return (
    <div className="storeitem">
      <div className="storeitem storeitem--text">{storeInfo.name}</div>
      <Button
        onClick={() => {
          toggleDriversSocket(true);
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
  toggleDriversSocket: (bool) => dispatch(toggleDriversSocket(bool)),
});

export default connect(null, mapDispatchToProps)(StoreItem);
