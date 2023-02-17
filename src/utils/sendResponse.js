const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).send({
    status: 'Error',
    error: errorMessage,
    e: e?.toString(),
});

const sendSuccessResponse = (res, code, data, message = 'Successful') => res.status(code).send({
    status: 'Success',
    data,
    message,
});

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
};