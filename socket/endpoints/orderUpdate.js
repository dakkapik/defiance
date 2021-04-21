const { Order } = require("../../models/order")

module.exports = function (socket, data){
    const {_id, status} = data
    Order.updateOne({_id}, {status})
    .catch(err => console.log("orderUpdate: ", err))
}