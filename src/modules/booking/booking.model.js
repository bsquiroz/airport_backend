const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Booking = sequelize.define("booking", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "booking_id",
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    passenger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    flight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nro_tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
    },
});

module.exports = {
    Booking,
};
