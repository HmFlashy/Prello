const defaultBoardReducer = {
    fetching: false,
    all: [],
    currentBoard: {
        _id: null,
        name: null,
        lists: [],
        owner: null,
        teams: null,
        members: [],
        starred: null,
        isClosed: null,
        activities: [],
        visibility: null,
        labels: [],
        boardInformation: {
            nbMembers: null,
            nbStars: null
        }

    }
};

export default (state = defaultBoardReducer, action) => {
    switch (action.type) {
        case "FETCHED_BOARD":
            const board = action.payload;
            return {
                ...state,
                currentBoard: {
                    ...board,
                    lists: board.lists.map(list => ({ _id: list._id, pos: list.pos }))
                }
            };
        case "FETCHING_BOARD":
            return {
                ...state,
                fetching: true
            };
        case "FETCHED_BOARDS":
            return {
                ...state,
                all: [...action.payload]
            };
        case "FETCHING_BOARDS":
            return {
                ...state,
                fetching: true
            };
        case "BOARD_SUBSCRIBE":
            return {
                ...state
            };
        case "GET_BOARD":
            return {
                ...state,
                currentBoard: action.payload,
                error: null
            };
        case "FAILED_FETCH_BOARD":
            return {
                ...state,
                error: action.payload
            };
        case "FAILED_FETCH_BOARDS":
            return {
                ...state,
                error: action.payload
            };
        case "ADD_LIST":
            const list = action.payload;
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: [...state.currentBoard.lists, { _id: list._id, pos: list.pos }]
                }
            };
        case "MOVE_LIST":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: state.currentBoard.lists.map(list => list._id === action.payload._id ? { ...list, pos: action.payload.pos } : list)
                }
            };
        case "FAILED_UPDATE_LIST_NAME":
            return {
                ...state,
                error: action.payload
            };
        case "USER_BOARD_STAR":
            return {
                ...state,
                all: state.all.map(function (board) {
                    if (board._id === action.payload.board) {
                        return {
                            ...board,
                            starred:
                                [...board.starred, action.payload.user],
                            boardInformation: {
                                ...board.boardInformation,
                                nbStars: board.boardInformation.nbStars + 1
                            }
                        }
                    } else return board
                }
                )
            };
        case "USER_BOARD_UNSTAR":
            return {
                ...state,
                all: state.all.map(function (board) {
                    if (board._id === action.payload.board) {
                        return {
                            ...board,
                            starred: board.starred.filter(user => user._id === action.payload.user),
                            boardInformation: {
                                ...board.boardInformation,
                                nbStars: board.boardInformation.nbStars - 1
                            }
                        }
                    } else return board
                }
                )
            };
        case 'ADD_BOARD':
            return {
                ...state,
                all: [...state.all, action.payload.board]
            };
        default:
            return state
    }
}