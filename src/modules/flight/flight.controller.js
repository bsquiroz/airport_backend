const { AppError, catchAsync } = require("../../erros");
const { validateFlight, validatePartialFlight } = require("./flight.schema");
const { FlightServices } = require("./flight.services");

const flightServices = new FlightServices();

const getFlights = catchAsync(async (req, res, next) => {
    const flights = await flightServices.findAll();
    return res.status(200).json(flights);
});

const getFlight = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const flight = await flightServices.findOne(id);

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

    const flight = await flightServices.findOne(id);

    if (!flight) return next(new AppError(`city with id ${id} not found`, 404));

    await flightServices.delete(flight);

    return res.status(204).json(null);
});

module.exports = {
    getFlights,
    getFlight,
    postFlight,
    patchFlight,
    deleteFlight,
};
