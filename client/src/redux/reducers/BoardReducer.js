const defaultBoardReducer = {
    fetching: false,
    currentBoard: {
        _id: "",
        name: "",
        lists: []
    },
    boards: [{
        _id: 'board1',
        name: 'tata'
    },{
        _id: 'board2',
        name: 'toto'
    }
    ]
}

export default (state = defaultBoardReducer, action) => {
    switch (action.type) {
        case "FETCHED_BOARD":
            const board = action.payload
            return {
                ...state,
                currentBoard: {
                    ...board,
                    lists: board.lists.map(list => list._id)
                }
            }
        case "FETCHING_BOARD":
            return {
                ...state,
                fetching: true
            }
        case "FETCHED_BOARDS":
            return {
                ...state,
                boards: [...action.payload]
            }
        case "FETCHING_BOARDS":
            return {
                ...state,
                fetching: true
            }
        case 'BOARD_SUBSCRIBE':
            return {
                ...state
            }
        case 'GET_BOARD':
            return {
                ...state,
                currentBoard: action.payload,
                error: null
            }
        case 'FAILED_GET_BOARD':
            return {
                ...state,
                error: action.payload
            }
        case 'FAILED_GET_BOARDS':
            return {
                ...state,
                error: action.payload
            }
        case 'ADD_LIST':
            const list = action.payload
            return {
                ...state,
                currentBoard: {
                    ...state,
                    lists: [...state.currentBoard.lists, list._id]}
            }
        case 'FAILED_UPDATE_LIST_NAME':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}