const mongoose = require("mongoose");
const joi = require("joi");

function validateOrder(input) {
  const schema = joi.object({
    orderNumber: joi.string().required(),
    name: joi.string(),
    dateTime: joi.string(),
    phone: joi.string(),
    address: joi.string(),
    city: joi.string(),
    zipCode: joi.string(),
    cost: joi.string(),
  });

  return schema.validate(input);
}

const Order = new mongoose.model(
  "Orders",
  new mongoose.Schema({
    orderNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    dateTime: {
      type: Date,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    cost: {
      type: String,
      required: false,
    },
  })
);

exports.validateOrder = validateOrder;
exports.Order = Order;
