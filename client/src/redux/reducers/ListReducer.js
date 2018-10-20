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
                lists: lists
            }
        case 'ADD_CARD':
            const card = action.payload
            console.log(card)
            return {
                ...state,
                lists: state.lists.map(list => card.list === list._id ? {
                    ...list,
                    cards: [ ...list.cards, card._id ]
                 } : list)
                
            }
        default:
            return {
                ...state
            }
    }
}