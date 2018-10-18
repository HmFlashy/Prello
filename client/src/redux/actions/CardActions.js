export const changeCardNameAction = (name) => {
    return {
        type: 'CHANGE_CARD_NAME',
        payload: name
    }
}

export const actionGetCard = (card) => {
    return {
        type: 'GET_CARD',
        payload: card
    }
}

export const failedActionGetCard = (error) => {
    return {
        type: 'FAILED_GET_CARD',
        payload: error
    }
}