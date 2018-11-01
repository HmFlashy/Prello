const defaultAuthentificationState = {
    user: null,
    error: null,
    token: localStorage.getItem('token-prello')
}

export default (state = defaultAuthentificationState, action) => {
    switch (action.type) {
        case 'LOGIN_FAILED':
        case "REGISTER_FAILED":
            return {
                ...state,
                error: action.payload
            }
        case 'LOGGED_IN':
            const data = action.payload
            return {
                ...state,
                error: null,
                token: data.token,
                user: data.user
            }
        case 'LOGING_IN':
        case 'REGISTERING':
        case 'REGISTERED':
            return {
                ...state,
                error: null
            }
        default:
            return {
                ...state,
            }
    }
}