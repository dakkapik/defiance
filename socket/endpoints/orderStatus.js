module.exports = function (socket, data, room) {
    const { Order } = require("../../models/order");

    const { status, location, orderNumber } = data;

    Order.updateOne({orderNumber, date: new Date().toLocaleDateString(GLOBAL_TIMEZONE)}, {status, location})

    socket.to(room.roomId).emit("o-status", data)
}