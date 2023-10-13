const {
    deleteTikcet,
    getTicket,
    getTickets,
    patchTicket,
    postTicket,
} = require("./ticket.controller");

const { Router } = require("express");

const router = Router();

router.get("/", getTickets);
router.get("/:id", getTicket);
router.post("/", postTicket);
router.patch("/:id", patchTicket);
router.delete("/:id", deleteTikcet);

module.exports = {
    ticketRouter: router,
};
