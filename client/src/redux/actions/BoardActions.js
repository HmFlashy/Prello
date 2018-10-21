export const actionBoardSubscribe = (socket) => {
    return {
        type: 'BOARD_SUBSCRIBE',
        payload: socket
    }
}

export const actionFetchingBoard = (id) => {
    return {
        type: 'FETCHING_BOARD',
        payload: id
    }
}

export const actionFailedFetchBoard = (error) => {
    return {
        type: 'FAILED_FETCH_BOARD',
        payload: error
    }
}

export const actionBoardFetched = (board) => {
    return {
        type: 'FETCHED_BOARD',
        payload: board
    }
}

export const actionFetchingBoards = () => {
    return {
        type: 'FETCHING_BOARDS',
        payload: null
    }
}

export const actionFailedFetchBoards = (error) => {
    return {
        type: 'FAILED_FETCH_BOARDS',
        payload: error
    }
}

export const actionBoardsFetched = (boards) => {
    return {
        type: 'FETCHED_BOARDS',
        payload: boards
    }
}