const multer = require('multer');



module.exports = multer({
  // Configuring storage for the uploaded files. Here, we use the diskStorage engine which stores files on the disk.
  storage: multer.diskStorage({}),
  //Here, we limit the file size to 5MB.
  limits: {
      fileSize: 1024 * 1024 * 5 // 1024 * 1024 represents 1MB. So, 1024 * 1024 * 5 is 5MB.
  },
  // Defining a file filter function to control which files should be uploaded.
  fileFilter(req, file, cb) {
      // Checking the file's mimetype to ensure it matches specific formats (jpeg, jpg, png, gif).
      // The mimetype is used to determine the file's type.
      if (!file.mimetype.match(/jpeg|jpg|png|gif$/i)) {
          // If the file's mimetype does not match the allowed types, pass an error to the callback.
          cb(new Error('File is not supported'), false);
          return;
      }
      // If the file is of an allowed type, pass `true` to the callback indicating the file should be accepted.
      cb(null, true);
  }
});