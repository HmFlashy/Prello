export const actionBoardSubscribe = (socket) => {
    return {
        type: 'BOARD_SUBSCRIBE',
        payload: socket
    }
};

export const actionFetchingBoard = (id) => {
    return {
        type: 'FETCHING_BOARD',
        payload: id
    }
};

export const actionFailedFetchBoard = (error) => {
    return {
        type: 'FAILED_FETCH_BOARD',
        payload: error
    }
};

export const actionBoardFetched = (board) => {
    return {
        type: 'FETCHED_BOARD',
        payload: board
    }
};

export const actionFetchingBoards = () => {
    return {
        type: 'FETCHING_BOARDS',
        payload: null
    }
};

export const actionFailedFetchBoards = (error) => {
    return {
        type: 'FAILED_FETCH_BOARDS',
        payload: error
    }
};

export const actionBoardsFetched = (boards) => {
    return {
        type: 'FETCHED_BOARDS',
        payload: boards
    }
};

export const actionDisplayCardModal = (cardId) => {
    return {
        type: 'DISPLAY_CARD_MODAL',
        payload: cardId
    }
};

export const actionCloseCardModal = () => {
    return {
        type: 'CLOSE_CARD_MODAL',
        payload: null
    }
};

export const actionUpdateBoardName = (boardId, name) => {
    return {
        type: 'UPDATE_BOARD_NAME',
        payload: {
            boardId: boardId,
            name: name
        }
    }
};

export const actionUpdateBoardVisibility = (boardId, visibility) => {
    return {
        type: 'UPDATE_BOARD_VISIBILITY',
        payload: {
            boardId: boardId,
            visibility: visibility
        }
    }
};

export const actionUpdateBoardCategory = (boardId, category) => {
    return {
        type: 'UPDATE_BOARD_CATEGORY',
        payload: {
            boardId: boardId,
            category: category
        }
    }
};

export const actionBoardCreatingLabel = (boardId, label) => {
    return {
        type: 'BOARD_CREATING_LABEL',
        payload: {
            boardId: boardId,
            label: label
        }
    }
};

export const failedActionBoardCreatingLabel = (error) => {
    return {
        type: 'FAILED_BOARD_CREATING_LABEL',
        payload: error
    }
};

export const actionBoardUpdatingLabel = (boardId, label) => {
    return {
        type: 'BOARD_UPDATING_LABEL',
        payload: {
            boardId: boardId,
            label: label
        }
    }
};

export const failedActionBoardUpdatingLabel = (error) => {
    return {
        type: 'FAILED_BOARD_UPDATING_LABEL',
        payload: error
    }
};

export const actionBoardDeletingLabel = (boardId, label) => {
    return {
        type: 'BOARD_DELETING_LABEL',
        payload: {
            boardId: boardId,
            label: label
        }
    }
};

export const failedActionBoardDeletingLabel = (error) => {
    return {
        type: 'FAILED_BOARD_DELETING_LABEL',
        payload: error
    }
};

export const actionAddBoardLabelFilter = (label) => {
  return {
      type: 'ADD_BOARD_FILTER_LABEL',
      payload: {
          label: label
      }
  }
};

export const actionDeleteBoardLabelFilter = (label) => {
    return {
        type: 'DELETE_BOARD_FILTER_LABEL',
        payload: {
            label: label
        }
    }
};

export const actionAddBoardMemberFilter = (member) => {
    return {
        type: 'ADD_BOARD_FILTER_MEMBER',
        payload: {
            member: member
        }
    }
};

export const actionDeleteBoardMemberFilter = (member) => {
    return {
        type: 'DELETE_BOARD_FILTER_MEMBER',
        payload: {
            member: member
        }
    }
};

export const actionUpdateSearchFilter = (value) => {
    return {
        type: 'UPDATE_SEARCH_FILTER',
        payload: {
            value
        }
    }
};

export const actionSwitchFilterMode = (mode) => {
    return {
        type: 'SWITCH_FILTER_MODE',
        payload: {
            mode
        }
    }
};

export const actionSwitchDueDateMode = (mode) => {
    return {
        type: 'SWITCH_DUE_DATE_MODE',
        payload: {
            mode
        }
    }
};

export const actionClearFilter = () => {
    return {
        type: 'CLEAR_FILTER',
        payload: {}
    }
};
