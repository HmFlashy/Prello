const defaultCardModalReducer = {
    _id: null
}

export default (state = defaultCardModalReducer, action) => {
    switch (action.type) {
        case 'DISPLAY_CARD_MODAL':
            return {
                ...state,
                _id: action.payload
            }
        case 'CARD_FETCHED':
            return {
                ...state,
                ...action.payload
            }
        case 'CLOSE_CARD_MODAL':
            return {
                ...defaultCardModalReducer
            }

        case 'UPDATE_CARD_NAME':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    name: action.payload.name
                })
                : state
        case 'UPDATE_CARD_DESC':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    desc: action.payload.desc
                })
                : state
        case 'UPDATE_CARD_DUEDATE':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, dueDate: action.payload.dueDate } : card)
            }
        case 'UPDATE_CARD_DUEDATECOMPLETED':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, dueDateCompleted: action.payload.dueDateCompleted } : card)
            }
        case 'UPDATE_CARD_LIST':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, list: action.payload.list } : card)
            }
        case 'UPDATE_CARD_BOARD':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, board: action.payload.board } : card)
            }
        case 'UPDATE_CARD_POS':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, pos: action.payload.pos } : card)
            }
        case 'UPDATE_CARD_ISARCHIVED':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, isArchived: action.payload.isArchived } : card)
            }
        default:
            return state
    }
}