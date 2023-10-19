const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

function uploadFields() {}

function uploadField(filename) {
    return upload.single(filename);
}

module.exports = {
    uploadFields,
    uploadField,
};
