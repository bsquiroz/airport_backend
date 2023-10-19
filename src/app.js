const express = require("express");
const { routers } = require("./routers");
const { AppError, globalErrorHandler } = require("./erros/index.js");
const {
    enableCors,
    enableMorgan,
    limitRequest,
    securityHeader,
} = require("./config/plugins");
const { envs } = require("./config/enviroments");

const app = express();

const ACCEPTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:4200",
    "http://localhost:5173",
];

app.use(express.json());

if (envs.NODE_ENV === "development") {
    enableMorgan(app);
}

enableCors(app, ACCEPTED_ORIGINS);

limitRequest(app, {
    maxRequests: 10000,
    windowMinutes: 60,
    message: "Too many request from IP, please try again in an hour!",
});

securityHeader(app);

app.use("/api/v1", routers);

app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = {
    app,
};
