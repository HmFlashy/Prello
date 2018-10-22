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
    case 'UPDATE_CARD_NAME':
        return {
            ...state,
            cards: state.cards.map(card => card._id === action.payload._id ? action.payload : card)
        }
    default:
      return state
  }
}