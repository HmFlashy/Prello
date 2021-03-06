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
        categories: [],
        client_applications: []
    },
    error: null,
    token: localStorage.getItem("token-prello"),
    queryMember: ""
};

export default (state = defaultAuthentificationState, action = { type: null, payload: null }) => {
    const data = action.payload;
    switch (action.type) {
        case "@@router/LOCATION_CHANGE":
            if(action.payload.location.pathname === "/login" && action.payload.action === "PUSH"){
                return {
                    ...state,
                    token: null
                }
            }
            return state
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
        case "LOGOUT":
            return {
                ...state,
                token: null
            }
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
        case "UPDATE_PROFILE":
            return {
                ...state,
                user: action.payload
            };
        case "ADD_BOARD":
            const category = state.user.categories.find(category => category._id === action.payload.categoryId);
            return {
                ...state,
                user: {
                    ...state.user,
                    boards: [...state.user.boards, { board: action.payload.board._id, category: category, role: "Admin" }]
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
                            return { ...category, name: action.payload.name }
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
        case "FAILED_UPDATE_BOARD_CATEGORY":
            return {
                ...state,
                user: {
                    ...state.user,
                    boards: state.user.boards.map(board => {
                        if (board.board === action.payload._id) {
                            if (action.payload.category === "No Category") {
                                return { ...board, category: null }
                            } else {
                                return { ...board, category: action.payload.category }
                            }
                        } else return board
                    })
                }
            }
        case "ADD_CLIENT_APPLICATION":
            const newClientApp = action.payload
            return {
                ...state,
                user: {
                    ...state.user,
                    client_applications: [...state.user.client_applications, newClientApp]
                }
            }
        case "ADD_URI":
            return {
                ...state,
                user: {
                    ...state.user,
                    client_applications: state.user.client_applications.map(
                        application => application._id === action.payload.clientId ?
                            { ...application, redirectUris: [...application.redirectUris, action.payload.uri] } :
                            application
                    )
                }
            }
        case "REMOVE_URI":
            return {
                ...state,
                user: {
                    ...state.user,
                    client_applications: state.user.client_applications.map(
                        application => application._id === action.payload.clientId ?
                            { ...application, redirectUris: application.redirectUris.filter(uri => uri !== action.payload.uri) } :
                            application
                    )
                }
            };
        case "UPDATE_SEARCH_TEAM_MEMBERS":
            return {
                ...state,
                queryMember: action.payload.query
            };
        case "DELETED_BOARD_MEMBER":
            return {
                ...state,
                boards: state.user._id === action.payload.memberId ? state.user.boards.filter(boardMember =>
                    boardMember.board !== action.payload.boardId) : state.user.boards
            };
        case "DELETE_BOARD":
            return {
                ...state,
                boards: state.user.boards.filter(boardMember => boardMember.board !== action.payload._id)
            };
        case "UPDATED_BOARD_ROLE_MEMBER":
            return {
                ...state,
                user: {
                    ...state.user,
                    boards: state.user.boards.map(board => {
                        if (board._id === action.payload.boardId) {
                            return { ...board, role: action.payload.role }
                        } else return board
                    })
                }
            }
        case "UPDATE_TEAM_NAME":
        return {
            ...state,
            user: {
                ...state.user,
                teams: state.user.teams.map(team => {
                if (team.team._id === action.payload.teamId) {
                    return {
                        ...team,
                        team: {
                            ...team.team,
                            name: action.payload.name
                        }
                    }
                } else return team
                })
            }
        };
        case "ADD_USERS_TEAM":
        console.log(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    teams: state.user.teams.map(team =>
                    (team.team._id === action.payload.teamId)
                    ? {...team,
                        team: {
                            ...team.team,
                            members: [
                                ...team.team.members,
                                ...action.payload.users.map(user => ({role:"Member", member:user}))
                            ]
                            }
                        }
                    : team
                    )
                }
            };
        case "CHANGE_ROLE_TEAM":
            console.log(action.payload)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        teams: state.user.teams.map(team =>
                        (team.team._id === action.payload.teamId)
                        ? {...team,
                            team: {
                                ...team.team,
                                members: team.team.members.map(member => member.member._id === action.payload.memberId
                                    ? {
                                        ...member,
                                        role:action.payload.role
                                    }
                                    : member)
                                }
                            }
                        : team
                        )
                    }
                };
        case "ADD_TEAM":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        teams: [
                            ...state.user.teams,
                            {role:'Admin', team:action.payload}
                        ]
                    }
                };
            case "DELETE_TEAM":
                    return {
                        ...state,
                        user: {
                            ...state.user,
                            teams: state.user.teams.filter(team => team.team._id !== action.payload._id)
                        }
                    };
        case "DELETE_USER_TEAM":
            const currentUserId = state.user._id;
                return {
                    ...state,
                    user: {
                        ...state.user,
                        teams: action.payload.userId !== currentUserId ? state.user.teams.map(team =>
                        (team.team._id === action.payload.teamId)
                        ? {...team,
                            team: {
                                ...team.team,
                                members: team.team.members.filter(member => member.member._id !== action.payload.userId)
                                }
                            }
                        : team
                        ) : state.user.teams.filter(team => team.team._id !== action.payload.teamId)
                    }
                };
        case "FAILED_ADD_USERS_TEAM":
            const userIds = action.payload.users.map(user => user._id);
            return {
                ...state,
                all: state.all.map(team => team._id === action.payload.teamId ? {
                    ...team,
                    members: team.members.filter(member => !userIds.includes(member._id))
                } : team)
            };
        default:
            return {
                ...state,
            }
    }
}