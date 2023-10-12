const { Flights } = require("./flight.model.js");
const { Op } = require("sequelize");

class FlightServices {
    async findAll() {
        return await Flights.findAll({
            where: {
                status: {
                    [Op.notIn]: ["cancelled", "done"],
                },
            },
        });
    }

    async findOne(id, status) {
        let whereClause = {
            id,
            status,
        };

        if (!status) {
            whereClause.status = {
                [Op.notIn]: ["cancelled"],
            };
        }

        return await Flights.findOne({
            where: whereClause,
        });
    }

    async create(flight) {
        return await Flights.create(flight);
    }

    async update(flight, flightUpdate) {
        return await flight.update(flightUpdate);
    }

    async delete(flight) {
        return await flight.update({
            status: "cancelled",
        });
    }
}

module.exports = {
    FlightServices,
};
