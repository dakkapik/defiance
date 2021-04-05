module.exports = function (socket, positionObj) {
    
    socket.to(positionObj.storeId).emit("d-position", positionObj);

}