const defaultCardReducer = {
  cards: []
}

export default (state = defaultCardReducer, action) => {
  switch (action.type) {
    case "FETCHED_BOARD":
      const board = action.payload
      return {
        ...state,
        cards: board.lists.flatMap(list => list.cards)
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
      const card = action.payload
      return {
        ...state,
        cards: [...state.cards, card]

      }
    case 'FAILED_UPDATE_CARD_NAME':
    case 'UPDATING_CARD_NAME':
    case 'UPDATE_CARD_NAME':
      return {
        ...state,
        cards: state.cards.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name } : card)
      }
    case 'FAILED_UPDATE_CARD_DESC':
    case 'UPDATING_CARD_DESC':
    case 'UPDATE_CARD_DESC':
      return {
        ...state,
        cards: state.cards.map(card => card._id === action.payload._id ? { ...card, desc: action.payload.desc } : card)
      }
    case 'FAILED_UPDATE_CARD_DUEDATE':
    case 'UPDATING_CARD_DUEDATE':
    case 'UPDATE_CARD_DUEDATE':
      return {
        ...state,
        cards: state.cards.map(card => card._id === action.payload._id ? { ...card, dueDate: action.payload.dueDate } : card)
      }
    case 'FAILED_UPDATE_CARD_DUEDATECOMPLETED':
    case 'UPDATING_CARD_DUEDATECOMPLETED':
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