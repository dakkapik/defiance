const { createWorker } = require('tesseract.js');
const logger = require("./logger")

module.exports = function(req, res, next) {

  const image = ("../ftp/photos/2020-09-11/19-29-28.jpg")
  
  const worker = createWorker();
  
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image, 
        {rectangle:{
            top: req.body.top,
            left: req.body.left, 
            width: req.body.width,
            height: req.body.height
        }
    });
    res.send(text)
    next()
    await worker.terminate();

  })();

}

