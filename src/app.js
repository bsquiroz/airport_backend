const { routers } = require("./routers");
const { AppError, globalErrorHandler } = require("./erros/index.js");

const express = require("express");
const { enableCors, enableMorgan } = require("./config/plugins");

const { envs } = require("./config/enviroments");

const app = express();

const ACCEPTED_ORIGINS = ["http://localhost:3000", "http://localhost:4200"];

app.use(express.json());

if (envs.NODE_ENV === "development") {
	enableMorgan(app);
}

enableCors(app, ACCEPTED_ORIGINS);

app.use("/api/v1", routers);

app.all("*", (req, res, next) => {
	next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = {
	app,
};
