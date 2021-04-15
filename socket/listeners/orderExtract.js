module.exports = function (io) {

    const { Order } = require("../../models/order");
    const CURRENT_STORE = "psq2"
    
    Order.watch().on("change", (data) => {
        if(data.operationType === "insert"){
            io.to(data.fullDocument.storeId).emit("order-new", data.fullDocument)
        }
        if(data.operationType === "update"){
            io.to(CURRENT_STORE).emit("order-update", {_id:data.documentKey._id, update: data.updateDescription.updatedFields})
        }
        if(data.operationType === "delete"){
            io.to(CURRENT_STORE).emit("order-delete", data.documentKey)
        }
    })
}