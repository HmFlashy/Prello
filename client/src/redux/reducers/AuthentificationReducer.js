const defaultAuthentificationState = {
    user: {
        _id: '',
        bio: '',
        email: '',
        fullName: '',
        initials: '',
        username: '',
        organization: '',
        teams: [],
        boards: [],
        starred: [],
        categories: []
    },
    error: null,
    token: localStorage.getItem('token-prello')
};

export default (state = defaultAuthentificationState, action) => {
    const data = action.payload;
    switch (action.type) {
        case 'LOGIN_FAILED':
        case "REGISTER_FAILED":
            return {
                ...state,
                error: data
            };
        case 'LOGGED_IN':
            return {
                ...state,
                error: null,
                token: data.token
            };
        case 'LOGING_IN':
        case 'REGISTERING':
        case 'REGISTERED':
            return {
                ...state,
                error: null
            };
        case 'USER_BOARD_STAR':
                return {
                    ...state,
                    user: {
                        ...state.user,
                        starred: [...state.user.starred, data.board]
                    }
                };
        case 'USER_BOARD_UNSTAR':
            return {
                ...state,
                user: {
                    ...state.user,
                    starred: state.user.starred.filter(boardId => boardId !== data.board)
                }
            };
        case 'USER_PROFILE':
            return {
                ...state,
                user: data
            };
        case 'ADD_BOARD':
            const category = state.user.categories.find(category => category._id === action.payload.categoryId);
            return {
                ...state,
                user: {
                    ...state.user,
                    boards: [...state.user.boards, {board: action.payload.board._id, category: category, role: "Admin"}]
                }
            };
        default:
            return {
                ...state,
            }
    }
}