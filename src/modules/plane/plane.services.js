const { Plane } = require("./plane.model.js");

class PlaneServices {
    async findAll() {
        return await Plane.findAll({
            where: {
                status: true,
            },
        });
    }

    async findOne(id) {
        return await Plane.findOne({
            where: {
                id,
                status: true,
            },
        });
    }

    async create(plane) {
        return await Plane.create(plane);
    }

    async update(plane, planeUpdate) {
        return await plane.update(planeUpdate);
    }

    async delete(plane) {
        return await plane.update({
            status: false,
        });
    }
}

module.exports = {
    PlaneServices,
};
