const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Ticket = sequelize.define(
    "ticket",
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            field: "ticket_id",
        },
        passenger_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        flight_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        booking_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        class: {
            type: DataTypes.ENUM(
                "firstClass",
                "executiveClass",
                "premiumEconomicClass",
                "EconomicClass"
            ),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        seat_number: {
            type: DataTypes.INTEGER,
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
                fields: ["flight_id", "seat_number"],
            },
        ],
    }
);

module.exports = {
    Ticket,
};
