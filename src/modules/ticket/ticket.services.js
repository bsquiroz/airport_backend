const { Ticket } = require("./ticket.model");

class TicketServices {
    async findAll() {
        return await Ticket.findAll({
            where: {
                status: true,
            },
        });
    }

    async findOne(id) {
        return await Ticket.findOne({
            where: {
                id,
                status: true,
            },
        });
    }

    async findOneTicketByFlightId(flight_id) {
        return await Ticket.findOne({
            where: {
                flight_id,
                status: true,
            },
        });
    }

    async findAllTicketByFlightId(flight_id) {
        return await Ticket.findAll({
            attributes: ["seat_number"],
            where: {
                flight_id,
                status: true,
            },
        });
    }

    async create(ticket) {
        return await Ticket.create(ticket);
    }

    async multipleCreate(tickets) {
        return await Ticket.bulkCreate(tickets);
    }

    async update(ticket, ticketUpdate) {
        return await ticket.update(ticketUpdate);
    }

    async delete(ticket) {
        return await ticket.update({
            status: false,
        });
    }
}

module.exports = {
    TicketServices,
};
