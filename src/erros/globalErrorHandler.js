const { envs } = require("../config/enviroments");
const { Error } = require("./error.model");

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
};

const sendErrorProd = async (err, res) => {
	await Error.create({
		status: err.status,
		message: err.message,
		stack: err.stack,
	});

	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.log("Error : 🥀", err);
		res.status(500).json({
			status: "fail",
			message: "Something went very wrong!",
		});
	}
};

const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "fail";

	if (envs.NODE_ENV === "development") {
		sendErrorDev(err, res);
	}

	if (envs.NODE_ENV === "production") {
		sendErrorProd(err, res);
	}
};

module.exports = {
	globalErrorHandler,
};
