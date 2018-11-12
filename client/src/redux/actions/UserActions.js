export const actionStarBoard = (boardId, userId) => {
    return {
        type: "USER_BOARD_STAR",
        payload: {board: boardId, user: userId}
    }
};

export const actionUnstarBoard = (boardId, userId) => {
    return {
        type: "USER_BOARD_UNSTAR",
        payload: {board: boardId, user: userId}
    }
};

export const actionGetProfile = (user) => {
    return {
        type: "USER_PROFILE",
        payload: user
    }
};

export const actionAddBoard = (board, categoryId) => {
    return {
        type: "ADD_BOARD",
        payload: {
            board: board,
            categoryId: categoryId
        }
    }
}

export const actionAddCategory = (category) => {
    return {
        type: "ADD_CATEGORY",
        payload: category
    }
}

export const actionDeleteCategory = (id) => {
    return {
        type: "DELETE_CATEGORY",
        payload: id
    }
}

export const actionUpdateCategoryName = (id, name) => {
    return {
        type: "UPDATE_CATEGORY_NAME",
        payload: {
            id,
            name
        }
    }
}

export const actionAddingClientApplication = (name) => {
    return {
        type: "ADDING_CLIENT_APPLICATION",
        payload: name
    }
}

export const failedActionAddingClientApplication = (error) => {
    return {
        type: "FAILED_ADD_CLIENT_APPLICATION",
        payload: error
    }
}

export const actionClientApplicationAdded = (name) => {
    return {
        type: "ADD_CLIENT_APPLICATION",
        payload: name
    }
}

export const actionAddingURI = (clientId, uri) => {
    return {
        type: "ADDING_URI",
        payload: {
            clientId,
            uri
        }
    }
}

export const actionAddURI = (clientId, uri) => {
    return {
        type: "ADD_URI",
        payload: {
            clientId,
            uri
        }
    }
}

export const failedActionAddURI = (error) => {
    return {
        type: "FAILED_ADD_URI",
        payload: error
    }
}
