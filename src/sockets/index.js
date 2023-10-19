class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on("connection", (socket) => {
            console.log("Conectado al servidor");
        });
    }
}

module.exports = {
    Sockets,
};
