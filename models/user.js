const mongoose = require("mongoose");
const joi = require("joi");
// const jwt = require("jsonwebtoken");
// const config = require("config");

function validateUser(input) {
    const schema = joi.object({
        firstName: joi.string().min(3).max(50).required(),
        lastName: joi.string().min(3).max(50),
        employeeId: joi.number().min(3).required(),
        role: joi.string().required(),
        status: joi.string()
    });
    return schema.validate(input);
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 50,
        minlength: 3,
    },
    employeeId: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 3,
    },
    role: {
        type: String,
        default: false,
        required: true
    },
    status: {
        type: String,
        default: "offline"
    }
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this.id, role: this.role },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

const User = new mongoose.model("Users", userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;
