const { enableCors } = require("./cors.plugin.js");
const { encryptedPassword, verifyPassword } = require("./bcrypt.plugin.js");
const { enableMorgan } = require("./morgan.plugin.js");
const { generateJWT, verifyToken } = require("./jwt.plugin.js");
const { limitRequest } = require("./rate-limit.plugin.js");
const { securityHeader } = require("./helmet.js");

module.exports = {
    enableCors,
    enableMorgan,
    encryptedPassword,
    verifyPassword,
    generateJWT,
    verifyToken,
    limitRequest,
    securityHeader,
};
