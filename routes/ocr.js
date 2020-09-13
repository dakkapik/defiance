const express = require("express");
const router = express();
const ocr = require("../middleware/ocr")
const logger = require("../middleware/logger")

router.get('/', (req, res)=>{

})

router.post('/', ocr, (req, res)=>{
    logger.log("info", res.body)
})

module.exports = router