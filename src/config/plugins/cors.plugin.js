const cors = require("cors");

function enableCors(app, acceptedOrigins) {
	app.use(
		cors({
			origin: (origin, callback) => {
				if (acceptedOrigins.includes(origin)) {
					return callback(null, true);
				}

				if (!origin) {
					return callback(null, true);
				}

				return callback(new Error("Not allowed by CORS"));
			},
		})
	);
}

module.exports = {
	enableCors,
};
