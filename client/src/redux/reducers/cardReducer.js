export default (state = {}, action) => {
    switch (action.type) {
     case 'CHANGE_CARD_NAME':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }