const { v4: uuid } = require("uuid");

function generateUUID() {
    return uuid();
}

module.exports = {
    generateUUID,
};
