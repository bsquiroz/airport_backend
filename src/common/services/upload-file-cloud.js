const { utilsfirebase } = require("../../config/plugins");

class UploadFilesService {
    static async uploadToFirebase(path, data) {
        const imgRef = utilsfirebase.ref(utilsfirebase.storage, path);
        await utilsfirebase.uploadBytes(imgRef, data);
        return await utilsfirebase.getDownloadURL(imgRef);
    }
}

module.exports = {
    UploadFilesService,
};
