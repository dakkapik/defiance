const express = require('express');
const router = express.Router();

const rooms = {}

router.get('/missionControl', (req, res)=>{
    res.render('ejs/missionControl', {rooms: rooms, key: process.env.google_maps_api})
})

router.get('/client', (req, res)=>{
    res.render('ejs/client')
})

router.get('/controlPanel', (req, res)=>{
    res.render('ejs/controlPanel')
})

module.exports = router