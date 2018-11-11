const defaultListReducer = {
    all: []
}

export default (state = defaultListReducer, action) => {
    switch (action.type) {
        case "FETCHED_BOARD":
            const board = action.payload
            const lists = board.lists.map(list => ({
                ...list,
                cards: list.cards.map(card => ({ _id: card._id, pos: card.pos, isArchived: card.isArchived }))
            }))
            return {
                ...state,
                all: lists
            }
        case "UPDATE_CARD_ISARCHIVED":
        case "UPDATING_CARD_ISARCHIVED":
        case "FAILED_CARD_ISARCHIVED":
            return {
                ...state,
                all: state.all.map(list => {
                    if (list.cards.some(cardToCheck => action.payload._id === cardToCheck._id)) {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                if (card._id === action.payload._id) {
                                    return ({ ...card, isArchived: action.payload.isArchived })
                                }
                                return card
                            })
                        }
                    } else {
                        return list
                    }
                })
            }
        case 'MOVED_CARD':
        case 'MOVING_CARD':
        case 'FAILED_MOVE_CARD':
            return {
                ...state,
                all: state.all.map(list => {
                    if (action.payload.oldListId !== action.payload.newListId) {
                        if (list._id === action.payload.oldListId) {
                            return { ...list, cards: list.cards.filter(card => card._id !== action.payload._id) }
                        } else if (list._id === action.payload.newListId && !list.cards.some(card => card._id == action.payload._id)) {
                            return { ...list, cards: [...list.cards, { _id: action.payload._id, pos: action.payload.pos, isArchived: false }] }
                        } else {
                            return list
                        }
                    } else {
                        if (list._id === action.payload.oldListId) {
                            return { ...list, cards: list.cards.map(card => card._id === action.payload._id ? { ...card, pos: action.payload.pos, isArchived: false } : card) }
                        } else {
                            return list
                        }
                    }
                })
            }
        case 'MOVE_LIST':
            return {
                ...state,
                all: state.all.map(list => {
                    if (list._id === action.payload._id) {
                        return { ...list, pos: action.payload.pos }
                    } else {
                        return list
                    }
                })
            }
        case 'UPDATE_LIST_NAME':
            return {
                ...state,
                all: state.all.map(list => {
                    if (list._id === action.payload._id) {
                        return { ...list, name: action.payload.name }
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
                    cards: [...list.cards, { _id: card._id, pos: card.pos, isArchived: card.isArchived }]
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
        case 'DELETE_CARD':
            return {
                ...state,
                all: state.all.map(list => list._id === action.payload.list ? {
                    ...list,
                    cards: list.cards.filter(card => card._id !== action.payload._id)
                } : list)
            }
        default:
            return {
                ...state
            }
    }
}