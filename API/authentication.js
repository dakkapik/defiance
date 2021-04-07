const express = require("express")
const router = express.Router()
const { User, validateUser } = require("../models/user")
const jwt = require('jsonwebtoken')

//endpoint GET /:employeeId use this as the jwt with the db password and send it back to the device



module.exports = router;