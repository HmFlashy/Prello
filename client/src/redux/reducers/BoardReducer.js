export default (state = {
    currentBoard: {
        lists: [{
            name: "Doing",
            cards: [{
                card: {
                    name: "List Features"
                }
            }]
        }]
    }
    }, action
    ) => {
    switch (action.type) {
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
        case 'UPDATE_CARD_NAME':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? action.payload : card)
            }
        case 'ADD_CARD':
            return {
                ...state,
                cards: [ ...state.cards, action.payload ]
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