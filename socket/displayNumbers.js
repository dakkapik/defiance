const { DisplayNumbers } = require("../models/displayNumbers");

module.exports = function (io){

    DisplayNumbers.watch().on("change", ( data ) => {
        
        if(data.operationType === "update"){

            DisplayNumbers.findOne({_id: data.documentKey._id})
            .then(res => {
                io.to(res.storeId).emit("order-display", res.numbers);
            });

        }
    });
}