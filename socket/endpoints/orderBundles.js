const { Order, validateOrderStatus } = require("../../models/order");
const { OrderBundle, validateOrderBundle } = require("../../models/orderBundle")
const getDirections = require("../../functions/getDirections");
const { writeFileSync } = require("fs");

const CURRENT_STORE = { lat: 26.286659103811463, lng: -80.19981933329022 }

module.exports = function (socket, orderBundleList, users) {
    
    orderBundleList.forEach(orderBundle => {
        console.log(orderBundle)
        const user = findUserSocket(orderBundle.id)
        const origin = CURRENT_STORE;
        const destination = CURRENT_STORE;
        const waypoints = [];
        orderBundle.orders.forEach(order=>{
            waypoints.push(order.geocode)
        })

        // console.log("sending directions to: ", orderBundle.id, user)
        // socket.to(user).emit("route", mockDirections)
        getDirections(origin, destination, waypoints)
        .then(res=>{
            orderBundle.orders.forEach(( order, index ) => {
                res.geocoded_waypoints[index + 1].coords = order.geocode
            })
            res.geocoded_waypoints[0].coords = CURRENT_STORE
            res.geocoded_waypoints[res.geocoded_waypoints.length - 1].coords = CURRENT_STORE
            
            console.log("sending directions to: ", orderBundle.id, user)

            updateOrders(orderBundle.orderIds)
            saveDirectionData(res)
            saveOrderBundle(orderBundle)

            socket.to(user).emit("route", res)
        })
        .catch(err => console.log("getDirections ERROR: ", err))
    })

    function findUserSocket(userId){
        return Object.keys(users).find( socketId =>{return users[socketId] == userId})
    }

    function updateOrders(_ids){
        const status = "on_route"
        const { error } = validateOrderStatus(status)
        if(error) return console.log("status validation error: ", error)

        _ids.forEach(_id => {    
            Order.updateOne({_id}, {status})
        })
    }

    function saveDirectionData(data){
        writeFileSync(`../directions/${Date.now()}.json`, JSON.stringify(data, null, 2))
    }

    function saveOrderBundle (data) {
        const { id, orderIds } = data
        let bundle = { driverId: id, orderIds }
        const { error } = validateOrderBundle(bundle)
        if(error) console.log("order bundle validation: ", error);

        bundle = new OrderBundle(bundle)

        bundle
        .save(bundle)
        .then(bundle => {
            console.log("saved bundle: ", bundle._id)
        })
        .catch(err => console.log("save bundle error: ", err))
    }
}
