function hasDuplateSeatNumber(dataFromBody, dataFromDb) {
    const seats_number = dataFromDb.map((data) => data.seat_number);
    return dataFromBody.some((data) => seats_number.includes(data.seat_number));
}

module.exports = {
    hasDuplateSeatNumber,
};
