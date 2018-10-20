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