const { sequelize } = require("../../config/database");
const { DataTypes } = require("sequelize");

const Flights = sequelize.define("flights", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "flight_id",
    },
    origin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    destination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    plane_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    departure_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    check_in: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = {
    Flights,
};
