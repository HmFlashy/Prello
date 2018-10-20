export default (state = {}, action) => {
    switch (action.type) {
     case 'BOARD_SUBSCRIBE':
      return {
        ...state
       }
     default:
      return state
    }
   }