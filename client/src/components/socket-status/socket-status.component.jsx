import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./socket-status.styles.scss";
import Button from "@material-ui/core/Button";
import { toggleDriversSocket } from "../../redux/drivers/drivers.action";
import { connect } from "react-redux";
const SocketStatus = ({
  setPosition,
  store,
  handleConnect,
  toggleDriversSocket,
}) => {
  const [socket, setSocket] = useState();
  console.log(socket);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_endpoint);
    setSocket(socket);

    socket.on("connect", () => {
      console.log("CONNECT REGISTERED");
      socket.emit("new-user", {
        id: "mission-control",
        room: "Royal Palm",
        ms: true,
      });
      //on disconnect update from logged in drivers
    });

    //drivers come from here
    socket.on("current-users", (data) => {
      console.log(data);
      const drivers = [];

      Object.values(data.users).forEach((id) => {
        drivers.push({ id });
      });
      console.log("active");
    });

    //on disconnect update

    socket.on("d-position", (position, id) => {
      setPosition({ id, position });

      // add on transmition stop event
    });

    return () => {
      console.log("socket disconnected");
      socket.disconnect();
    };
  }, [store, setPosition]);

  return (
    <div className="socket-status">
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => toggleDriversSocket(false)}
      >
        DISCONNECT
      </Button>

      <Button
        variant="outlined"
        color="inherit"
        onClick={() => handleMessage(socket, store.name)}
      >
        Message
      </Button>
    </div>
  );

  function handleMessage(socket, store) {
    socket.send("Royal");
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleDriversSocket: (bool) => dispatch(toggleDriversSocket(bool)),
});

export default connect(null, mapDispatchToProps)(SocketStatus);
