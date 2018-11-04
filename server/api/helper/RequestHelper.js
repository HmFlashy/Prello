const throwError = function(code, errorMessage) {
    let error = new Error(errorMessage || 'INTERVAL_SERVER_ISSUE')
    error.code = code
    throw error
};

const throwIf = (fn, code, errorType, errorMessage) => result => {
    if (fn(result)) {
        throwError(code, errorType, errorMessage)
    }
    return result
};

module.exports = {
    throwError: throwError,
    throwIf: throwIf
};

