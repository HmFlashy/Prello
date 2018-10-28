const defaultCardModalState = {
    _id: null
}

export default (state = defaultCardModalState, action) => {
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
                ...defaultCardModalState
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
        case 'FAILED_UPDATE_CARD_DUEDATE':
        case 'UPDATING_CARD_DUEDATE':
        case 'UPDATE_CARD_DUEDATE':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    dueDate: action.payload.dueDate
                })
                : state
        case 'FAILED_UPDATE_CARD_DUEDATECOMPLETED':
        case 'UPDATING_CARD_DUEDATECOMPLETED':
        case 'UPDATE_CARD_DUEDATECOMPLETED':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    dueDateCompleted: action.payload.dueDateCompleted
                })
                : state
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
        case 'UPDATING_CARD_ISARCHIVED':
        case 'FAILED_CARD_ISARCHIVED':
        case 'UPDATE_CARD_ISARCHIVED':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    isArchived: action.payload.isArchived
                })
                : state
        case 'ADDED_CHECKLIST':
        case 'DELETED_CHECKLIST':
        case 'UPDATING_CHECKLIST':
        case 'UPDATED_CHECKLIST':
        case 'FAILED_UPDATE_CHECKLIST':
        case 'ADDED_ITEM':
        case 'DELETED_ITEM':
        case 'UPDATING_ITEM':
        case 'UPDATED_ITEM_ISCHECKED':
        case 'UPDATED_ITEM_NAME':
        case 'FAILED_UPDATE_ITEM':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    checklists: action.payload.checklists
                })
                : state
        default:
            return state
    }
}