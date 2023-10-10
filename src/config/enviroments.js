require("dotenv").config();
const env = require("env-var");

const envs = {
	PORT: env.get("PORT").required().asPortNumber(),
	DB_URI: env.get("DB_URI").required().asString(),
	NODE_ENV: env.get("NODE_ENV").required().asString(),
};

module.exports = {
	envs,
};
