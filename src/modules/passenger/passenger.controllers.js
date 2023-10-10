const {
	validatePassenger,
	validatePartialPassenger,
} = require("./passenger.schema.js");
const { PassengerService } = require("./passenger.services.js");

const passengerService = new PassengerService();

async function getPassengers(req, res) {
	try {
		const passengers = await passengerService.findAll();
		return res.status(200).json(passengers);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function getPassenger(req, res) {
	try {
		const { id } = req.params;
		const passenger = await passengerService.findOne(id);

		if (!passenger) {
			return res.status(404).json({
				status: "error",
				message: `Passenger not found with id ${id}`,
			});
		}

		return res.status(200).json(passenger);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function postPassenger(req, res) {
	try {
		const { data, errorMessages, hasError } = validatePassenger(req.body);

		if (hasError) {
			return res.status(422).json({
				status: "error",
				message: errorMessages,
			});
		}

		const passenger = await passengerService.create(data);

		return res.status(201).json(passenger);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function patchPassenger(req, res) {
	try {
		const { data, errorMessages, hasError } = validatePartialPassenger(
			req.body
		);

		if (hasError) {
			return res.status(422).json({
				status: "error",
				message: errorMessages,
			});
		}

		const { id } = req.params;

		const passenger = await passengerService.findOne(id);

		if (!passenger) {
			return res.status(404).json({
				status: "error",
				message: `Passenger not found with id ${id}`,
			});
		}

		const updatePassenger = await passengerService.update(passenger, data);

		return res.status(200).json(updatePassenger);
	} catch (error) {
		return res.status(500).json(error);
	}
}

async function deletePassenger(req, res) {
	try {
		const { id } = req.params;

		const passenger = await passengerService.findOne(id);

		if (!passenger) {
			return res.status(404).json({
				status: "error",
				message: `Passenger not found with id ${id}`,
			});
		}

		await passengerService.delete(passenger);

		return res.status(204).json();
	} catch (error) {
		return res.status(500).json(error);
	}
}

module.exports = {
	getPassengers,
	getPassenger,
	postPassenger,
	patchPassenger,
	deletePassenger,
};
