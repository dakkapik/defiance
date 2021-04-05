let rooms = {};
const users = {};
const spectators = {};

const position = require("./position");
const orders = require("./orders");
const message = require("./message");
const displayNumbers = require("./displayNumbers")

module.exports.socketIO = async function (server, stores) {
    rooms = stores;

    const io = require('socket.io')(server);
    
    displayNumbers(io);

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
                        
                        console.log(`Socket:`, user.id, `${user.role} connected to room store-${user.store}`);
                    }
                break;
    
                case "spectator":
                    console.log("case", 7)
                break;
            }
        });
    
        socket.on("message", (msg)=> message(socket, msg, users));

        socket.on("order-bundles", (data) => orders(socket, data));

        socket.on("position", (positionObj)=>{
            
            console.log("position")
            socket.to(positionObj.storeId).emit("d-position", positionObj);
            
        });
// sorry i used this to test order-display check it out dawg  o;O
   socket.on('trigger', () => {
        console.log('hello world');
       io.to("psq2").emit("order-display", [
           {
        status: "unassigned",
        date: "4/4/2021",
        _id: "606a190757343a2a0437bbac",
        orderNumber: 82,
        address: "5543 NW 39th Ave, Coconut Creek, FL 33073, USA",
        time: {
        hour: 18,
        minute: 10
        },
        phone: "954-753-4148 ",
        geocode: {
        lat: 26.2987923,
        lng: -80.1770006
        },
        storeId: "psq2",
               __v: 0
           },
           {
            status: "unassigned",
            date: "4/4/2021",
            _id: "606a190757343a2a0437bbad",
            orderNumber: 84,
            address: "3303 Aruba Way, Coconut Creek, FL 33066, USA",
            time: {
            hour: 18,
            minute: 11
            },
            phone: "754-368-2708 ",
            geocode: {
            lat: 26.2497314,
            lng: -80.1753439
            },
            storeId: "psq2",
            __v: 0
            }
       
       ]);
        })

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