const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const { encryptedPassword } = require("../../config/plugins");

const User = sequelize.define(
	"users",
	{
		id: {
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		fullname: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.ENUM("male", "female", "prefer not to say"),
			allowNull: false,
		},
		rol: {
			type: DataTypes.ENUM(
				"receptionist",
				"admin",
				"developer",
				"manager",
				"user"
			),
			allowNull: false,
			defaultValue: "user",
		},
		changePasswordAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		hooks: {
			beforeCreate: async (user) => {
				user.password = await encryptedPassword(user.password);
			},
		},
	}
);

module.exports = {
	User,
};
