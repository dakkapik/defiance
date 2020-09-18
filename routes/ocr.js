const express = require("express");
const router = express();
const ocr = require("../middleware/ocr")
const dropbox = require("../middleware/dropbox")
const logger = require("../middleware/logger")

router.get('/:top/:left/:height/:width', [dropbox, ocr], (req, res)=>{   
})

router.get('/', [dropbox, ocr], (req, res)=>{

})

router.post('/', ocr, (req, res)=>{
    logger.log("info", res.body)
})

router.put('/:top/:left/:height/:width', [dropbox, ocr], (req, res)=>{
})

module.exports = router