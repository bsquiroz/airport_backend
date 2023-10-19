const { initializeApp } = require("firebase/app");
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");
const { envs } = require("../enviroments");

const firebaseConfig = {
    apiKey: envs.FIREBASE_API_KEY,
    authDomain: envs.FIREBASE_AUTH_DOMAIN,
    projectId: envs.FIREBASE_PROJECT_ID,
    storageBucket: envs.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envs.FIREBASE_MESSAGING_SENDER_ID,
    appId: envs.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const utilsfirebase = {
    storage,
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
};

module.exports = {
    utilsfirebase,
};
