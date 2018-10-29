const defaultListReducer = {
    lists: []
}

export default (state = defaultListReducer, action) => {
    switch (action.type) {
        case "FETCHED_BOARD":
            const board = action.payload
            const lists = board.lists.map(list => ({
                ...list,
                cards: list.cards.map(card => card._id)
            }))
            return {
                ...state,
                all: lists
            }
        case 'ADD_CARD':
            const card = action.payload
            return {
                ...state,
                all: state.all.map(list => card.list === list._id ? {
                    ...list,
                    cards: [ ...list.cards, card._id ]
                 } : list)
                
            }
        case 'ADD_LIST':
            const list = action.payload
            return {
                ...state,
                all: [ ...state.all, {
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