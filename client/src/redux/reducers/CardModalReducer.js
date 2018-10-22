const defaultCardModalReducer = {
    _id: null
  }
  
  export default (state = defaultCardModalReducer, action) => {
    switch (action.type) {
        case 'DISPLAY_CARD_MODAL':
              return {
                  ...state,
                  _id: action.payload
              }
        case 'GET_CARD':
              return {
                  ...state,
                  ...action.payload
              }
        case 'CLOSE_CARD_MODAL':
              return {
                  ...defaultCardModalReducer
              }
      default:
        return state
    }
  }