const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");

const Error = sequelize.define("error", {
	id: {
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		field: "error_id",
	},
	status: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	stack: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

module.exports = {
	Error,
};
