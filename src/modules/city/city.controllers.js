const { validateCity, validatePartialCity } = require("./city.schema.js");
const { CityService } = require("./city.services.js");

const cityService = new CityService();

async function getCities(req, res) {
	try {
		const cities = await cityService.findAll();
		return res.status(200).json(cities);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function getCity(req, res) {
	try {
		const { id } = req.params;

		const city = await cityService.findOne(id);

		console.log(city);

		if (!city) {
			return res.status(404).json({
				status: "error",
				message: `city with id ${id} not found`,
			});
		}

		return res.status(200).json(city);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function postCity(req, res) {
	try {
		const { data, errorMessages, hasError } = validateCity(req.body);

		if (hasError) {
			return res.status(422).json({
				status: "error",
				message: errorMessages,
			});
		}

		const city = await cityService.create(data);

		return res.status(201).json(city);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function patchCity(req, res) {
	try {
		const { data, errorMessages, hasError } = validatePartialCity(req.body);

		if (hasError) {
			return res.status(422).json({
				status: "error",
				message: errorMessages,
			});
		}

		const { id } = req.params;

		const city = await cityService.findOne(id);

		if (!city) {
			return res.status(404).json({
				status: "error",
				message: `city with id ${id} not found`,
			});
		}

		const cityUpdate = await cityService.update(city, data);

		return res.status(200).json(cityUpdate);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function deleteCity(req, res) {
	try {
		const { id } = req.params;
		const city = await cityService.findOne(id);

		if (!city) {
			return res.status(404).json({
				status: "error",
				message: `city with id ${id} not found`,
			});
		}

		await cityService.delete(city);

		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
}

module.exports = {
	getCities,
	getCity,
	postCity,
	patchCity,
	deleteCity,
};
