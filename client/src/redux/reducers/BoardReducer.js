export default (state = {
    cards: [{
        _id: "5bc8afc290eb33109c6efc5e",
        name: "Test"
    }, {
        _id: "lmsml",
        name: "Mdr"
    }]
}, action) => {
    switch (action.type) {
     case 'BOARD_SUBSCRIBE':
      return {
        ...state
       }
    case 'UPDATE_CARD_NAME':
       return {
           ...state,
           cards: state.cards.map(card => card._id === action.payload._id ? action.payload : card)
       }
    case 'ADD_CARD':
       return {
           ...state,
           cards: [ ...state.cards, action.payload ]
       }
     default:
      return state
    }
   }