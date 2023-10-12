const { City } = require("./city.model");

class CityService {
    async findAll() {
        return await City.findAll({
            where: {
                status: true,
            },
        });
    }

    async findOne(id) {
        return await City.findOne({
            where: {
                id,
                status: true,
            },
        });
    }

    async create(dataCity) {
        return await City.create(dataCity);
    }

    async update(city, cityUpdate) {
        return await city.update(cityUpdate);
    }

    async delete(city) {
        return await city.update({
            status: false,
        });
    }
}

module.exports = {
    CityService,
};
