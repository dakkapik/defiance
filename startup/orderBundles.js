const { Order } = require("../models/order");
const TIMEZONE = "en-US";

const currentStore = { lat: 26.286743402114034, lng: -80.1997917783223 }

Order.find({status: "unassigned", date: new Date().toLocaleDateString(TIMEZONE)}).then(orders=>{
    
    const order = orders[1]
    const X = order.geocode.lat - currentStore.lat;
    const Y = order.geocode.lng - currentStore.lng;
    
    // const deltaX = Math.abs(order.geocode.lat) - Math.abs(currentStore.lat);
    // const deltaY = Math.abs(order.geocode.lng) - Math.abs(currentStore.lng);
    // const distance = Math.hypot(deltaX, deltaY);

    const distance = Math.hypot(X, Y);
    console.log(angle(order.geocode.lat, order.geocode.lng, currentStore.lat, currentStore.lng))

    function angle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

})

Order.watch().on("change", data=>{
    console.log("WATCH: ",data);
}) 