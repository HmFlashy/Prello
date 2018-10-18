export const actionUpdateCardName = (card) => {
    return {
        type: 'UPDATE_CARD_NAME',
        payload: card
    }
}

export const failedActionUpdateCardName = (error) => {
    return {
        type: 'FAILED_UPDATE_CARD_NAME',
        payload: error
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