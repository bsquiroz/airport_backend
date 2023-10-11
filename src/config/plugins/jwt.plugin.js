const jwt = require("jsonwebtoken");
const { envs } = require("../enviroments");
const { promisify } = require("node:util");

const generateJWT = (id) => {
	return new Promise((resolve, reject) => {
		const payload = { id };

		jwt.sign(
			payload,
			envs.SECRET_JWT_SEED,
			{
				expiresIn: envs.JWT_EXPIRE_IN,
			},
			(err, token) => {
				if (err) reject(err);

				resolve(token);
			}
		);
	});
};

const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, envs.SECRET_JWT_SEED, (err, tokenDecoded) => {
			if (err) reject(err);
			resolve(tokenDecoded);
		});
	});
};

module.exports = {
	generateJWT,
	verifyToken,
};
