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

export const actionFetchingCard = (cardId) => {
    return {
        type: 'CARD_FETCHING',
        payload: cardId
    }
}

export const actionCardFetched = (card) => {
    return {
        type: 'CARD_FETCHED',
        payload: card
    }
}

export const actionFailedCardFetched = (error) => {
    return {
        type: 'CARD_FAILED_FETCH',
        payload: error
    }
}
