import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";

const StoreItem = ({ storeInfo, handleConnect }) => {
  return (
    <div className="storeitem">
      <div className="storeitem storeitem--text">{storeInfo.name}</div>
      <Button
        onClick={() => handleConnect(storeInfo)}
        variant="outlined"
        color="inherit"
      >
        Connect
      </Button>
    </div>
  );
};

export default StoreItem;
