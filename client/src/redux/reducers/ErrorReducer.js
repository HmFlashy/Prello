const defaultErrorState = {
    all: []
}

export default (state = defaultErrorState, action) => {
    const splitted = action.type.split('_')
    switch (splitted[0]) {
        case "FAILED":
            return {
                ...state,
                all: [...state.all, { _id: Date.now(), hidden: false, message: action.type.substring(splitted[0].length + 1, action.type.length).split('_').join(' ') }]
            }
        case 'HIDEFAILEDNOTIFICATION':
            return {
                ...state,
                all: state.all.map(error => action.payload === error._id ? { ...error, hidden: true } : { ...error })
            }
        default:
            return state
    }
}