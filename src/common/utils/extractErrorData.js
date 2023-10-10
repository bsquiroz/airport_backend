function extracValidationData(result) {
	let errorMessages;
	let data;
	let hasError = !result.success;

	if (hasError) errorMessages = JSON.parse(result.error.message);
	if (!hasError) data = result.data;

	return {
		hasError,
		errorMessages,
		data,
	};
}

module.exports = {
	extracValidationData,
};
