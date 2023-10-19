const { Passenger } = require("./passenger.model");

class PassengerService {
    async findAll() {
        return await Passenger.findAll({
            where: {
                status: true,
            },
            attributes: {
                exclude: ["nroPassport"],
            },
        });
    }

    async findOne(id) {
        return await Passenger.findOne({
            where: { id, status: true },
        });
    }

    async create(dataPassenger) {
        return await Passenger.create(dataPassenger);
    }

    async update(passenger, dataPassengerUpdate) {
        return await passenger.update(dataPassengerUpdate);
    }

    async delete(passenger) {
        return await passenger.update({
            status: false,
        });
    }
}

module.exports = {
    PassengerService,
};
