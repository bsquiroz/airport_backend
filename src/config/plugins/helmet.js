const helmet = require("helmet");

function securityHeader(app) {
    app.use(helmet());
}

module.exports = {
    securityHeader,
};
