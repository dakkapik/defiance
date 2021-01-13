import React from "react";

import "./socket-status.styles.scss";
import Button from "@material-ui/core/Button";
import { DriverSocketOff } from "../../redux/drivers/drivers.action";
import { GenerateUser } from "../../components-test/generateuser.component";
import { connect } from "react-redux";

const SocketStatus = ({ DriverSocketOff }) => {
  return (
    <div className="socket-status">
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => DriverSocketOff(false)}
      >
        Disconnect
      </Button>

      <GenerateUser id={4545} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  DriverSocketOff: (bool) => dispatch(DriverSocketOff(bool)),
});

export default connect(null, mapDispatchToProps)(SocketStatus);
