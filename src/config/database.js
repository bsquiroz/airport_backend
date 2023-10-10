const { Sequelize } = require("sequelize");
const { envs } = require("./enviroments");

const sequelize = new Sequelize(envs.DB_URI, {
	logging: false,
});

async function authenticate() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established succesfully!!!");
	} catch (error) {
		throw new Error("Authenticate error: " + error);
	}
}

async function syncUp() {
	try {
		await sequelize.sync();
		console.log("Connection has been synced succesfully!!!");
	} catch (error) {
		throw new Error("synced error: " + error);
	}
}

module.exports = {
	sequelize,
	authenticate,
	syncUp,
};
