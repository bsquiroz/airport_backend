const { FlightServices } = require("../modules/flight/flight.services");

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
        this.flightService = new FlightServices();
    }

    socketsEvents() {
        this.io.on("connection", (socket) => {
            console.log("Conectado al servidor");

            socket.on("get-flights", async () => {
                const flights = await this.flightService.findAll();
                this.io.emit("news-flights", flights);
            });
        });
    }
}

module.exports = {
    Sockets,
};
