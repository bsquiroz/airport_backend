const rateLimit = require("express-rate-limit");

function limitRequest(app, config) {
    const limit = rateLimit({
        max: config.maxRequests,
        windowMs: config.windowMinutes * 60 * 1000,
        message: config.message,
    });

    app.use(limit);
}

module.exports = {
    limitRequest,
};
