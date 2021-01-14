import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";

const SimUserMove = ({ id }) => {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(true);
  const [userexist, setUserexist] = useState(true);
  const [position, setPosition] = useState({
    coords: {
      accuracy: 65,
      altitude: 210.50143432617188,
      altitudeAccuracy: 10,
      heading: -1,
      latitude: 26.259,
      longitude: -80.27,
      speed: -1,
    },
    timestamp: 1610579477507.111,
  });
  // to get prevstate
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  const prevPosition = usePrevious(position);
  useEffect(() => {
    // i just want a socket to be defined then do everything
    if (socket) {
      socket.on("connect", () => {
        // i just want one user
        if (userexist) {
          socket.emit("new-user", {
            id: id,
            room: "Royal Palm",
            MS: false,
          });
          setUserexist(false);
        }

        socket.emit("position", position, id, "Royal Palm");
      });
    }
    // i just want it so if a user exist and the position are not the same
    // to emit (:
    if (userexist === false && prevPosition !== position) {
      socket.emit("position", position, id, "Royal Palm");
    }

    return () => {};
  }, [socket, userexist, position, prevPosition]);

  const newuser = () => {
    //i just want it so it doesn't create a new socket
    if (connected) {
      const socket = io(process.env.REACT_APP_endpoint);
      setSocket(socket);
      setConnected(false);
    }
    //position.coords.latitude + 0.1
    // i just want it so if you hit the button and a user exist that it updates a position
    if (userexist === false) {
      setPosition({
        coords: {
          accuracy: 65,
          altitude: 210.50143432617188,
          altitudeAccuracy: 10,
          heading: -1,
          latitude: position.coords.latitude + 0.0001,
          longitude: -80.27,
          speed: -1,
        },
        timestamp: 1610579477507.111,
      });
    }
  };
  return (
    <Button
      style={{ margin: 15 }}
      variant="outlined"
      color="inherit"
      onClick={() => newuser()}
    >
      click twice
    </Button>
  );
};

export default SimUserMove;
