module.exports = function (socket, message, users) {
    
    console.log("USER" ,users[socket.id] , ": " + message);

}