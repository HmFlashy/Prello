exports.throwError = (code, errorType, errorMessage) => error => {
    if (!error) error = new Error(errorMessage || 'Default Error')
    error.code = code
    error.errorType = errorType
    throw error
};
exports.throwIf = (fn, code, errorType, errorMessage) => result => {
    if (fn(result)) {
        return throwError(code, errorType, errorMessage)()
    }
    return result
};

