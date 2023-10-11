const { catchAsync } = require("../../erros/catchAsync");
const { verifyToken } = require("../../config/plugins");
const { AppError } = require("../../erros");

const { AuthServices } = require("./auth.services");
const authServices = new AuthServices();

const protect = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token)
		return next(
			new AppError(
				"You are not logged in!, please log in in to get access",
				401
			)
		);

	const decoded = await verifyToken(token);

	const user = await authServices.findOne(decoded.id);

	if (!user)
		return next(
			new AppError("The owner of this token is not longer available", 401)
		);

	if (user.changePasswordAt) {
		const changedTimeStamp = parseInt(
			user.changePasswordAt.getTime() / 1000,
			10
		);

		if (decoded.iat < changedTimeStamp)
			return next(
				AppError(
					"User recently changed password!, please login again. "
				)
			);
	}

	req.sessionUser = user;

	next();
});

const restrictTo = (...roles) => {
	return (req, res, next) => {
		console.log(req.sessionUser.rol);
		if (!roles.includes(req.sessionUser.rol))
			return next(
				new AppError(
					"You do not have permission to perfom this action",
					403
				)
			);
		next();
	};
};

module.exports = {
	protect,
	restrictTo,
};
