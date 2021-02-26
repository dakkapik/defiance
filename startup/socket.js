const { Order } = require("../models/order");

module.exports = async function (io) {
  const checkIfOrdersChanged = Order.watch();

  const users = {};
  const rooms = {};
  let MSstoreNameConnection = "";
  io.on("connection", (socket) => {
    //https://mongoosejs.com/docs/api.html#connection_Connection-watch
    //i want to pass storeName to this obj
    checkIfOrdersChanged.on("change", () => {
      console.log("Collection changed");

      Order.find()
        .sort("orderNumber")
        .then((data) => {
          if (data) {
            console.log(MSstoreNameConnection);
            console.log(data);
            // socket.emit("orders", data);
          }
        });
    });

    socket.on("new-user", (user) => {
      users[socket.id] = user.id;
      MSstoreNameConnection = user.room;
      //check where ms connected to
      console.log(user.room);
      // no 2 mission control can connects to the same store
      // partition on functions and refactor if statements

      if (Object.keys(rooms).length !== 0) {
        //look at all rooms
        console.log(rooms);
        //HERE'S WHERE I FOUND THE ISSUE ON ROYALPALMS NOT FOUND OR COCONUTCREEK NOT FOUND
        // so i replaced the forloop with  in which is  O(1)
        // proof https://stackoverflow.com/a/19137197/2720256
        if (user.room in rooms) {
          if (user.ms) {
            socket.join(user.room);
            console.log("USER.ROOM");
            //to().broadcast isn't working....
            socket.emit("current-users", Object.values(rooms[user.room].users));
            console.log(`MS: ${user.id} reconnected room ${user.room}`);
          } else {
            socket.join(user.room);
            rooms[user.room].users[socket.id] = user.id;
            socket
              .to(user.room)
              .broadcast.emit(
                "current-users",
                Object.values(rooms[user.room].users)
              );
            console.log(`user: ${user.id} connected room ${user.room}`);
          }
        } else {
          console.log(`${user.room} NOT FOUND! `);
          if (user.ms) {
            console.log("creating room");
            rooms[user.room] = { users: {} };
            socket.join(user.room);
            console.log(`MS: ${user.id} joined room ${user.room}`);
            console.log(
              "ROOM NOT FOUND USER.ROOM ",
              Object.values(rooms[user.room].users)
            );
            //to().broadcast isn't working....
            socket.emit("current-users", Object.values(rooms[user.room].users));
          } else {
            socket.send("store room not avalible");
          }
        }
      } else {
        console.log("no rooms active");
        if (user.ms) {
          console.log("starting first room");
          rooms[user.room] = { users: {} };
          socket.join(user.room);
          console.log(`MS: ${user.id} joined room ${user.room}`);
          socket.emit("current-users", Object.values(rooms[user.room].users));
          // socket.emit("current-users", rooms[user.rooms]);
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
      console.log(position, " ", id, " ", store);
      socket.to(store).emit("d-position", position, id, store);
    });

    socket.on("disconnect", (reason) => {
      console.log(`user: ${users[socket.id]} disconnected, ${reason}`);
      socket.broadcast.emit("disconnected-users", users[socket.id]);
      delete users[socket.id];
      getUserRooms(socket).forEach((room) => {
        delete rooms[room].users[socket.id];
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
