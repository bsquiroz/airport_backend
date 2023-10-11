const { Router } = require("express");
const { protect } = require("../modules/auth/auth.middleware.js");

const { passengerRouter } = require("../modules/passenger/passenger.router.js");
const { cityRouter } = require("../modules/city/city.router.js");
const { authRouter } = require("../modules/auth/auth.router.js");
const { planeRouter } = require("../modules/plane/plane.router.js");
const { flightRouter } = require("../modules/flight/flight.router.js");

const routers = Router();

routers.use("/users", authRouter);

routers.use(protect);
routers.use("/passengers", passengerRouter);
routers.use("/city", cityRouter);
routers.use("/planes", planeRouter);
routers.use("/flights", flightRouter);

module.exports = {
    routers,
};
