const types = (type, isUpdating) => {
    const u = isUpdating ? 'UPDATING' : 'UPDATE'
    const t = {
        name: `${u}_CARD_NAME`,
        desc: `${u}_CARD_DESC`,
        dueDate: `${u}_CARD_DUEDATE`,
        dueDateCompleted: `${u}_CARD_DUEDATECOMPLETED`,
        list: `${u}_CARD_LIST`,
        board: `${u}_CARD_BOARD`,
        pos: `${u}_CARD_POS`,
        isArchived: `${u}_CARD_ISARCHIVED`
    }
    return t[type]
}

export const actionUpdateCard = (data) => {
    return {
        type: types([Object.keys(data)[0]], false),
        payload: data
    }
}

export const actionUpdatingCard = (data) => {
    return {
        type: types([Object.keys(data)[0]], true),
        payload: data
    }
}

export const actionMoveCard = (data) => {
    return {
        type: "MOVING_CARD",
        payload: data
    }
}

export const failedActionMoveCard = (data) => {
    return {
        type: "FAILED_MOVE_CARD",
        payload: data
    }
}

export const failedActionUpdateCard = (oldValue, error) => {
    let type
    Object.keys(oldValue).foreach(key => {
        if (key !== "_id") {
            type = `FAILED_UPDATE_${key.toUpperCase()}`
        }
    })
    return {
        type,
        payload: oldValue
    }
}

export const actionCardChecklistUpdated = (checklist) => {
    return {
        type: 'UPDATING_CHECKLIST',
        payload: checklist
    }
}

export const failedActionCardChecklistUpdated = (checklist) => {
    return {
        type: 'FAILED_UPDATE_CHECKLIST',
        payload: checklist
    }
}

export const failedActionCardAddItemToChecklist = (checklist) => {
    return {
        type: 'FAILED_ADD_ITEM',
        payload: checklist
    }
}

export const failedActionCardDeleteItemToChecklist = (checklist) => {
    return {
        type: 'FAILED_DELETE_ITEM',
        payload: checklist
    }
}

export const actionCardUpdateItemToChecklist = (checklist) => {
    return {
        type: 'UPDATING_ITEM',
        payload: checklist
    }
}

export const failedActionCardUpdateItemToChecklist = (checklist) => {
    return {
        type: 'FAILED_UPDATE_ITEM',
        payload: checklist
    }
}

export const failedActionCardChecklistDeleted = (checklist) => {
    return {
        type: 'FAILED_DELETE_CHECKLIST',
        payload: checklist
    }
}

export const failedActionCardChecklistCreated = (checklist) => {
    return {
        type: 'FAILED_CREATED_CHECKLIST',
        payload: checklist
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

export const actionCardAddingLabel = (data) => {
    return {
        type: 'CARD_ADDING_LABEL',
        payload: data
    }
}

export const failedActionCardAddLabel = (error) => {
    return {
        type: 'FAILED_CARD_ADD_LABEL',
        payload: error
    }
}

export const actionCardRemovingLabel = (data) => {
    return {
        type: 'CARD_REMOVING_LABEL',
        payload: data
    }
}

export const failedActionCardRemoveLabel = (error) => {
    return {
        type: 'FAILED_CARD_REMOVE_LABEL',
        payload: error
    }
}

export const failedActionUpdateComment = (error) => {
    return {
        type: 'FAILED_UPDATE_COMMENT',
        payload: error
    }
}

export const failedActionDeleteComment = (error) => {
    return {
        type: 'FAILED_DELETE_COMMENT',
        payload: error
    }
}

export const failedActionAddComment = (error) => {
    return {
        type: 'FAILED_ADD_COMMENT',
        payload: error
    }
}

export const actionUpdateComment = (data) => {
    return {
        type: 'UPDATING_COMMENT',
        payload: data
    }
}

export const actionDeleteComment = (data) => {
    return {
        type: 'DELETING_COMMENT',
        payload: data
    }
}

export const actionAddComment = (data) => {
    return {
        type: 'ADDING_COMMENT',
        payload: data
    }
}