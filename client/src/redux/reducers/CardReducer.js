export default (state = {}, action) => {
    switch (action.type) {
     case 'UPDATE_CARD_NAME':
      return {
        ...state, 
        cardName: action.payload
       }
     case 'GET_CARD':
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
     default:
      return state
    }
   }