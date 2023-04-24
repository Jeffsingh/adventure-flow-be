const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        const userId = req.params.userId;
        const ext = path.extname(file.originalname);
        cb(null, `${userId}_profile${ext}`);
    }
});

const limits = {
    fileSize: 1000000
};

const fileFilter = function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return cb(new Error('Only JPEG and PNG files are allowed'));
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
}).single('image');

module.exports = upload;