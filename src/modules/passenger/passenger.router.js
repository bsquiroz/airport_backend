const { uploadField } = require("../../config/plugins");

const {
    deletePassenger,
    getPassenger,
    getPassengers,
    patchPassenger,
    postPassenger,
} = require("./passenger.controllers.js");

const express = require("express");
const router = express.Router();

router.get("/", getPassengers);
router.get("/:id", getPassenger);
router.post("/", uploadField("photo"), postPassenger);
router.patch("/:id", patchPassenger);
router.delete("/:id", deletePassenger);

module.exports = {
    passengerRouter: router,
};
