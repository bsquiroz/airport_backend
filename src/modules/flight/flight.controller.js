const { envs } = require("../../config/enviroments");
const { httpClient } = require("../../config/plugins");
const { AppError, catchAsync } = require("../../erros");
const { CityService } = require("../city/city.services");
const { validateFlight, validatePartialFlight } = require("./flight.schema");
const { FlightServices } = require("./flight.services");

const flightServices = new FlightServices();
const cityServices = new CityService();

const getFlights = catchAsync(async (req, res, next) => {
    const flights = await flightServices.findAll();
    return res.status(200).json(flights);
});

const getFlight = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.query;

    const flight = await flightServices.findOne(id, status);

    if (!flight) return next(new AppError(`city with id ${id} not found`, 404));

    return res.status(200).json(flight);
});

const postFlight = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validateFlight(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const flight = await flightServices.create(data);

    return res.status(201).json(flight);
});

const patchFlight = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validatePartialFlight(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const { id } = req.params;

    const flight = await flightServices.findOne(id);

    if (!flight) return next(new AppError(`city with id ${id} not found`, 404));

    const flightUpdate = await flightServices.update(flight, data);

    return res.status(200).json(flightUpdate);
});

const deleteFlight = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const flight = await flightServices.findOne(id, "pending");

    // TODO => si el vuelo tiene tiquetes vendidos no se puede eliminar

    if (!flight) return next(new AppError(`city with id ${id} not found`, 404));

    await flightServices.delete(flight);

    return res.status(204).json(null);
});

const approveFlight = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const flight = await flightServices.findOne(id, "pending");

    if (!flight)
        return next(new AppError(`Flight with id ${id} not found`, 404));

    const originCityPromise = cityServices.findOne(flight.origin_id);
    const destinationCityPromise = cityServices.findOne(flight.destination_id);

    const [originCity, destinationCity] = await Promise.all([
        originCityPromise,
        destinationCityPromise,
    ]);

    if (!originCity)
        return next(new AppError("City of origin does not exist", 404));

    if (!destinationCity)
        return next(new AppError("City of destination does not exist", 404));

    const weaterConditions = await httpClient.get(`
    https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.lon}&appid=${envs.API_KEY_WEATHERMAP}
    `);

    if (weaterConditions.weather[0].main === "Rain")
        return next(
            new AppError(
                "Weather conditions do not meet the requeriments for to fly",
                400
            )
        );

    const flightUpdate = await flightServices.update(flight, {
        status: "inProgress",
        check_in: new Date(),
    });

    return res.status(200).json(flightUpdate);
});

module.exports = {
    getFlights,
    getFlight,
    postFlight,
    patchFlight,
    deleteFlight,
    approveFlight,
};
