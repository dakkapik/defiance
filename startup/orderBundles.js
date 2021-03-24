const { Order } = require("../models/order");
const TIMEZONE = "en-US";

Order.find({status: "unassigned", date: new Date().toLocaleDateString(TIMEZONE)}).then(orders=>{
    console.log("orders: ")
    orders.forEach(order => {
        Object.keys(order).forEach(key => console.log(key))
    })
})

Order.watch().on("change", data=>{
    console.log("WATCH: ",data);
}) 