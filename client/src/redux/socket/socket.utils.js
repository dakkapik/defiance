import io from "socket.io-client";
export function Connect_To_Socket_With_StoreName({ storename, managername }) {
  const socket = io(process.env.REACT_APP_endpoint);
  return new Promise((resolve, reject) => {
    socket.on("connect", (data) => {
      resolve(socket);

      socket.emit("new-user", {
        id: managername.length ? managername : "mission-control",
        room: storename,
        ms: true,
      });
    });
  });
}
