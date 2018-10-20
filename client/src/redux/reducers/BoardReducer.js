export default (state = {
    card: {
        _id: "5bc8afc290eb33109c6efc5e",
        name: "Test"
    }
}, action) => {
    switch (action.type) {
     case 'BOARD_SUBSCRIBE':
      return {
        ...state
       }
    case 'UPDATE_CARD_NAME':
       return {
           ...state,
           card: action.payload
       }
     default:
      return state
    }
   }