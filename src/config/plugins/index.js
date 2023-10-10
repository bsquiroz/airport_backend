const { enableCors } = require("./cors.plugin.js");
const { enableMorgan } = require("./morgan.plugin.js");

module.exports = {
	enableCors,
	enableMorgan,
};
