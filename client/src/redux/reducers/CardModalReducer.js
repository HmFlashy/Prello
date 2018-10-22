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
        case 'CARD_FETCHED':
        console.log("mdr")
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