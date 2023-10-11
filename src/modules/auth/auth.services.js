const { User } = require("./user.model");

class AuthServices {
	async create(user) {
		return await User.create(user);
	}

	async findOne(id) {
		return await User.findOne({
			where: {
				id,
			},
		});
	}

	async findOneByEmail(email) {
		return await User.findOne({
			where: { email, status: true },
		});
	}

	async update(user, data) {
		return user.update(data);
	}

	async delete(user) {
		return await user.update({
			status: false,
		});
	}
}

module.exports = {
	AuthServices,
};
