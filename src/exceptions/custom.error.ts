export const CommonErrors = {
    not_implemented: { code: 1001, status: 501, message: 'Not Implemented.' },
    request_validation_error: { code: 1002, status: 422, message: 'The request failed due to a validation error.' },
    internal_server_error: { code: 1003, status: 500, message: 'Internal Server Error' },
    request_forbidden_error: { code: 1004, status: 403, message: 'Forbidden' },
    coin_server_request_error: { code: 1005, status: 400, message: 'The request failed due to a coin server error.' },
    bad_request: { code: 1006, status: 400, message: 'Bad Request.' },
}
