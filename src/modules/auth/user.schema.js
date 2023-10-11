const z = require("zod");
const { extracValidationData } = require("../../common/utils/extractErrorData");

const registerSchema = z.object({
	fullname: z.string().min(3).max(199),
	email: z.string().email(),
	password: z.string().min(8).max(16),
	gender: z.enum(["male", "female", "prefer not to say"]),
	rol: z.enum(["receptionist", "admin", "developer", "manager", "user"]),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(16),
});

const changePasswordSchema = z.object({
	currentPasswod: z.string().min(8).max(16),
	newPassword: z.string().min(8).max(16),
});

function validateRegister(body) {
	const result = registerSchema.safeParse(body);
	const { data, errorMessages, hasError } = extracValidationData(result);

	return { data, errorMessages, hasError };
}

function validateLogin(body) {
	const result = loginSchema.safeParse(body);
	const { data, errorMessages, hasError } = extracValidationData(result);

	return { data, errorMessages, hasError };
}

function validateChangePassword(body) {
	const result = changePasswordSchema.safeParse(body);
	const { data, errorMessages, hasError } = extracValidationData(result);

	return { data, errorMessages, hasError };
}

module.exports = {
	validateRegister,
	validateLogin,
	validateChangePassword,
};
