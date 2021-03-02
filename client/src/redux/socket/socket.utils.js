import io from "socket.io-client";
export function Connect_To_Socket_With_StoreName({ storename }) {
  const socket = io(process.env.REACT_APP_endpoint);
  return new Promise((resolve, reject) => {
    socket.on("connect", (data) => {
      resolve(socket);
      socket.emit("new-user", {
        id: "mission-control",
        room: storename,
        ms: true,
      });
    });
  });
}
