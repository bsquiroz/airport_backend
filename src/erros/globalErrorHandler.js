const { envs } = require("../config/enviroments");
const { AppError } = require("./appError");
const { Error } = require("./error.model");

const handleError22001 = () =>
    new AppError("Value too long for type on attribute in db", 400);

const handleError23505 = () =>
    new AppError("Duplicate field value> please use another value", 400);

const handleErrorTokenExpiredError = () =>
    new AppError("Your token has expired!, please login again", 401);

const handleErrorJsonWebTokenError = () =>
    new AppError("Invalid token, please login again", 401);

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
        let error = err;

        if (err.parent?.code === "22001") error = handleError22001();

        if (err.parent?.code === "23505") error = handleError23505();

        if (err.name === "TokenExpiredError")
            error = handleErrorTokenExpiredError();

        if (err.name === "JsonWebTokenError")
            error = handleErrorJsonWebTokenError();

        sendErrorProd(error, res);
    }
};

module.exports = {
    globalErrorHandler,
};
