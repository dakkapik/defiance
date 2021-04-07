const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user')
const jwt = require('jsonwebtoken')

<<<<<<< HEAD
router.get('/:id', async(req, res) => {
    const user = await User.findOne({ employeeId: req.params.id })
    if (!user) {
        return res.status(404).send({ message: 'employee with searched ID not found' })
    }
=======
//endpoint GET /:employeeId use this as the jwt with the db password and send it back to the device
>>>>>>> ed5fc80cc0b5779a578ff2ad535c8a04051942fe

    const token = jwt.sign({ id: user.employeeId }, process.env.db_pswrd)
    res.status(200).send(token)
})

module.exports = router;