import React from "react";

import "./socket-status.styles.scss";
import Button from "@material-ui/core/Button";
import {
  DriverSocketOff,
  ClearActiveDriver,
} from "../../redux/drivers/drivers.action";
import { GenerateUser } from "../../components-test/generateuser.component";
import MoveUser from "../../components-test/move-user.component";
import { connect } from "react-redux";

const SocketStatus = ({ DriverSocketOff, ClearActiveDriver }) => {
  return (
    <div className="socket-status">
      <Button
        style={{ margin: 15 }}
        variant="outlined"
        color="inherit"
        onClick={() => {
          DriverSocketOff(false);
          ClearActiveDriver();
        }}
      >
        Disconnect
      </Button>

      {/* <GenerateUser id={2342} /> */}
      <MoveUser id={4545} />
      <MoveUser id={5679} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  DriverSocketOff: (bool) => dispatch(DriverSocketOff(bool)),
  ClearActiveDriver: () => dispatch(ClearActiveDriver()),
});

export default connect(null, mapDispatchToProps)(SocketStatus);
