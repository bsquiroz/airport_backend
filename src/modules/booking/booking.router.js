const { Router } = require("express");
const {
    deleteBooking,
    getBooking,
    getBookings,
    patchBooking,
    postBooking,
} = require("./booking.controller");

const router = Router();

router.get("/", getBookings);
router.get("/:id", getBooking);
router.post("/", postBooking);
router.patch("/:id", patchBooking);
router.delete("/:id", deleteBooking);

module.exports = {
    bookingRouter: router,
};
