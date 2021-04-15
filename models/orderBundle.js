const mongoose = require("mongoose");
const moment = require("moment");
const joi = require("joi");
const STATUS_COMPLETED = "completed";
const STATUS_ON_ROUTE = "on_route";
const STATUS_UNASSIGNED = "unassigned";

function validateOrderBundleStatus(status) {
    const schema = joi.string().equal(STATUS_COMPLETED, STATUS_ON_ROUTE, STATUS_UNASSIGNED)
    return schema.validate(status)
};

function validateOrderBundle(orderBundle) {
    const schema = joi.object({
        driverId: joi.string().required().max(4),
        orderIds: joi.array().required(),
    })
    return schema.validate(orderBundle)
};

const orderBundleSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: STATUS_ON_ROUTE
    },
    driverId: {
        type: String,
        required: true,
    },
    orderIds: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: moment().format("MM/DD/YYYY")
    },
    time: {
        type: String,
        required: true,
        default: moment().format("hh:mm:ss")
    }
});

const OrderBundle = new mongoose.model("OrdersBundles", orderBundleSchema);

module.exports.OrderBundle = OrderBundle;
module.exports.validateOrderBundle = validateOrderBundle;
module.exports.validateOrderBundleStatus = validateOrderBundleStatus;