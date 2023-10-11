const { catchAsync } = require("../../erros/catchAsync.js");
const { PlaneServices } = require("./plane.services.js");
const { validatePartialPlane, validatePlane } = require("./plane.schema.js");
const { AppError } = require("../../erros/appError.js");

const planeServices = new PlaneServices();

const getPlanes = catchAsync(async (req, res, next) => {
    const planes = await planeServices.findAll();
    return res.status(200).json(planes);
});

const getPlane = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const plane = await planeServices.findOne(id);

    if (!plane) return next(new AppError(`Plane not found with id ${id}`, 404));

    return res.status(200).json(plane);
});

const postPlane = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validatePlane(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const plane = await planeServices.create(data);

    return res.status(201).json(plane);
});

const patchPlane = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validatePartialPlane(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const { id } = req.params;

    const plane = await planeServices.findOne(id);

    if (!plane) return next(new AppError(`Plane not found with id ${id}`, 404));

    const updatePlane = await planeServices.update(plane, data);

    return res.status(200).json(updatePlane);
});

const deletePlane = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const plane = await planeServices.findOne(id);

    if (!plane) return next(new AppError(`Plane not found with id ${id}`, 404));

    await planeServices.delete(plane);

    return res.status(204).json(null);
});

module.exports = {
    getPlanes,
    getPlane,
    postPlane,
    patchPlane,
    deletePlane,
};
