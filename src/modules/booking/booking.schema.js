const { extracValidationData } = require("../../common/utils/extractErrorData");

const z = require("zod");

const bookingSchema = z.object({
    dataBooking: z.object({
        booking_date: z.string(),
        passenger_id: z.number().int().positive(),
        flight_id: z.number().int().positive(),
        nro_tickets: z.number().int().positive(),
        total_price: z.number().positive(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
    }),
    tickets: z.array(
        z.object({
            passenger_id: z.number(),
            flight_id: z.number(),
            class: z.enum([
                "firstClass",
                "executiveClass",
                "premiumEconomicClass",
                "EconomicClass",
            ]),
            price: z.number(),
            seat_number: z.number(),
        })
    ),
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
