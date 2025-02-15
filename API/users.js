const express = require("express")
const router = express.Router()
const { User, validateUser } = require("../models/user")
const jwt = require('jsonwebtoken')
    // const { server } = require('../server');
    // const io = require('socket.io')(server);
    // const auth = require("../middleware/auth");
    // const admin = require("../middleware/admin");

router.get('/', async(req, res) => {
    const users = await User.find().sort('lastName')
    res.status(200).send(users)
        //get all users
})

router.get('/:id', async(req, res) => {
    const user = await User.findOne({ employeeId: req.params.id })
    if (!user) {
        return res.status(404).send({ message: 'employee with searched ID not found' })
    }

    res.status(200).send(user)
})

router.post('/', async(req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(`${error.details[0].message}`)

    let user = await User.findOne({ employeeId: req.body.employeeId })
    if (user) return res.status(400).send('employee ID is already in use')

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        role: req.body.role
    })

    const result = await user.save()

    res.status(200).send(result)
        //post user, from postman for now
})

router.put('/:id', async(req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const user = await User.findOne({ employeeId: req.params.id })

        const result = await User.findByIdAndUpdate(
            user._id, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    employeeId: req.body.employeeId,
                    role: req.body.role
                }
            }, { new: true }
        );
        res.status(200).send(result)
    } catch (err) {
        res.status(404).send(err)
    }
    //update user, name and such in db
})

router.put('/activate/:id', async(req, res) => {
    try {
        const user = await User.findOne({ employeeId: req.params.id })

        const result = await User.findByIdAndUpdate(
            user._id, {
                $set: {
                    isActive: true
                }
            }, { new: true }
        );

        res.status(404).send({ active: result.isActive })
    } catch (err) {
        res.status(404).send(err)
    }
    //activate driver
})

router.put('/deactivate/:id', async(req, res) => {
    try {
        const user = await User.findOne({ employeeId: req.params.id })

        const result = await User.findByIdAndUpdate(
            user._id, {
                $set: {
                    isActive: false
                }
            }, { new: true }
        );

        res.status(404).send({ active: result.isActive })
    } catch (err) {
        res.status(404).send(err)
    }
    //deactivate driver
})

router.delete('/:id', async(req, res) => {
    try {
        const user = await User.findOne({ employeeId: req.params.id });
        if (!user) return res.status(404).send('employee Id not found')

        const result = await User.findByIdAndRemove(user._id)
        res.send({ deleted: result })
    } catch (err) {
        res.status(404).send(err)
    }
    //delete user
})

module.exports = router