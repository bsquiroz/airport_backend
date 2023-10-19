const z = require("zod");
const { extracValidationData } = require("../../common/utils/extractErrorData");

const passengerSchema = z.object({
    nroPassport: z.string().min(8).max(10),
    name: z.string().min(2).max(99),
    surname: z.string().min(2).max(99),
    birthdate: z.string(),
    gender: z.enum(["male", "female", "prefer not to said"]),
    email: z.string().email(),
    cellphone: z.string().min(5).max(25),
});

function validatePassenger(body) {
    const result = passengerSchema.safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

function validatePartialPassenger(body) {
    const result = passengerSchema.partial().safeParse(body);
    const { data, errorMessages, hasError } = extracValidationData(result);

    return { data, errorMessages, hasError };
}

module.exports = {
    validatePassenger,
    validatePartialPassenger,
};
