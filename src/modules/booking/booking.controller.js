const { AppError, catchAsync } = require("../../erros");
const { TicketServices } = require("../ticket/ticket.services");
const { validateBooking, validatePartialBooking } = require("./booking.schema");
const { BookingServices } = require("./booking.services");
const { hasDuplateSeatNumber } = require("./utils/hasDuplicateSeatNumber");
const { isRepeatSeat } = require("./utils/isRepeatSeat");

const bookingServices = new BookingServices();
const ticketServices = new TicketServices();

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

    if (isRepeatSeat(data.tickets))
        return next(
            new AppError("You cannot sell two tickets with the same seat", 400)
        );

    const seatNumberFlightId = await ticketServices.findAllTicketByFlightId(
        data.dataBooking.flight_id
    );

    if (hasDuplateSeatNumber(data.tickets, seatNumberFlightId))
        return next(new AppError("One of the choosen seats is occuped", 400));

    data.dataBooking["created_by"] = req.sessionUser.id;
    const booking = await bookingServices.create(data.dataBooking);

    data.tickets.forEach((ticket) => {
        ticket["booking_id"] = booking.id;
        ticket["created_by"] = req.sessionUser.id;
    });

    const tickets = await ticketServices.multipleCreate(data.tickets);

    return res.status(201).json({
        booking,
        tickets,
    });
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
