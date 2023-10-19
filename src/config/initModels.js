const { User } = require("../modules/auth/user.model");
const { Booking } = require("../modules/booking/booking.model");
const { City } = require("../modules/city/city.model");
const { Flights } = require("../modules/flight/flight.model");
const { Passenger } = require("../modules/passenger/passenger.model");
const { Plane } = require("../modules/plane/plane.model");
const { Ticket } = require("../modules/ticket/ticket.model");

function initModels() {
    User.hasMany(Passenger, { foreignKey: "created_by" });
    Passenger.belongsTo(User, { foreignKey: "created_by" });

    Passenger.hasMany(Booking, { foreignKey: "passenger_id" });
    Booking.belongsTo(Passenger, { foreignKey: "passenger_id" });

    User.hasMany(Booking, { foreignKey: "created_by" });
    Booking.belongsTo(User, { foreignKey: "created_by" });

    Flights.hasMany(Booking, { foreignKey: "flight_id" });
    Booking.belongsTo(Flights, { foreignKey: "flight_id" });

    Booking.hasMany(Ticket, { foreignKey: "booking_id" });
    Ticket.belongsTo(Booking, { foreignKey: "booking_id" });

    User.hasMany(Ticket, { foreignKey: "created_by" });
    Ticket.belongsTo(User, { foreignKey: "created_by" });

    Passenger.hasMany(Ticket, { foreignKey: "passenger_id" });
    Ticket.belongsTo(Passenger, { foreignKey: "passenger_id" });

    Flights.hasMany(Ticket, { foreignKey: "flight_id" });
    Ticket.belongsTo(Flights, { foreignKey: "flight_id" });

    Plane.hasMany(Flights, { foreignKey: "plane_id" });
    Flights.belongsTo(Plane, { foreignKey: "plane_id" });

    City.hasMany(Flights, { foreignKey: "origin_id", as: "cityHasOrigin" });
    Flights.belongsTo(City, { foreignKey: "origin_id" });

    City.hasMany(Flights, {
        foreignKey: "destination_id",
        as: "cityHasDestination",
    });
    Flights.belongsTo(City, { foreignKey: "destination_id" });
}

module.exports = {
    initModels,
};
