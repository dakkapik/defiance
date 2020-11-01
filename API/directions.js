const express = require('express');
const router = express.Router();

router.get('/missionControl', (req, res)=>{
    res.render('ejs/missionControl')
})

router.get('/client', (req, res)=>{
    res.render('ejs/client')
})

module.exports = router