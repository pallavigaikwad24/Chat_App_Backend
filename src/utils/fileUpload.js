const multer  = require('multer');
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {

        const dirPath = path.join(__dirname, '../../public/temp');
        console.log('Resolved Directory Path:', dirPath);

        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        return cb(null, dirPath);
    },
    filename: function (req, file, cb) {
        const timestampedFilename = `${Date.now()}-${file.originalname}`;
        return cb(null, timestampedFilename);
    }
});

const upload = multer({
    storage : storage,
    // limits: { fileSize: 1024 * 1024 * 5 },
    // fileFilter: function(req, file, cb) {
    //     if (!file.mimetype.startsWith('image/')) {
    //         req.fileValidationError = 'Only image files are allowed!';
    //         cb(null, false);
    //     } else {
    //         cb(null, true);
    //     }
    // }
});

module.exports = upload;

