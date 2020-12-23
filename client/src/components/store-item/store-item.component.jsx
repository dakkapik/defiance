import React from "react";
import Button from "@material-ui/core/Button";
import "./store-item.styles.scss";

const StoreItem = ({ name, handleConnect, i }) => {
  return (
    <div className="storeitem">
      <div className="storeitem storeitem--text">{name}</div>
      <Button
        onClick={() => handleConnect(i)}
        variant="outlined"
        color="default"
      >
        Connect
      </Button>
    </div>
  );
};

export default StoreItem;
