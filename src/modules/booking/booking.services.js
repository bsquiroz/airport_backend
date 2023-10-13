const { Booking } = require("./booking.model");

class BookingServices {
    async findAll() {
        return await Booking.findAll({
            where: {
                status: "pending",
            },
        });
    }

    async findOne(id) {
        return await Booking.findOne({
            where: {
                id,
                status: "pending",
            },
        });
    }

    async create(booking) {
        return await Booking.create(booking);
    }

    async update(booking, bookingUpdate) {
        return await booking.update(bookingUpdate);
    }

    async delete(booking) {
        return await booking.update({
            status: "cancelled",
        });
    }
}

module.exports = {
    BookingServices,
};
