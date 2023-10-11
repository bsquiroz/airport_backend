const { enableCors } = require("./cors.plugin.js");
const { encryptedPassword, verifyPassword } = require("./bcrypt.plugin.js");
const { enableMorgan } = require("./morgan.plugin.js");
const { generateJWT, verifyToken } = require("./jwt.plugin.js");

module.exports = {
	enableCors,
	enableMorgan,
	encryptedPassword,
	verifyPassword,
	generateJWT,
	verifyToken,
};
