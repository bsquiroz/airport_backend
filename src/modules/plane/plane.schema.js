const z = require("zod");
const { extracValidationData } = require("../../common/utils/extractErrorData");

const planeSchema = z.object({
    plane_number: z.number().positive(),
    model: z.string().min(2).max(99),
    max_capacity: z.number().positive(),
    airline: z.enum([
        "AeroGlobe",
        "AeroTronix",
        "VelocityAir",
        "AirQuest",
        "StartLink",
    ]),
});

function validatePlane(body) {
    const result = planeSchema.safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

function validatePartialPlane(body) {
    const result = planeSchema.partial().safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

module.exports = {
    validatePlane,
    validatePartialPlane,
};
