const { extracValidationData } = require("../../common/utils/extractErrorData");

const z = require("zod");

const ticketSchema = z.object({
    passenger_id: z.number(),
    flight_id: z.number(),
    booking_id: z.number(),
    class: z.enum([
        "firstClass",
        "executiveClass",
        "premiumEconomicClass",
        "EconomicClass",
    ]),
    price: z.number(),
    seat_number: z.number(),
});

function validateTicket(body) {
    const result = ticketSchema.safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

function validatePartialTicket(body) {
    const result = ticketSchema.partial().safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

module.exports = {
    validateTicket,
    validatePartialTicket,
};
