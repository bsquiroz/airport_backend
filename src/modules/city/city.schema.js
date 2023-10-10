const { extracValidationData } = require("../../common/utils/extractErrorData");

const z = require("zod");

const citySchema = z.object({
	name: z.string().min(2).max(99),
	country: z.string().min(2).max(99),
	lat: z.number(),
	lon: z.number(),
});

function validateCity(body) {
	const result = citySchema.safeParse(body);
	const { data, errorMessages, hasError } = extracValidationData(result);

	return { data, errorMessages, hasError };
}

function validatePartialCity(body) {
	const result = citySchema.partial().safeParse(body);
	const { data, errorMessages, hasError } = extracValidationData(result);

	return { data, errorMessages, hasError };
}

module.exports = {
	validateCity,
	validatePartialCity,
};
