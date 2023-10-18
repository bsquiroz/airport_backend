const { AppError, catchAsync } = require("../../erros");
const { validateTicket, validatePartialTicket } = require("./ticket.schema");
const { TicketServices } = require("./ticket.services");

const ticketServices = new TicketServices();

const getTickets = catchAsync(async (req, res, next) => {
    const tickets = await ticketServices.findAll();
    return res.status(200).json(tickets);
});

const getTicket = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const ticket = await ticketServices.findOne(id);

    if (!ticket)
        return next(new AppError(`Ticket with id ${id} not found`, 404));

    return res.status(200).json(ticket);
});

const postTicket = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validateTicket(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    data["create_by"] = req.sessionUser.id;
    const ticket = await ticketServices.create(data);

    return res.status(201).json(ticket);
});

const patchTicket = catchAsync(async (req, res, next) => {
    const { data, errorMessages, hasError } = validatePartialTicket(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessages,
        });
    }

    const { id } = req.params;

    const ticket = await ticketServices.findOne(id);

    if (!ticket)
        return next(new AppError(`Ticket with id ${id} not found`, 404));

    const ticketUpdate = await ticketServices.update(ticket, data);

    return res.status(200).json(ticketUpdate);
});

const deleteTikcet = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const ticket = await ticketServices.findOne(id);

    if (!ticket)
        return next(new AppError(`Ticket with id ${id} not found`, 404));

    await ticketServices.delete(ticket);

    return res.status(204).json();
});

module.exports = {
    getTickets,
    getTicket,
    postTicket,
    patchTicket,
    deleteTikcet,
};
