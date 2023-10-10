const { Router } = require("express");

const { passengerRouter } = require("../modules/passenger/passenger.router.js");
const { cityRouter } = require("../modules/city/city.router.js");

const routers = Router();

routers.use("/passengers", passengerRouter);
routers.use("/city", cityRouter);

module.exports = {
	routers,
};
