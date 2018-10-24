const defaultErrorReducer = {
    error: undefined
}

export default (state = defaultErrorReducer, action) => {
    const splitted = action.type.split('_')
    switch (splitted[0]) {
        case "FAILED":
            return {
                ...state,
                error: action.type.substring(7, action.type.length - 1).split('_').join(' ')
            }
        case 'HIDEFAILEDNOTIFICATION':
            return {
                ...state,
                error: undefined
            }
        default:
            return state
    }
}