const { AppError } = require("../../erros/appError.js");
const { catchAsync } = require("../../erros/catchAsync.js");
const { validateCity, validatePartialCity } = require("./city.schema.js");
const { CityService } = require("./city.services.js");

const cityService = new CityService();

const getCities = catchAsync(async (req, res, next) => {
	const cities = await cityService.findAll();
	return res.status(200).json(cities);
});

const getCity = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const city = await cityService.findOne(id);

	if (!city) return next(new AppError(`city with id ${id} not found`, 404));

	return res.status(200).json(city);
});

const postCity = catchAsync(async (req, res, next) => {
	const { data, errorMessages, hasError } = validateCity(req.body);

	if (hasError) {
		return res.status(422).json({
			status: "error",
			message: errorMessages,
		});
	}

	const city = await cityService.create(data);

	return res.status(201).json(city);
});

const patchCity = catchAsync(async (req, res, next) => {
	const { data, errorMessages, hasError } = validatePartialCity(req.body);

	if (hasError) {
		return res.status(422).json({
			status: "error",
			message: errorMessages,
		});
	}

	const { id } = req.params;

	const city = await cityService.findOne(id);

	if (!city) return next(new AppError(`city with id ${id} not found`, 404));

	const cityUpdate = await cityService.update(city, data);

	return res.status(200).json(cityUpdate);
});

const deleteCity = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const city = await cityService.findOne(id);

	if (!city) return next(new AppError(`city with id ${id} not found`, 404));

	await cityService.delete(city);

	return res.status(204).json();
});

module.exports = {
	getCities,
	getCity,
	postCity,
	patchCity,
	deleteCity,
};
