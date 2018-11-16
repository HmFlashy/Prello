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

export default (state = defaultTeamState, action) => {
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
        case "ADDING_USERS_TO_TEAM":
        case "ADDED_USERS_TO_TEAM":
            const users = action.payload.users;
            const teamId = action.payload.teamId;
            return {
                ...state,
                all: state.all.map(team => team._id === teamId ? {...team, members: [...team.members, users]} : team)
            };
        case "FAILED_ADD_USERS_TO_TEAM":
            const userIds = action.payload.users.map(user => user._id);
            return {
                ...state,
                all: state.all.map(team => team._id === action.payload.teamId ? {
                    ...team,
                    members: team.members.filter(member => !userIds.includes(member._id))
                } : team)
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