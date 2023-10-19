const { envs } = require("./config/enviroments.js");
const { app } = require("./app.js");

const { authenticate, syncUp } = require("./config/database.js");
const { initModels } = require("./config/initModels.js");

const { Sockets } = require("./sockets");
const { Server } = require("socket.io");

(async () => {
    try {
        await authenticate();
        initModels();
        await syncUp();
    } catch (error) {
        console.error(error);
    }
})();

const server = app.listen(envs.PORT, () => {
    console.log(`server in http://localhost:${envs.PORT}/api/v1`);
});

const io = new Server(server, {
    cors: "*",
});

new Sockets(io);
