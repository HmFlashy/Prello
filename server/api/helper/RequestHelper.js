const throwError = function(code, errorMessage) {
    let error = new Error(errorMessage || 'INTERVAL_SERVER_ISSUE')
    error.code = code
    throw error
};

module.exports = {
    throwError: throwError
};

