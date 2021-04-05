const { validateOrder } = require("../../models/order");
const getDirections = require("../../functions/getDirections");
const { writeFileSync } = require("fs")

const CURRENT_STORE = { lat: 26.286659103811463, lng: -80.19981933329022 }

module.exports = function (socket, ordersBundlesList) {
    // orders.orders.forEach(order =>{
    //     const { error } = validateOrder(order);
    //     console.log(error);
    // });
    ordersBundlesList.forEach(orderBundles => {
        const origin = CURRENT_STORE;
        const destination = CURRENT_STORE;
        const waypoints = [];
        orderBundles.orders.forEach(order=>{
            waypoints.push(order.geocode)
        })
        getDirections(origin, destination, waypoints)
        .then(res=>{
            writeFileSync("responce.json", JSON.stringify(res, null, 2))
        })
    })

}