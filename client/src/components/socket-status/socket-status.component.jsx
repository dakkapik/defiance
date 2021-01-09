import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./socket-status.styles.scss";
import Button from "@material-ui/core/Button";
import { DriverSocketOff } from "../../redux/drivers/drivers.action";

import { connect } from "react-redux";
const SocketStatus = ({
  setPosition,
  store,
  handleConnect,
  DriverSocketOff,
}) => {
  // const [socket, setSocket] = useState();
  // useEffect(() => {
  //   const socket = io(process.env.REACT_APP_endpoint);
  //   setSocket(socket);

  //   socket.on("connect", () => {
  //     console.log("CONNECT REGISTERED");
  //     socket.emit("new-user", {
  //       id: "mission-control",
  //       room: "Royal Palm",
  //       ms: true,
  //     });
  //     //on disconnect update from logged in drivers
  //   });

  //   //drivers come from here
  //   socket.on("current-users", (data) => {
  //     console.log("hello!??");
  //     console.log(data);
  //     const drivers = [];

  //     Object.values(data.users).forEach((id) => {
  //       drivers.push({ id });
  //     });
  //     console.log("active");
  //   });

  //   //on disconnect update
  //   // compare id and position
  //   socket.on("d-position", (position, id) => {
  //     setPosition({ id, position });

  //     // add on transmition stop event
  //   });

  //   return () => {
  //     console.log("socket disconnected");
  //     socket.disconnect();
  //   };
  // }, [store, setPosition]);
  // const newuser = () => {
  //   socket.emit("new-user", {
  //     id: "4545",
  //     room: "Royal Palm",
  //     MS: false,
  //   });
  // };
  return (
    <div className="socket-status">
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => DriverSocketOff(false)}
      >
        DISCONNECT
      </Button>
      <Button variant="outlined" color="inherit">
        New User
      </Button>

      {/* <Button
        variant="outlined"
        color="inherit"
        onClick={() => handleMessage(socket, store.name)}
      >
        Message
      </Button> */}
    </div>
  );

  // function handleMessage(socket, store) {
  //   socket.send("Royal");
  // }
};

const mapDispatchToProps = (dispatch) => ({
  DriverSocketOff: (bool) => dispatch(DriverSocketOff(bool)),
});

export default connect(null, mapDispatchToProps)(SocketStatus);
