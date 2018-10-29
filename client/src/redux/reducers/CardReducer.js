const defaultCardReducer = {
  cards: []
}

export default (state = defaultCardReducer, action) => {
  switch (action.type) {
    case "FETCHED_BOARD":
      const board = action.payload
      return {
        ...state,
        all: board.lists.flatMap(list => list.cards)
      }
    case 'CARD_FETCHED':
      return {
        ...state,
        card: action.payload.payload,
        error: null
      }
    case 'FAILED_GET_CARD':
      return {
        ...state,
        error: action.payload
      }
    case 'ADD_CARD':
      console.log(action.payload)
      const card = action.payload
      return {
        ...state,
        all: [...state.all, card]

      }
    case 'FAILED_UPDATE_CARD_NAME':
    case 'UPDATING_CARD_NAME':
    case 'UPDATE_CARD_NAME':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name } : card)
      }
    case 'FAILED_UPDATE_CARD_DESC':
    case 'UPDATING_CARD_DESC':
    case 'UPDATE_CARD_DESC':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, desc: action.payload.desc } : card)
      }
    case 'FAILED_UPDATE_CARD_DUEDATE':
    case 'UPDATING_CARD_DUEDATE':
    case 'UPDATE_CARD_DUEDATE':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, dueDate: action.payload.dueDate } : card)
      }
    case 'FAILED_UPDATE_CARD_DUEDATECOMPLETED':
    case 'UPDATING_CARD_DUEDATECOMPLETED':
    case 'UPDATE_CARD_DUEDATECOMPLETED':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, dueDateCompleted: action.payload.dueDateCompleted } : card)
      }
    case 'UPDATING_CARD_LIST':
    case 'FAILED_CARD_LIST':
    case 'UPDATE_CARD_LIST':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, list: action.payload.list } : card)
      }
    case 'UPDATING_CARD_BOARD':
    case 'FAILED_CARD_BOARD':
    case 'UPDATE_CARD_BOARD':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, board: action.payload.board } : card)
      }
    case 'UPDATING_CARD_POS':
    case 'FAILED_CARD_POS':
    case 'UPDATE_CARD_POS':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, pos: action.payload.pos } : card)
      }
    case 'UPDATING_CARD_ISARCHIVED':
    case 'FAILED_CARD_ISARCHIVED':
    case 'UPDATE_CARD_ISARCHIVED':
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, isArchived: action.payload.isArchived } : card)
      }
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
      return {
        ...state,
        all: state.all.map(card => card._id === action.payload._id ? { ...card, checklists: action.payload.checklists } : card)
      }
    default:
      return state
  }
}