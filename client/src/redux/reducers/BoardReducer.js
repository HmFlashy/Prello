const defaultBoardReducer = {
    fetching: false,
    all: [],
    currentBoard: {
        _id: null,
        name: null,
        lists: [],
        owner: null,
        teams: [],
        members: [],
        starred: [],
        isClosed: null,
        activities: [],
        polls: [],
        visibility: null,
        labels: [],
        searchFilter: "",
        labelsFilter: [],
        membersFilter: [],
        filterMode: "UNION",
        dueDateMode: "",
        boardInformation: {
            nbMembers: 0,
            nbStars: 0
        },
        teamsMembersSearched: [],
        membersSearched: [],
        missingMembers: [],
        teamsSearched: [],
        errorTeamsMembersSearched: null,
        errorMembersSearched: null,
        isFetchingMembers: false,
        isFetchingTeams: false
    }
};

export default (state = defaultBoardReducer, action) => {
    switch (action.type) {
        case "FETCHED_BOARD":
            const board = action.payload;
            return {
                ...state,
                currentBoard: {
                    ...defaultBoardReducer.currentBoard,
                    ...board,
                    lists: board.lists.map(list => ({ _id: list._id, pos: list.pos, isArchived: list.isArchived }))
                }
            };
        case "FETCHING_BOARD":
            return {
                ...state,
                fetching: true
            };
        case "FETCHED_BOARDS":
            return {
                ...state,
                all: [...action.payload]
            };
        case "FETCHING_BOARDS":
            return {
                ...state,
                fetching: true
            };
        case "BOARD_SUBSCRIBE":
            return {
                ...state
            };
        case 'UPDATE_LIST_ISARCHIVED':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: state.currentBoard.lists.map(list => list._id === action.payload._id ? { ...list, isArchived: action.payload.isArchived } : list)
                }
            }
        case 'DELETE_LIST':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: state.currentBoard.lists.filter(list => list._id !== action.payload._id)
                }
            }
        /*payload : {
            _id : pollId
            optionId
            vote : {
                voter: {
                    _id
                    fullname
                }
                vote: true||false
            }
        }*/
        case 'VOTE':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: state.currentBoard.polls.map(poll => poll._id === action.payload._id ? { ...poll, options: poll.options.map(option => option._id === action.payload.optionId ? { ...option, voters: action.payload.vote.vote ? [...option.voters, action.payload.vote.voter] : option.voters.filter(voter => voter._id !== action.payload.vote.voter._id) } : option) } : poll)
                }
            }
        /*payload : {
            _id : pollId
            option: {

            }
        }*/
        case 'ADD_OPTION_POLL':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: state.currentBoard.polls.map(poll => poll._id === action.payload._id ? { ...poll, options: [...poll.options, action.payload.option] } : poll)
                }
            }
        /*payload : {
            _id : pollId
            title
            card: {
                name
                _id
            }
        }*/
        case 'UPDATE_POLL':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: state.currentBoard.polls.map(poll => poll._id === action.payload._id ? { ...poll, title: action.payload.title, card: action.payload.card } : poll)
                }
            }
        /*payload : {
            poll
        }*/
        case 'ADD_POLL':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: [...state.currentBoard.polls, action.payload.poll]
                }
            }
        /*payload : {
            _id: pollId
        }*/
        case 'DELETE_POLL':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: state.currentBoard.polls.filter(poll => poll._id !== action.payload._id)
                }
            }
        /*payload : {
           _id : pollId
           optionId
       }*/
        case 'DELETE_OPTION_POLL':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: state.currentBoard.polls.map(poll => poll._id === action.payload._id ? { ...poll, options: poll.options.filter(option => option._id !== action.payload.optionId) } : poll)
                }
            }
        /*payload : {
           _id : pollId
           optionId
           title
       }*/
        case 'UPDATE_OPTION_POLL':
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    polls: state.currentBoard.polls.map(poll => poll._id === action.payload._id ? { ...poll, options: poll.options.map(option => option._id === action.payload.optionId ? { ...option, title: action.payload.title } : option) } : poll)
                }
            }
        case "GET_BOARD":
            return {
                ...state,
                currentBoard: { ...defaultBoardReducer, ...action.payload },
                error: null
            };
        case 'UPDATE_BOARD_NAME':
            return {
                ...state,
                all: state.all.map(board => {
                    if(board._id === action.payload._id) {return {...board, name: action.payload.name}} else return board
                }),
                currentBoard: {
                    ...state.currentBoard,
                    name: action.payload.name
                }
            }
        case "FAILED_UPDATE_BOARD_NAME":
            return {
                ...state,
                currentBoard: state.currentBoard._id === action.payload._id ? { ...state.currentBoard, name: action.payload.name } : state.currentBoard,
                all: state.all.map(board => {
                    if(board._id === action.payload._id) {return {...board, name: action.payload.name}} else return board
                }),
                error: null
            };
        case "FAILED_FETCH_BOARD":
            return {
                ...state,
                error: action.payload
            };
        case "FAILED_FETCH_BOARDS":
            return {
                ...state,
                error: action.payload
            };
        case "ADD_LIST":
            const list = action.payload;
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: [...state.currentBoard.lists, { _id: list._id, pos: list.pos }]
                }
            };
        case "MOVE_LIST":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    lists: state.currentBoard.lists.map(list => list._id === action.payload._id ? {
                        ...list,
                        pos: action.payload.pos
                    } : list)
                }
            };
        case "FAILED_UPDATE_LIST_NAME":
            return {
                ...state,
                error: action.payload
            };
        case "USER_BOARD_STAR":
            console.log(action.payload);
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    starred:
                        [...state.currentBoard.starred, action.payload.user],
                    boardInformation: {
                        ...state.currentBoard.boardInformation,
                        nbStars: state.currentBoard.boardInformation.nbStars + 1
                    }
                },
                all: state.all.map(function (board) {
                    if (board._id === action.payload.board) {
                        return {
                            ...board,
                            starred:
                                [...board.starred, action.payload.user],
                            boardInformation: {
                                ...board.boardInformation,
                                nbStars: board.boardInformation.nbStars + 1
                            }
                        }
                    } else return board
                }
                )
            };
        case "USER_BOARD_UNSTAR":
            console.log(action.payload);
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    starred: state.currentBoard.starred.filter(user => user !== action.payload.user),
                    boardInformation: {
                        ...state.currentBoard.boardInformation,
                        nbStars: state.currentBoard.boardInformation.nbStars - 1
                    }
                },
                all: state.all.map(function (board) {
                    if (board._id === action.payload.board) {
                        return {
                            ...board,
                            starred: board.starred.filter(user => user !== action.payload.user),
                            boardInformation: {
                                ...board.boardInformation,
                                nbStars: board.boardInformation.nbStars - 1
                            }
                        }
                    } else return board
                }
                )
            };
        case "ADD_BOARD":
            return {
                ...state,
                all: [...state.all, action.payload.board]
            };
        case "UPDATE_BOARD_NAME":
            return {
                ...state,
                all: state.all.map(board => {
                    if (board._id === action.payload.boardId) {
                        return { ...board, name: action.payload.name }
                    } else return board
                }),
                currentBoard: state.currentBoard._id === action.payload.boardId ? {
                    ...board,
                    name: action.payload.name
                } : { ...state.currentBoard }

            };
        case "UPDATE_BOARD_VISIBILITY":
            return {
                ...state,
                all: state.all.map(board => {
                    if (board._id === action.payload._id) {
                        return { ...board, visibility: action.payload.visibility }
                    } else return board
                }),
                currentBoard: state.currentBoard._id === action.payload._id ? {
                    ...board,
                    visibility: action.payload.visibility
                } : { ...state.currentBoard }

            };
        case "FAILED_UPDATE_BOARD_VISIBILITY":
            return {
                ...state,
                all: state.all.map(board => {
                    if (board._id === action.payload._id) {
                        return { ...board, visibility: action.payload.visibility }
                    } else return board
                }),
                currentBoard: state.currentBoard._id === action.payload._id ? {
                    ...board,
                    visibility: action.payload.visibility
                } : { ...state.currentBoard }

            };
        case "CREATED_LABEL":
            return (state.currentBoard._id && state.currentBoard._id === action.payload.boardId) ?
                ({
                    ...state,
                    currentBoard: { ...state.currentBoard, labels: [...state.currentBoard.labels, action.payload.label] }
                }) : state;
        case "UPDATED_LABEL":
            return (state.currentBoard._id && state.currentBoard._id === action.payload.boardId) ?
                ({
                    ...state,
                    currentBoard: {
                        ...state.currentBoard,
                        labels: [...state.currentBoard.labels.filter(label => label._id !== action.payload.labelUpdated._id), action.payload.labelUpdated]
                    }
                }) : state;
        case "DELETED_LABEL":
            return (state.currentBoard._id && state.currentBoard._id === action.payload.boardId) ?
                ({
                    ...state,
                    currentBoard: {
                        ...state.currentBoard,
                        labels: state.currentBoard.labels.filter(label => label._id !== action.payload.label._id)
                    }
                }) : state;
        case "FAILED_BOARD_CREATING_LABEL":
        case "FAILED_BOARD_DELETING_LABEL":
        case "FAILED_BOARD_UPDATING_LABEL":
            return {
                ...state,
                error: action.payload
            };
        case "ADD_BOARD_FILTER_LABEL":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    labelsFilter: [...state.currentBoard.labelsFilter, action.payload.label]
                }
            };
        case "DELETE_BOARD_FILTER_LABEL":
            console.log(action.payload.label);
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    labelsFilter: state.currentBoard.labelsFilter.filter(label => label !== action.payload.label)
                }
            };
        case "ADD_BOARD_FILTER_MEMBER":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    membersFilter: [...state.currentBoard.membersFilter, action.payload.member]
                }
            };
        case "DELETE_BOARD_FILTER_MEMBER":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    membersFilter: state.currentBoard.membersFilter.filter(member => member !== action.payload.member)
                }
            };
        case "UPDATE_SEARCH_FILTER":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    searchFilter: action.payload.value
                }
            };
        case "SWITCH_FILTER_MODE":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    filterMode: action.payload.mode
                }
            };
        case "SWITCH_DUE_DATE_MODE":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    dueDateMode: action.payload.mode
                }
            };
        case "CLEAR_FILTER":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    searchFilter: defaultBoardReducer.currentBoard.searchFilter,
                    labelsFilter: defaultBoardReducer.currentBoard.labelsFilter,
                    membersFilter: defaultBoardReducer.currentBoard.membersFilter,
                    filterMode: defaultBoardReducer.currentBoard.filterMode,
                    dueDateMode: defaultBoardReducer.currentBoard.dueDateMode
                }
            };
        case "FETCHING_TEAMS_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    isFetchingTeamsMembers: true
                }
            };
        case "FETCHED_TEAMS_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    teamsMembersSearched: action.payload.members
                }
            };
        case "FAILED_FETCHING_TEAMS_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    error: action.payload.error
                }
            };
        case "FETCHING_SEARCHED_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    isFetchingMembers: true
                }
            };
        case "FETCHED_SEARCHED_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    membersSearched: action.payload.members,
                    isFetchingMembers: false
                }
            };
        case "FAILED_FETCHING_SEARCHED_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    error: action.payload.error,
                    isFetchingMembers: false
                }
            };
        case "FETCHING_MISSING_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    isFetchingMembers: true
                }
            };
        case "FETCHED_MISSING_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    missingMembers: action.payload.members,
                    isFetchingMembers: false
                }
            };
        case "FAILED_FETCHING_MISSING_MEMBERS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    isFetchingMembers: false,
                    error: action.payload.error
                }
            };
        case "ADD_BOARD_MEMBER":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    members: action.payload,
                    missingMembers: state.currentBoard.missingMembers.filter(member => action.payload.every(boardMember =>
                        boardMember.member._id !== member._id)
                    )
                }
            };
        case "FETCHING_SEARCHED_TEAMS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    isFetchingTeams: true
                }
            };
        case "FETCHED_SEARCHED_TEAMS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    teamsSearched: action.payload.teams,
                    isFetchingTeams: false
                }
            };
        case "FAILED_FETCHING_SEARCHED_TEAMS":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    error: action.payload.error,
                    isFetchingTeams: false
                }
            };
        case "ADD_BOARD_TEAM":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    teams: action.payload.teams,
                    members: action.payload.members,
                    teamsSearched: []
                }
            }
        case "DELETED_BOARD_MEMBER":
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard,
                    members: state.currentBoard.members.filter(boardMember =>
                        boardMember.member._id!==action.payload.memberId
                    )
                }
            }
        default:
            return state
    }
}