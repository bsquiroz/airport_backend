const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database.js");

const City = sequelize.define(
	"city",
	{
		id: {
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			field: "city_id",
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		lat: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		lon: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ["name", "country"],
			},
		],
	}
);

module.exports = {
	City,
};
