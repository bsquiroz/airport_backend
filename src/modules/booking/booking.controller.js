const { AppError, catchAsync } = require("../../erros");
const { validateBooking, validatePartialBooking } = require("./booking.schema");
const { BookingServices } = require("./booking.services");

const bookingServices = new BookingServices();

const getBookings = catchAsync(async (req, res, next) => {
    const bookings = await bookingServices.findAll();
    return res.status(200).json(bookings);
});

const getBooking = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const booking = await bookingServices.findOne(id);

    if (!booking)
        return next(new AppError(`booking not found with id ${id}`, 404));

    return res.status(200).json(booking);
});

const postBooking = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validateBooking(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const booking = await bookingServices.create(data);

    return res.status(201).json(booking);
});

const patchBooking = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validatePartialBooking(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const { id } = req.params;
    const booking = await bookingServices.findOne(id);

    if (!booking)
        return next(new AppError(`booking not found with id ${id}`, 404));

    const bookingUpdate = await bookingServices.update(booking, data);

    return res.status(200).json(bookingUpdate);
});

const deleteBooking = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const booking = await bookingServices.findOne(id);

    if (!booking)
        return next(new AppError(`booking not found with id ${id}`, 404));

    await bookingServices.delete(booking);

    return res.status(204).json();
});

module.exports = {
    getBookings,
    getBooking,
    postBooking,
    patchBooking,
    deleteBooking,
};
