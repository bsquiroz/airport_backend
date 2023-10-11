const { Flights } = require("./flight.model.js");

class FlightServices {
    async findAll() {
        return await Flights.findAll({
            where: {
                status: true,
            },
        });
    }

    async findOne(id) {
        return await Flights.findOne({
            where: {
                id,
                status: true,
            },
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
            status: false,
        });
    }
}

module.exports = {
    FlightServices,
};
