const bcrypt = require("bcrypt");

async function encryptedPassword(password) {
	const salts = await bcrypt.genSalt(12);
	return await bcrypt.hash(password, salts);
}

async function verifyPassword(bodyPassword, userPassword) {
	return await bcrypt.compare(bodyPassword, userPassword);
}

module.exports = {
	encryptedPassword,
	verifyPassword,
};
