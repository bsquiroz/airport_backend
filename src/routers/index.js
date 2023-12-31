const { Router } = require("express");
const { protect } = require("../modules/auth/auth.middleware.js");

const { authRouter } = require("../modules/auth/auth.router.js");

const { passengerRouter } = require("../modules/passenger/passenger.router.js");
const { cityRouter } = require("../modules/city/city.router.js");
const { planeRouter } = require("../modules/plane/plane.router.js");
const { flightRouter } = require("../modules/flight/flight.router.js");
const { ticketRouter } = require("../modules/ticket/ticket.router.js");
const { bookingRouter } = require("../modules/booking/booking.router.js");

const routers = Router();

routers.use("/users", authRouter);
routers.use("/flights", flightRouter);

routers.use(protect);
routers.use("/passengers", passengerRouter);
routers.use("/city", cityRouter);
routers.use("/planes", planeRouter);
routers.use("/tickets", ticketRouter);
routers.use("/bookings", bookingRouter);

module.exports = {
    routers,
};
