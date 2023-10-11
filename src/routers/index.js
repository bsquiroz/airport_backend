const { Router } = require("express");

const { passengerRouter } = require("../modules/passenger/passenger.router.js");
const { cityRouter } = require("../modules/city/city.router.js");
const { authRouter } = require("../modules/auth/auth.route.js");
const { protect } = require("../modules/auth/auth.middleware.js");

const routers = Router();

routers.use("/users", authRouter);

routers.use(protect);
routers.use("/passengers", passengerRouter);
routers.use("/city", cityRouter);

module.exports = {
	routers,
};
