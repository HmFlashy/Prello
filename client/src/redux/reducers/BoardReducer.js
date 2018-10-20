const defaultBoardReducer = {
    fetching: false,
    currentBoard: {
        fetching: false,
        lists: []
    },
    boards: [{
        _id: 'board1'
    },{
        _id: 'board2'
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
        /*case 'UPDATE_LIST_NAME':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: state.lists.map(
                        list => {
                            list._id === action.payload._id ? action.payload : list
                        })
                }
            }*/
        case 'FAILED_UPDATE_LIST_NAME':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}