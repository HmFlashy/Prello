const defaultAuthentificationState = {
    user: {
        _id: "",
        bio: "",
        email: "",
        fullName: "",
        initials: "",
        username: "",
        organization: "",
        teams: [],
        boards: [],
        starred: [],
        categories: []
    },
    error: null,
    token: localStorage.getItem("token-prello")
};

export default (state = defaultAuthentificationState, action) => {
    const data = action.payload;
    switch (action.type) {
        case "LOGIN_FAILED":
        case "REGISTER_FAILED":
            return {
                ...state,
                error: data
            };
        case "LOGGED_IN":
            return {
                ...state,
                error: null,
                token: data.token
            };
        case "LOGING_IN":
        case "REGISTERING":
        case "REGISTERED":
            return {
                ...state,
                error: null
            };
        case "USER_BOARD_STAR":
            return {
                ...state,
                user: {
                    ...state.user,
                    starred: [...state.user.starred, data.board]
                }
            };
        case "USER_BOARD_UNSTAR":
            return {
                ...state,
                user: {
                    ...state.user,
                    starred: state.user.starred.filter(boardId => boardId !== data.board)
                }
            };
        case "USER_PROFILE":
            return {
                ...state,
                user: data
            };
        case "ADD_BOARD":
            const category = state.user.categories.find(category => category._id === action.payload.categoryId);
            return {
                ...state,
                user: {
                    ...state.user,
                    boards: [...state.user.boards, {board: action.payload.board._id, category: category, role: "Admin"}]
                }
            };
        case "ADD_CATEGORY":
            return {
                ...state,
                user: {
                    ...state.user,
                    categories: [...state.user.categories, action.payload]
                }
            };
        case "DELETE_CATEGORY":
            return {
                ...state,
                user: {
                    ...state.user,
                    categories: state.user.categories.filter(category => (category._id !== action.payload)),
                    boards: state.user.boards.map(board => {
                        if (board.category) {
                            if (board.category._id === action.payload) {
                                board.category = undefined
                                return board
                            }
                            else return board;
                        }
                        else {
                            return board
                        }
                    })
                }
            };
        case "UPDATE_CATEGORY_NAME":
            return {
                ...state,
                user: {
                    ...state.user,
                    categories: state.user.categories.map(category => {
                        if (category._id === action.payload.id) {
                            return {...category, name: action.payload.name}
                        } else return category
                    }),
                    boards: state.user.boards.map(board => {
                        if (board.category) {
                            if (board.category._id === action.payload.id) {
                                return {
                                    ...board, category: {
                                        ...board.category,
                                        name: action.payload.name
                                    }
                                }
                            }
                            else return board;
                        }
                        else {
                            return board
                        }
                    })
                }
            };
        case "UPDATE_BOARD_CATEGORY":
            console.log("oyo")
            return {
                ...state,
                user: {
                    ...state.user,
                    boards: state.user.boards.map(board => {
                        if (board.board === action.payload.boardId) {
                            console.log("found")
                            console.log({...board, category: action.payload.category})
                            return {...board, category: action.payload.category}
                        } else return board
                    })
                }
            }
        default:
            return {
                ...state,
            }
    }
}