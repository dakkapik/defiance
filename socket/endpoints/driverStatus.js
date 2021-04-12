module.exports = function (socket, status, employeeId, room) {
    const { User } = require("../../models/user");
    
    User.updateOne({employeeId}, {status})
    // .then(res => console.log(res));

    socket.to(room.roomId).emit("d-status", status);
}