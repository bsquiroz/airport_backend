const { routers } = require("./routers");
const { AppError } = require("./erros/index.js");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/v1", routers);

app.all("*", (req, res, next) => {
	next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "fail";

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

module.exports = {
	app,
};
