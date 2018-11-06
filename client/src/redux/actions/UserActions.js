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