const { City } = require("../city/city.model.js");
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
            include: [
                {
                    model: City,
                    as: "flightToCityOrigin",
                    attributes: ["name", "country"],
                },
                {
                    model: City,
                    as: "flightToCityDestination",
                    attributes: ["name", "country"],
                },
            ],
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
