const mongoose = require('mongoose')
const joi = require('joi')

function validateStore(input){
    const schema = joi.object({
        storeId: joi.string().required(),
        name: joi.string().required(),
        location: joi.object().required(),
        users: joi.object(),
        manager: joi.boolean()
    })
    return schema.validate(input)
}

const storeSchema = new mongoose.Schema({
    storeId:{ 
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location:{
        type: Object,
        required: true,
    },
    users: {
        type: Object,
        required: false,
        default: {}
    },
    manager: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Store = new mongoose.model('Stores', storeSchema);

module.exports.Store = Store;
module.exports.validateStore = validateStore;