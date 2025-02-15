let rooms = {};
const users = {};
const spectators = {};
const { Order } = require("../models/order");
const moment = require("moment")

const position = require("./endpoints/position");
const driverStatus = require("./endpoints/driverStatus");
const orderBundles = require("./endpoints/orderBundles");
const message = require("./endpoints/message");
const orderExtract = require("./listeners/orderExtract");
const orderUpdate = require('./endpoints/orderUpdate')

module.exports.socketIO = function (server, stores) {
    rooms = stores;

    const io = require('socket.io')(server);
    
    orderExtract(io);

    io.on("connection", (socket)=>{

        socket.on("new-user", (user)=>{

            users[socket.id] = user.id;
    
            switch(user.role){
                case "manager":
    
                    if(storeExists(user.store) === undefined){
    
                        io.to(findUserSocket(user.id)).emit("error", "this store does not exist")
                        console.log(`Socket:`, user.id ,`${user.role} tried to join store-${user.store} undefined`)
                        
                    }else if(managerIsActive(user.store) === true){
                        
                        io.to(findUserSocket(user.id)).emit("error", "manager is already in this store");
                        console.log(`Socket:`, user.id , `${user.role} tried to join store-${user.store} with an active manager`);
    
                    }else if(managerIsActive(user.store) === false){
    
                        socket.join(user.store);
    
                        rooms[user.store].users[user.id] = user.role;
                        rooms[user.store].manager = true
    
                        io.to(findUserSocket(user.id)).emit("current-users", rooms[user.store]);

                        Order.find({date: moment().format("MM/DD/YYYY"), status: "unassigned"})
                        .then(orders => orders.forEach(order =>
                            io.to(findUserSocket(user.id)).emit("order-new", order)
                        ))

                        console.log(`Socket:`, user.id, `${user.role} connected to room store-${user.store}`);
                    };
    
                break;
    
                case "driver":
                    if(storeExists(user.store) === undefined){
    
                        io.to(findUserSocket(user.id)).emit("error", "this store does not exist");
                        console.log(`Socket:`, user.id ,`${user.role} tried to join store-${user.store} undefined`);
    
                    }else if(managerIsActive(user.store) === false){
                        
                        io.to(findUserSocket(user.id)).emit("error", "there is no manager in this store");
                        console.log(`Socket:`, user.id , `${user.role} tried to join store-${user.store} without an active manager`);
                        
                    }else if(managerIsActive(user.store) === true){
    
                        socket.join(user.store);
    
                        rooms[user.store].users[user.id] = user.role;
    
                        socket.to(user.store).broadcast.emit("current-users", rooms[user.store]);

                        io.to(socket.id).emit("login-success");
                        
                        console.log(`Socket:`, user.id, `${user.role} connected to room store-${user.store}`);
                    }
                break;
    
                case "spectator":
                    console.log("case", 7)
                break;
            }
        });
        // socket.on('trigger-new-orders', (order) => {
        //     io.to('psq2').emit("orders-new", order);
        // });
        // socket.on('trigger-new-updates', (order) => {
        //     console.log(order);
        //     io.to('psq2').emit("order-updates", order);
        // });
        // socket.on('trigger-order-delete', (order) => {
        //     console.log(order);
        //     io.to('psq2').emit("order-delete", order);
        // });

        socket.on("message", (msg)=> message(socket, msg, users));

        socket.on("order-bundles", (data) => orderBundles(socket, data, users));

        socket.on("order-update", (data) => orderUpdate(socket, data))
        
        socket.on("driver-status", (status) => driverStatus(socket, status, users[socket.id], getUserRoomsAndRole(socket.id)[0]));
        
        socket.on("position", (positionObj) => position(socket, positionObj));
            
        socket.on("disconnect", (reason) => {
    
            getUserRoomsAndRole(socket.id).forEach((roomRole)=>{
                
                const { roomId, role } = roomRole;
    
                console.log("Socket:", role, users[socket.id],  "has left room: ", roomId , " reason: ", reason );
    
                delete rooms[roomId].users[users[socket.id]];
    
                if(role === "manager"){
                    rooms[roomId].manager = false
                } else {
                    // changes => rooms[roomId] =>  users[socket.id]
                    // changes => current-users =>  disconnected-users
                    // fixes bug when all drivers disconnect simutanously when you press x on the browser... 
                    // stops DELTA_DRIVER_FOR_DRAG_AND_DROP from running everytime it does two forloops 
                    
                    io.to(roomId).emit("disconnected-users", users[socket.id])
                }
    
            });
    
            delete users[socket.id];
    
        });
    });
    
};


function storeExists(userStore){
  return rooms[userStore];
}

function managerIsActive(userStore){
  return rooms[userStore].manager === true;
}

function getUserRoomsAndRole(socketId) {
    return Object.entries(rooms).reduce((roomIds, [roomId, room]) => {
        if (room.users[users[socketId]] != null) roomIds.push({roomId, role: room.users[users[socketId]]});
        return roomIds;
    }, []);
}

function findStoreManagerId(roomId){
  return Object.keys(rooms[roomId].users).find(id => rooms[roomId].users[id] === "manager")
}

function findUserSocket(userId){
  return Object.keys(users).find( socketId =>{return users[socketId] == userId})
}

module.exports.findUserSocket = findUserSocket;
module.exports.findStoreManagerId = findStoreManagerId;
module.exports.getUserRoomsAndRole = getUserRoomsAndRole;
module.exports.managerIsActive = managerIsActive;
module.exports.storeExists = storeExists;