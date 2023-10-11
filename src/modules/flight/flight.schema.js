const { extracValidationData } = require("../../common/utils/extractErrorData");

const z = require("zod");

const flightShema = z.object({
    origin_id: z.number().positive(),
    destination_id: z.number().positive(),
    plane_id: z.number().positive(),
    // departure_time: z.date(),
    // check_in: z.date(),
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
