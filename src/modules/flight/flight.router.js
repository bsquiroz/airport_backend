const {
    deleteFlight,
    getFlight,
    getFlights,
    patchFlight,
    postFlight,
    approveFlight,
} = require("./flight.controller");

const { Router } = require("express");

const router = Router();

router.get("/", getFlights);
router.get("/:id", getFlight);
router.post("/", postFlight);
router.patch("/:id", patchFlight);
router.patch("/approve-takeoff/:id", approveFlight);
router.delete("/:id", deleteFlight);

module.exports = {
    flightRouter: router,
};
