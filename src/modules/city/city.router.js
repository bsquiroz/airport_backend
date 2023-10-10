const {
	postCity,
	deleteCity,
	getCities,
	getCity,
	patchCity,
} = require("./city.controllers.js");

const { Router } = require("express");
const router = Router();

router.get("/", getCities);
router.get("/:id", getCity);
router.post("/", postCity);
router.patch("/:id", patchCity);
router.delete("/:id", deleteCity);

module.exports = {
	cityRouter: router,
};
