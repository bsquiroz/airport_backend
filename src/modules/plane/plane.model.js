const { sequelize } = require("../../config/database");
const { DataTypes } = require("sequelize");

const Plane = sequelize.define("plane", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "plane_id",
    },
    plane_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    model: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    max_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    airline: {
        type: DataTypes.ENUM(
            "AeroGlobe",
            "AeroTronix",
            "VelocityAir",
            "AirQuest",
            "StartLink"
        ),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = {
    Plane,
};
