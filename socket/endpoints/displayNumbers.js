const { DisplayNumbers } = require("../../models/displayNumbers");
const { Order } = require("../../models/order");
const TIMEZONE = "en-US"

module.exports = function (io){
    //send orders
    DisplayNumbers.watch().on("change", ( data ) => {
        
        if(data.operationType === "update"){
            const displayArray = [];
            let iteration = 0;
            // console.log(data.updateDescription.updatedFields.numbers)
            data.updateDescription.updatedFields.numbers.forEach(number => {
                Order.findOne({date: new Date().toLocaleDateString(TIMEZONE), orderNumber: number})
                .then(order => {
                    iteration ++;
                    displayArray.push(order)
                    if(iteration === data.updateDescription.updatedFields.numbers.length){
                        sendOrders(displayArray);
                    }
                })
            })
            if(data.updateDescription.updatedFields.numbers.length === 0){
                sendOrders([]);
            }
        }

        function sendOrders(displayArray) {
            DisplayNumbers.findOne({_id: data.documentKey._id})
            .then(res => {
                io.to(res.storeId).emit("order-display", displayArray);
            });
        }

    });

}