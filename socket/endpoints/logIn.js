module.exports = function(socket, user, users, rooms, spectators) {

    users[socket.id] = user.id;

    switch (user.role) {
        case "manager":

            if (storeExists(user.store) === undefined) {

                io.to(findUserSocket(user.id)).emit("error", "this store does not exist")
                console.log(`Socket:`, user.id, `${user.role} tried to join store-${user.store} undefined`)

            } else if (managerIsActive(user.store) === true) {

                io.to(findUserSocket(user.id)).emit("error", "manager is already in this store");
                console.log(`Socket:`, user.id, `${user.role} tried to join store-${user.store} with an active manager`);

            } else if (managerIsActive(user.store) === false) {

                socket.join(user.store);

                rooms[user.store].users[user.id] = user.role;
                rooms[user.store].manager = true

                io.to(findUserSocket(user.id)).emit("current-users", rooms[user.store]);

                console.log(`Socket:`, user.id, `${user.role} connected to room store-${user.store}`);
            };

            break;

        case "driver":
            if (storeExists(user.store) === undefined) {

                io.to(findUserSocket(user.id)).emit("error", "this store does not exist");
                console.log(`Socket:`, user.id, `${user.role} tried to join store-${user.store} undefined`);

            } else if (managerIsActive(user.store) === false) {

                io.to(findUserSocket(user.id)).emit("error", "there is no manager in this store");
                console.log(`Socket:`, user.id, `${user.role} tried to join store-${user.store} without an active manager`);

            } else if (managerIsActive(user.store) === true) {

                socket.join(user.store);

                rooms[user.store].users[user.id] = user.role;

                socket.to(user.store).broadcast.emit("current-users", rooms[user.store]);

                console.log(`Socket:`, user.id, `${user.role} connected to room store-${user.store}`);
            }
            break;

        case "spectator":
            console.log("case", 7)
            break;
    }


}

function storeExists(userStore) {
    return rooms[userStore];
}

function managerIsActive(userStore) {
    return rooms[userStore].manager === true;
}

function findUserSocket(userId) {
    return Object.keys(users).find(socketId => { return users[socketId] == userId })
}