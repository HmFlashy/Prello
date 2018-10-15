export const changeCardNameAction = (name) => dispatch => {
    dispatch({
        type: 'CHANGE_CARD_NAME',
        payload: name
    })
}