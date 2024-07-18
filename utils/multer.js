const multer = require('multer');


module.exports = multer({
    storage : multer.diskStorage({}),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
     fileFilter (req, file, cb) {

        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
      if(!file.mimetype.match(/jpeg|jpg|png|gif$/i)){
        cb(new Error('File is not supported'), false)
        return;
      }
      
        // To accept the file pass `true`, like so:
        cb(null, true)
      
      }
    });