const { envs } = require("./config/enviroments.js");
const { app } = require("./app.js");

const { authenticate, syncUp } = require("./config/database.js");

(async () => {
	try {
		await authenticate();
		await syncUp();
	} catch (error) {
		console.error(error);
	}
})();

app.listen(envs.PORT, () => {
	console.log(`server in http://localhost:${envs.PORT}/api/v1`);
});
