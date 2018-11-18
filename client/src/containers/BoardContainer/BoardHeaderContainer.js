import Header from "./../../components/App/Board/Board/BoardHeader"
import { connect } from "react-redux";
import socketService from "../../services/SocketService";
import userServices from "../../services/UserServices";
import {
    actionBoardSubscribe,
    actionClearFilter,
    actionFailedFetchingSearchedMembers,
    actionFetchedSearchedMembers,
    actionFetchedMissingMembers,
    actionSwitchDueDateMode,
    actionBoardUpdateName,
    failedActionBoardUpdateName,
    actionSwitchFilterMode,
    actionFetchingSearchedTeams,
    actionFetchedSearchedTeams,
    actionFailedFetchingSearchedTeams,
    actionFetchingSearchedMembers,
    actionFetchingMissingMembers,
    actionFailedFetchingMissingMembers,
    actionFailedDeletingBoardMember
} from "../../redux/actions/BoardActions";
import { actionStarBoard, actionUnstarBoard } from "../../redux/actions/UserActions";
import { actionUpdateSearchFilter, actionAddBoardLabelFilter, actionDeleteBoardLabelFilter, actionAddBoardMemberFilter, actionDeleteBoardMemberFilter } from "../../redux/actions/BoardActions";
import { withRouter } from "react-router"
import BoardServices from "../../services/BoardServices";
import TeamServices from "../../services/TeamServices";
import listServices from '../../services/ListServices'

const mapStateToProps = state => {
    const user = state.authentification.user;
    const archivedLists = state.lists.all.filter(list => list.isArchived);
    const archivedCards = state.cards.all.filter(card => card.isArchived);
    return {
        userId: user._id,
        archivedCards: archivedCards,
        archivedLists,
        board: state.boards.currentBoard,
        isStarred: state.boards.currentBoard.starred.includes(state.authentification.user._id),
        membersSearched: state.boards.currentBoard.membersSearched,
        missingMembers: state.boards.currentBoard.missingMembers,
        teamsSearched: state.boards.currentBoard.teamsSearched,
        isFetchingMembers: state.boards.currentBoard.isFetchingMembers,
        isFetchingTeams: state.boards.currentBoard.isFetchingTeams
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        subscribe(boardId) {
            socketService.subscribe(boardId)
            dispatch(actionBoardSubscribe(boardId))
        },
        unsubscribe(boardId) {
            socketService.unsubscribe(boardId)
            //dispatch(actionBoardUnsubscribe(boardId))
        },
        async starBoard(boardId, userId) {
            await userServices.starBoard(boardId);
            dispatch(actionStarBoard(boardId, userId))
        },
        async unstarBoard(boardId, userId) {
            await userServices.unstarBoard(boardId);
            dispatch(actionUnstarBoard(boardId, userId))
        },
        addLabelFilter(labelId) {
            dispatch(actionAddBoardLabelFilter(labelId))
        },
        removeLabelFilter(labelId) {
            dispatch(actionDeleteBoardLabelFilter(labelId))
        },
        addMemberFilter(labelId) {
            dispatch(actionAddBoardMemberFilter(labelId))
        },
        removeMemberFilter(labelId) {
            dispatch(actionDeleteBoardMemberFilter(labelId))
        },
        updateSearchFilter(value) {
            dispatch(actionUpdateSearchFilter(value))
        },
        switchFilterMode(mode) {
            dispatch(actionSwitchFilterMode(mode))
        },
        switchDueDateMode(mode) {
            dispatch(actionSwitchDueDateMode(mode))
        },
        clearFilter() {
            dispatch(actionClearFilter())
        },
        async fetchMembers(boardId, query) {
            try {
                let members = [];
                if (query.length >= 3) {
                    dispatch(actionFetchingSearchedMembers());
                    members = await BoardServices.getMembers(boardId, query);
                }
                dispatch(actionFetchedSearchedMembers(members));
            } catch (error) {
                dispatch(actionFailedFetchingSearchedMembers(error));
            }
        },
        async fetchingMissingMembers() {
            let array = [];
            dispatch(actionFetchingMissingMembers())
            await ownProps.board.teams.forEach(team => {
                array.push(TeamServices.getTeam(team._id));
            });
            Promise.all(array).then(teams => {
                let members = [];
                teams.forEach(team => team.members.forEach(teamMember => members.push(teamMember.member)));
                const currentMembersIds = ownProps.board.members.map(boardMember => boardMember.member._id);
                const missingMembers = members.filter(member =>
                    !currentMembersIds.includes(member._id));
                dispatch(actionFetchedMissingMembers(missingMembers));
            }).catch((error) => {
                dispatch(actionFailedFetchingMissingMembers(error))
            })
        },
        async addMembers(boardId, ids) {
            try {
                ids.map(async id => {
                    await BoardServices.addMember(boardId, id);
                })
            } catch (error) {
                throw error
            }
        },
        async updateName(boardId, oldVal, newVal) {
            try {
                dispatch(actionBoardUpdateName({ _id: boardId, name: newVal }))
                BoardServices.updateName(boardId, newVal)
            } catch (error) {
                dispatch(failedActionBoardUpdateName({ _id: boardId, name: oldVal }))
                console.log(error)
            }
        },
        async restoreList(_id) {
            try {
                await listServices.updateListApi(_id, { isArchived: false })
            } catch (error) {
                console.log(error)
            }
        },
        async deleteList(listId) {
            try {
                listServices.deleteListApi(listId)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchTeams(boardId, query) {
            try {
                let teams = [];
                if (query.length >= 3) {
                    dispatch(actionFetchingSearchedTeams());
                    teams = await BoardServices.getTeams(boardId, query);
                }
                dispatch(actionFetchedSearchedTeams(teams));
            } catch (error) {
                dispatch(actionFailedFetchingSearchedTeams(error));
            }
        },
        async addTeams(boardId, ids) {
            try {
                ids.map(async id => {
                    await BoardServices.addTeam(boardId, id);
                })
            } catch (error) {
                console.log(error)
            }
        },
        async changeRole(memberId, role) {
            try {
                await BoardServices.changeRoleBoardMember(ownProps.board._id, memberId, role);
            } catch (error) {
                console.log(error)
            }
        },
        async removeMember(memberId) {
            try {
                await BoardServices.deleteMember(ownProps.board._id, memberId);
            } catch (error) {
                dispatch(actionFailedDeletingBoardMember(error))
                console.log(error)
            }
        },
        async removeTeam(teamId) {
            try {
                await BoardServices.deleteTeam(ownProps.board._id, teamId);
            } catch (error) {
                dispatch(actionFailedDeletingBoardMember(error))
                console.log(error)
            }
        },
        async deleteBoard() {
            try {
                await BoardServices.deleteBoard(ownProps.board._id);
            } catch (error) {
                dispatch(actionFailedDeletingBoardMember(error))
                console.log(error)
            }
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));