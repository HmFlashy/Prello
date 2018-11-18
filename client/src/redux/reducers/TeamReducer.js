const defaultTeamState = {
    all: [],
    currentTeam: {
        id: null,
        name: null,
        creator: null,
        members: [],
        boards: []
    }
};

export default (state = defaultTeamState, action = { type: null, payload: null }) => {
    const splitted = action.type.split("_");
    switch (splitted[0]) {
        case "FETCHED_TEAM":
            console.log(action);
            return {
                ...state,
                all: [
                    ...state.all,
                    {
                        _id: Date.now(),
                        hidden: false,
                        message: action.type.substring(splitted[0].length + 1, action.type.length).split("_").join(" "),
                        code: action.payload.response ? action.payload.response.status : null
                    }]
            };
        
        case "ADD_TEAM":
        case "CREATED_TEAM":
            return {
                ...state,
                all: [...state.all, action.payload.team]
            };
        default:
            return state
    }
}