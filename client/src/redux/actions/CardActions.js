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

export const actionCardNameUpdated = (card) => {
    return {
        type: 'CARD_NAME_UPDATED',
        payload: card
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

export const failedActionAddCard = (error) => {
    return {
        type: 'FAILED_ADD_CARD',
        payload: error
    }
}