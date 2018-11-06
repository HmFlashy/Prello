const defaultCardModalState = {
    name: null,
    desc: null,
    dueDate: null,
    dueDateCompleted: null,
    isArchived: null,
    creator: null,
    labels: [],
    comments: [],
    members: [],
    attachments: [],
    checklists: [],
    watchers: [],
    list: null,
    board: null,
    pos: null,
    activities: [],
    cardInformation: {
        nbComments: 0,
        nbItems: 0,
        nbItemsChecked: 0,
        nbAttachments: 0,
        description: null
    }
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
        case 'UPDATING_CARD_LIST':
        case 'FAILED_CARD_LIST':
        case 'UPDATE_CARD_LIST':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    list: action.payload.list
                })
                : state
        case 'UPDATING_CARD_BOARD':
        case 'FAILED_CARD_BOARD':
        case 'UPDATE_CARD_BOARD':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    board: action.payload.board
                })
                : state
        case 'UPDATING_CARD_POS':
        case 'FAILED_CARD_POS':
        case 'UPDATE_CARD_POS':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    pos: action.payload.pos
                })
                : state
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
                    checklists: action.payload.checklists,
                    cardInformation: action.payload.cardInformation
                })
                : state
        case 'MOVED_CARD':
        case 'MOVING_CARD':
        case 'FAILED_MOVE_CARD':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    list: action.payload.newListId,
                    board: action.payload.boardId
                })
                : state
        case 'ADDED_COMMENT':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    comments: [...state.comments, action.payload.comment]
                })
                : state
        case 'DELETED_COMMENT':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    comments: state.comments.filter(comment => comment._id !== action.payload.commentId)
                })
                : state
        case 'UPDATING_COMMENT':
        case 'UPDATED_COMMENT':
            return (state._id && state._id === action.payload._id) ?
                ({
                    ...state,
                    comments: state.comments.map(comment => comment._id === action.payload._id ? action.payload.comment : comment)
                })
                : state
        default:
            return state
    }
}