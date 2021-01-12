import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import "./socket-status.styles.scss";
import Button from "@material-ui/core/Button";
import { DriverSocketOff } from "../../redux/drivers/drivers.action";

import { connect } from "react-redux";
const SocketStatus = ({ DriverSocketOff }) => {

  const [sockets, setSockets] = useState([]);

  const newuser = (number) =>{  
    if(sockets.length === 0){
        const socket = io(process.env.REACT_APP_endpoint)
        const user = [{id: number, socket: socket}]
        setSockets(user)
        socket.on("connect", () => {
          socket.emit("new-user", {
            id: number,
            room: "Royal Palm",
            MS: false,
          });
        });
    }else{      
      for(let i = 0; i < sockets.length; i++){
        if(sockets[i].id === number){
          sockets[i].socket.disconnect();
        }
      }
    }
  }
  // useEffect(() => {
  //   if (!connected) {
  //     let socket = io(process.env.REACT_APP_endpoint);
  //     socket.on("connect", () => {
  //       socket.emit("new-user", {
  //         id: 5578,
  //         room: "Royal Palm",
  //         MS: false,
  //       });
  //     });
  //     setSocket(socket);
  //     setConnected(true);
  //   } else {
  //     socket.disconnect();
  //     setConnected(false);
  //   }

  //   return () => {};
  // }, [connected]); //runs when there's a change in socket

  // const newuser = () => {
  //   if (!connected) {
  //     setConnected(true);
  //   } else {
  //     setConnected(false);
  //   }
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
      <Button variant="outlined" color="inherit" onClick={()=> newuser(9568)}>
        New User
      </Button>
      <Button variant="outlined" color="inherit" onClick={() => newuser(4545)}>
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
