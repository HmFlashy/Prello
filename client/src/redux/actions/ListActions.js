export const actionUpdateListName = (list) => {
    return {
        type: 'UPDATE_LIST_NAME',
        payload: list
    }
}

export const failedActionUpdateListName = (error) => {
    return {
        type: 'FAILED_UPDATE_LIST_NAME',
        payload: error
    }
}

export const actionAddList = (list) => {
    return {
        type: 'ADD_LIST',
        payload: list
    }
}


export const failedMoveList = (error) => {
    return {
        type: 'FAILED_MOVE_LIST',
        payload: error
    }
}

export const actionMoveList = (data) => {
    return {
        type: 'MOVE_LIST',
        payload: data
    }
}

export const failedActionAddList = (error) => {
    return {
        type: 'FAILED_ADD_LIST',
        payload: error
    }
}