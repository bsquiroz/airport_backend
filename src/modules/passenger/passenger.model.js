const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database.js");

const Passenger = sequelize.define("passenger", {
	id: {
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		field: "passenger_id",
	},
	nroPassport: {
		type: DataTypes.BIGINT,
		unique: true,
		allowNull: false,
		field: "nro_passport",
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	surname: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	birthdate: {
		type: DataTypes.DATE(),
		allowNull: false,
	},
	gender: {
		type: DataTypes.ENUM("male", "female", "prefer not to said"),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(150),
		allowNull: false,
		unique: true,
	},
	cellphone: {
		type: DataTypes.STRING(30),
		allowNull: false,
		unique: true,
	},
	createdBy: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: "created_by",
	},
	photo: {
		type: DataTypes.TEXT(),
		allowNull: false,
		defaultValue: "sinfoto",
	},
	status: {
		type: DataTypes.BOOLEAN(),
		allowNull: false,
		defaultValue: true,
	},
});

module.exports = {
	Passenger,
};
