require("dotenv").config();
const env = require("env-var");

const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    DB_URI: env.get("DB_URI").required().asString(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    SECRET_JWT_SEED: env.get("SECRET_JWT_SEED").required().asString(),
    JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
    API_KEY_WEATHERMAP: env.get("API_KEY_WEATHERMAP").required().asString(),
    FIREBASE_API_KEY: env.get("FIREBASE_API_KEY").required().asString(),
    FIREBASE_AUTH_DOMAIN: env.get("FIREBASE_AUTH_DOMAIN").required().asString(),
    FIREBASE_PROJECT_ID: env.get("FIREBASE_PROJECT_ID").required().asString(),
    FIREBASE_STORAGE_BUCKET: env
        .get("FIREBASE_STORAGE_BUCKET")
        .required()
        .asString(),
    FIREBASE_MESSAGING_SENDER_ID: env
        .get("FIREBASE_MESSAGING_SENDER_ID")
        .required()
        .asString(),
    FIREBASE_APP_ID: env.get("FIREBASE_APP_ID").required().asString(),
};

module.exports = {
    envs,
};
