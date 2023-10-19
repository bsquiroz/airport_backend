const {
    UploadFilesService,
} = require("../../common/services/upload-file-cloud.js");
const { generateUUID } = require("../../config/plugins/uuid.plugin.js");
const { catchAsync, AppError } = require("../../erros/index.js");
const {
    validatePassenger,
    validatePartialPassenger,
} = require("./passenger.schema.js");
const { PassengerService } = require("./passenger.services.js");

const passengerService = new PassengerService();

const getPassengers = catchAsync(async (req, res, next) => {
    const passengers = await passengerService.findAll();
    return res.status(200).json(passengers);
});

const getPassenger = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const passenger = await passengerService.findOne(id);

    if (!passenger)
        return next(new AppError(`Passenger not found with id ${id}`, 404));

    return res.status(200).json(passenger);
});

const postPassenger = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validatePassenger(req.body);
    if (hasError)
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });

    if (req.file) {
        const path = `passenger/${generateUUID()}-${req.file.originalname}`;
        const photoURL = await UploadFilesService.uploadToFirebase(
            path,
            req.file.buffer
        );
        data["photo"] = photoURL;
    }

    data["createdBy"] = req.sessionUser.id;

    const passenger = await passengerService.create(data);
    return res.status(201).json(passenger);
});

const patchPassenger = catchAsync(async (req, res, next) => {
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

    if (!passenger)
        return next(new AppError(`Passenger not found with id ${id}`, 404));

    const updatePassenger = await passengerService.update(passenger, data);

    return res.status(200).json(updatePassenger);
});

const deletePassenger = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const passenger = await passengerService.findOne(id);

    if (!passenger)
        return next(new AppError(`Passenger not found with id ${id}`, 404));

    await passengerService.delete(passenger);

    return res.status(204).json();
});

module.exports = {
    getPassengers,
    getPassenger,
    postPassenger,
    patchPassenger,
    deletePassenger,
};
