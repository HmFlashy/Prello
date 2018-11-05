const defaultTeamState = {
    all: [],
    currentTeam: {
        name: "Ma team",
        creator: null,
        members: [{
            fullname: "Hugo Maitre"
        }],
        boards: []
    }
}

export default (state = defaultTeamState, action) => {
    const splitted = action.type.split('_')
    switch (splitted[0]) {
        case "FETCHED_TEAM":
            console.log(action)
            return {
                ...state,
                all: [
                    ...state.all, 
                    { 
                        _id: Date.now(), 
                        hidden: false, 
                        message: action.type.substring(splitted[0].length + 1, action.type.length).split('_').join(' '),
                        code: action.payload.response ? action.payload.response.status : null
                    }]
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