const {
	generateJWT,
	verifyPassword,
	encryptedPassword,
} = require("../../config/plugins");
const { catchAsync, AppError } = require("../../erros");
const { AuthServices } = require("./auth.services");
const {
	validateRegister,
	validateLogin,
	validateChangePassword,
} = require("./user.schema");

const authServices = new AuthServices();

const register = catchAsync(async (req, res, next) => {
	const { data, errorMessages, hasError } = validateRegister(req.body);

	if (hasError) {
		return res.status(422).json({
			status: "error",
			message: errorMessages,
		});
	}

	const user = await authServices.create(data);

	const token = await generateJWT(user.id);

	res.status(201).json({
		token,
		user: {
			id: user.id,
			fullname: user.fullname,
			email: user.email,
			role: user.role,
			gender: user.gender,
		},
	});
});

const login = catchAsync(async (req, res, next) => {
	const { data, errorMessages, hasError } = validateLogin(req.body);

	if (hasError) {
		return res.status(422).json({
			status: "error",
			message: errorMessages,
		});
	}

	const user = await authServices.findOneByEmail(data.email);

	if (!user) return next(new AppError("This account not exixt", 404));

	const isCorrectPassword = await verifyPassword(
		data.password,
		user.password
	);

	if (!isCorrectPassword)
		return next(new AppError("The credentials are incorrect", 401));

	const token = await generateJWT(user.id);

	return res.status(200).json({
		token,
		user: {
			id: user.id,
			fullname: user.fullname,
			email: user.email,
			role: user.role,
			gender: user.gender,
		},
	});
});

const changePassword = catchAsync(async (req, res, next) => {
	const { sessionUser } = req;

	const { data, errorMessages, hasError } = validateChangePassword(req.body);

	if (hasError) {
		return res.status(422).json({
			status: "error",
			message: errorMessages,
		});
	}

	const { currentPasswod, newPassword } = data;

	if (currentPasswod === newPassword)
		return next(new AppError("The passwords cannot be equals", 400));

	const isCorrectPassword = await verifyPassword(
		currentPasswod,
		sessionUser.password
	);

	if (!isCorrectPassword)
		return next(new AppError("The credentials are incorrect", 401));

	const hashedNewPassword = await encryptedPassword(newPassword);

	await authServices.update(sessionUser, {
		password: hashedNewPassword,
		changePasswordAt: new Date(),
	});

	return res.status(200).json({
		message: "The password user was updated successfully!!",
	});
});

const deleteAcount = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { sessionUser } = req;

	if (id != sessionUser.id)
		return next(new AppError(`You do not own this account`, 401));

	const user = await authServices.findOne(id);

	if (!user) {
		return next(new AppError(`this user by id ${id} not found`, 404));
	}

	await authServices.delete(user);

	return res.status(204).json();
});

module.exports = {
	login,
	register,
	changePassword,
	deleteAcount,
};
