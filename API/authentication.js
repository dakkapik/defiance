const express = require("express")
const router = express.Router()
const { User, validateUser } = require("../models/user")
const jwt = require('jsonwebtoken')




module.exports = router;