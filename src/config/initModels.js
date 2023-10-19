const { User } = require("../modules/auth/user.model");
const { Booking } = require("../modules/booking/booking.model");
const { City } = require("../modules/city/city.model");
const { Flights } = require("../modules/flight/flight.model");
const { Passenger } = require("../modules/passenger/passenger.model");
const { Plane } = require("../modules/plane/plane.model");
const { Ticket } = require("../modules/ticket/ticket.model");

function initModels() {
    User.hasMany(Passenger, {
        foreignKey: "created_by",
        as: "userToPassenger",
    });
    Passenger.belongsTo(User, {
        foreignKey: "created_by",
        as: "passengerToUser",
    });

    Passenger.hasMany(Booking, {
        foreignKey: "passenger_id",
        as: "passengerToBooking",
    });
    Booking.belongsTo(Passenger, {
        foreignKey: "passenger_id",
        as: "bookingToPassenger",
    });

    User.hasMany(Booking, { foreignKey: "created_by", as: "userToBooking" });
    Booking.belongsTo(User, { foreignKey: "created_by", as: "bookingToUser" });

    Flights.hasMany(Booking, {
        foreignKey: "flight_id",
        as: "flightToBooking",
    });
    Booking.belongsTo(Flights, {
        foreignKey: "flight_id",
        as: "bookingToFlight",
    });

    Booking.hasMany(Ticket, {
        foreignKey: "booking_id",
        as: "bookingToTicket",
    });
    Ticket.belongsTo(Booking, {
        foreignKey: "booking_id",
        as: "ticketToBooking",
    });

    User.hasMany(Ticket, { foreignKey: "created_by", as: "userToTicket" });
    Ticket.belongsTo(User, { foreignKey: "created_by", as: "ticketToUser" });

    Passenger.hasMany(Ticket, {
        foreignKey: "passenger_id",
        as: "passengerToTicket",
    });
    Ticket.belongsTo(Passenger, {
        foreignKey: "passenger_id",
        as: "ticketToPassenger",
    });

    Flights.hasMany(Ticket, { foreignKey: "flight_id", as: "flightToTicket" });
    Ticket.belongsTo(Flights, {
        foreignKey: "flight_id",
        as: "ticketToFlight",
    });

    Plane.hasMany(Flights, { foreignKey: "plane_id", as: "planeToFlight" });
    Flights.belongsTo(Plane, { foreignKey: "plane_id", as: "flightToPlane" });

    City.hasMany(Flights, {
        foreignKey: "origin_id",
        as: "cityOriginToFlight",
    });
    Flights.belongsTo(City, {
        foreignKey: "origin_id",
        as: "flightToCityOrigin",
    });

    City.hasMany(Flights, {
        foreignKey: "destination_id",
        as: "cityDestinationToFlight",
    });
    Flights.belongsTo(City, {
        foreignKey: "destination_id",
        as: "flightToCityDestination",
    });
}

module.exports = {
    initModels,
};
