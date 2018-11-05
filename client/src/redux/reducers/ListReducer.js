const defaultListReducer = {
    all: []
}

export default (state = defaultListReducer, action) => {
    switch (action.type) {
        case "FETCHED_BOARD":
            const board = action.payload
            const lists = board.lists.map(list => ({
                ...list,
                cards: list.cards.map(card => ({ _id: card._id, pos: card.pos }))
            }))
            return {
                ...state,
                all: lists
            }
        case 'MOVE_CARD':
        case 'FAILED_MOVE_CARD':
            return {
                ...state,
                all: state.all.map(list => {
                    if (list._id === action.payload.oldListId) {
                        return { ...list, cards: list.cards.filter(card => card._id !== action.payload._id) }
                    } else if (list._id === action.payload.newListId) {
                        return { ...list, cards: [...list.cards, { _id: action.payload._id, pos: action.payload.pos }] }
                    } else {
                        return list
                    }
                })
            }
        case 'ADD_CARD':
            const card = action.payload
            return {
                ...state,
                all: state.all.map(list => card.list === list._id ? {
                    ...list,
                    cards: [...list.cards, { _id: card._id, pos: card.pos }]
                } : list)

            }
        case 'ADD_LIST':
            const list = action.payload
            return {
                ...state,
                all: [...state.all, {
                    ...list,
                    cards: []
                }]
            }
        default:
            return {
                ...state
            }
    }
}