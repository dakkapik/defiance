const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/:id', async(req, res) => {
    const user = await User.findOne({ employeeId: req.params.id })
    if (!user) {
        return res.status(404).send({ message: 'employee with searched ID not found' })
    }

    const token = jwt.sign({ id: user.employeeId }, process.env.db_pswrd)
    res.status(200).send(token)
})

module.exports = router;