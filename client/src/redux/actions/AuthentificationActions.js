export const actionLogin = (email) => {
    return {
        type: 'LOGING_IN',
        payload: email
    }
}

export const actionLoggedIn = (error) => {
    return {
        type: 'LOGGED_IN',
        payload: error
    }
}

export const failedActionLogin = (list) => {
    return {
        type: 'LOGIN_FAILED',
        payload: list
    }
}

export const actionRegistering = (email) => {
    return {
        type: 'REGISTERING',
        payload: email
    }
}

export const actionRegistered = (error) => {
    return {
        type: 'REGISTERED',
        payload: error
    }
}

export const failedActionRegister = (list) => {
    return {
        type: 'REGISTER_FAILED',
        payload: list
    }
}