const morgan = require("morgan");

function enableMorgan(app) {
	app.use(morgan("dev"));
}

module.exports = {
	enableMorgan,
};
