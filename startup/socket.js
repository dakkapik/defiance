module.exports = async function (io) {
  const users = {};
  const rooms = {};

  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("new-user", (user) => {
      users[socket.id] = user.id;
      // no 2 mission control can connects to the same store 
      // partition on functions and refactor if statements
      if (Object.keys(rooms).length !== 0) {
        Object.keys(rooms).forEach((room) => {
          if (room === user.room) {
            if (user.ms) {
              socket.join(user.room);
              socket
                .to(user.room)
                .broadcast.emit("current-users", rooms[user.room]);
              console.log(`MS: ${user.id} reconnected room ${user.room}`);
            } else {
              socket.join(user.room);
              rooms[user.room].users[socket.id] = user.id;
              socket
                .to(user.room)
                .broadcast.emit("current-users", rooms[user.room]);
              console.log(`user: ${user.id} connected room ${user.room}`);
            }
          } else {
            console.log(`room ${user.room} not found`);

            if (user.ms) {
              console.log("creating room");
              rooms[user.room] = { users: {} };
              socket.join(user.room);
              console.log(`MS: ${user.id} joined room ${user.room}`);
            } else {
              socket.send("store room not avalible");
              //send to client store room not avalible
            }
          }
        });
      } else {
        console.log("no rooms active");
        if (user.ms) {
          console.log("starting first room");
          rooms[user.room] = { users: {} };
          socket.join(user.room);
          console.log(`MS: ${user.id} joined room ${user.room}`);
        } else {
          socket.send("no store room has been created yet");
          // reply to client, store is not avalible or no store rooms have been created
        }
      }
    });

    socket.on("message", (store) => {
      console.log(rooms);
    });

    socket.on("position", (position, id, store) => {
      socket.to(store).emit("d-position", position, id);
    });

    socket.on("disconnect", (reason) => {
      console.log(`user: ${users[socket.id]} disconnected, ${reason}`);

      delete users[socket.id];

      getUserRooms(socket).forEach((room) => {
        delete rooms[room].users[socket.id];
        socket.broadcast.emit("current-users", rooms[room]);
      });
    });
  });

  function getUserRooms(socket) {
    return Object.entries(rooms).reduce((ids, [id, room]) => {
      if (room.users[socket.id] != null) ids.push(id);
      return ids;
    }, []);
  }
};
