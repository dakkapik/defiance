import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./socketstatus.styles.scss";
import Button from "@material-ui/core/Button";
export default function SocketStatus({
  setPosition,
  store,
  handleConnect,
}) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_endpoint);
    setSocket(socket)

    socket.on("connect", () => {
      console.log('CONNECT REGISTERED')
      socket.emit("new-user", {
        id: "mission-control",
        room: "Royal Palm",
        ms: true,
      });
      //on disconnect update from logged in drivers
    });

    socket.on("current-users", (data) => {
      const drivers = [];

      Object.values(data.users).forEach((id) => {
        drivers.push({ id });
      });
      console.log("active");
      // setActiveDrivers(drivers);
    });

    //on disconnect update

    socket.on("d-position", (position, id) => {
      setPosition({ id, position });

      // add on transmition stop event
    });

    return () => {
      console.log("socket disconnected")
      socket.disconnect();
    };
  }, [store, setPosition]);

  return (
    <div className="socket-status">
      <Button variant="outlined" color="inherit" onClick={handleConnect}>
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

}
