const mongoose = require("mongoose")
const joi = require("joi");
const STATUS_COMPLETED = "completed";
const STATUS_ON_ROUTE = "on_route";
const STATUS_UNASSIGNED = "unassigned";
const TIMEZONE = "en-US";

function validateOrderStatus(status){
    const schema = joi.string().required().equal(STATUS_COMPLETED, STATUS_ON_ROUTE, STATUS_UNASSIGNED)
    return schema.validate(status)
}

function validateOrder(order) {
    const schema = joi.object({
        orderNumber: joi.number().required(),
        status: joi.string(),
        driver: joi.number(),
        date: joi.string(),
        time: joi.object().required(),
        firstName: joi.string(),
        lastName: joi.string(),
        phone: joi.string(),
        address: joi.string().required(),
        city: joi.string(),
        zip: joi.string(),
        geocode: joi.object().required()
    })
    return schema.validate(order)
};

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        require: true,
    },
    status:{
        type: String,
        default: 'unassigned'
    },
    driver: {
        type: Number,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString(TIMEZONE)
    },
    time: {
        type: Object,
        required: true
    },
    firstName: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 16,
    },
    address: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
    },
    geocode: {
        type: Object,
        required: true
    },
    city: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false
    }
});

const Order = new mongoose.model("Orders", orderSchema);

module.exports.Order = Order;
module.exports.validateOrder = validateOrder;
module.exports.validateOrderStatus = validateOrderStatus;
module.exports.orderSchema = orderSchema;