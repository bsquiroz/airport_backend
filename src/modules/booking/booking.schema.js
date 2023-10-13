const { extracValidationData } = require("../../common/utils/extractErrorData");

const z = require("zod");

const bookingSchema = z.object({
    booking_date: z.string(),
    passenger_id: z.number(),
    flight_id: z.number(),
    nro_tickets: z.number(),
    total_price: z.number(),
    status: z.enum(["pending", "confirmed", "cancelled"]),
});

function validateBooking(body) {
    const result = bookingSchema.safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

function validatePartialBooking(body) {
    const result = bookingSchema.partial().safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

module.exports = {
    validateBooking,
    validatePartialBooking,
};
