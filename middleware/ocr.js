const { createWorker } = require('tesseract.js');
const logger = require("./logger")

module.exports = function(req, res, next) {
  console.log("starting OCR...")
  const image = ("./imgTest/photo.png")
  let rectangle = {}

  if(req.params.top){
    rectangle = {
      top: req.params.top,
      left: req.params.left,
      height: req.params.height,
      width: req.params.width
    }
  }else{
    rectangle = {
       top: 0,
       left: 0,
       height: res.lastPhotoMetadata.dimensions.height,
       width: res.lastPhotoMetadata.dimensions.width
     }
  }

  const worker = createWorker();
  
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image, {rectangle: rectangle});
    res.send(text)
    next();
    await worker.terminate();
    console.log("ocr finished...")
  })();

}

