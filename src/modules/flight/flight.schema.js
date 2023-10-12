const { extracValidationData } = require("../../common/utils/extractErrorData");

const z = require("zod");

const flightShema = z.object({
    origin_id: z.number().positive(),
    destination_id: z.number().positive(),
    plane_id: z.number().positive(),
    departure_time: z.string(),
    check_in: z.date().optional(),
    status: z.enum(["pending", "inProgress", "done", "cancelled"]).optional(),
});

function validateFlight(body) {
    const result = flightShema.safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

function validatePartialFlight(body) {
    const result = flightShema.partial().safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

module.exports = {
    validateFlight,
    validatePartialFlight,
};
