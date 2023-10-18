function isRepeatSeat(tickets) {
    const setTickets = new Set(tickets.map((ticket) => ticket.seat_number));
    if (tickets.length === setTickets.size) return false;
    return true;
}
module.exports = {
    isRepeatSeat,
};
