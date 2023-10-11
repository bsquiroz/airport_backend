const {
    deleteFlight,
    getFlight,
    getFlights,
    patchFlight,
    postFlight,
} = require("./flight.controller");

const { Router } = require("express");

const router = Router();

router.get("/", getFlights);
router.get("/:id", getFlight);
router.post("/", postFlight);
router.patch("/:id", patchFlight);
router.delete("/:id", deleteFlight);

module.exports = {
    flightRouter: router,
};
