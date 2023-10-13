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

    async create(ticket) {
        return await Ticket.create(ticket);
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
