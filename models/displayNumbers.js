const mongoose = require('mongoose')
const joi = require('joi')

function validateDisplayNumbers(orderNumbers) {
    const schema = joi.object({
        numbers : joi.array().required(),
        storeId : joi.string().required()
    })
    return schema.validate(orderNumbers)
}

const displayNumberSchema = new mongoose.Schema({
    numbers: {
        type: Array,
        required: true
    },
    storeId: {
        type: String,
        required: true
    }
});

const DisplayNumbers = new mongoose.model("DisplayNumbers", displayNumberSchema);

module.exports.DisplayNumbers = DisplayNumbers;
module.exports.validateDisplayNumbers = validateDisplayNumbers;