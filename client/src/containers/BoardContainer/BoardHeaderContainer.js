import Header from "./../../components/App/Board/Board/Header"
import { connect } from "react-redux";
import socketService from "../../services/SocketService";
import userServices from "../../services/UserServices";
import {
    actionBoardSubscribe,
    actionClearFilter,
    actionFailedFetchedMembers, actionFailedFetchedteamsMembers,
    actionFetchedMembers, actionFetchedMissingMembers,
    actionFetchedTeamsMembers,
    actionFetchingMembers, actionFetchingTeamsMembers,
    actionSwitchDueDateMode,
    actionSwitchFilterMode
} from "../../redux/actions/BoardActions";
import { actionStarBoard, actionUnstarBoard } from "../../redux/actions/UserActions";
import { actionUpdateSearchFilter, actionAddBoardLabelFilter, actionDeleteBoardLabelFilter, actionAddBoardMemberFilter, actionDeleteBoardMemberFilter } from "../../redux/actions/BoardActions";
import { withRouter } from "react-router"
import BoardServices from "../../services/BoardServices";
import TeamServices from "../../services/TeamServices";

const mapStateToProps = state => {
    const user = state.authentification.user;
    const archivedCards = state.cards.all.filter(card => card.isArchived);
    const membersSearched =  state.boards.currentBoard.membersSearched;
    return {
        userId: user._id,
        archivedCards: archivedCards,
        board: state.boards.currentBoard,
        isStarred: state.boards.currentBoard.starred.includes(state.authentification.user._id),
        membersSearched: membersSearched,
        missingMembers: state.boards.currentBoard.missingMembers
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
        async fetchMembers(boardId, value){
            try {
                let members = [];
                if(value.length>=3){
                    dispatch(actionFetchingMembers());
                    members = await BoardServices.getMembers(boardId, value);
                }
                dispatch(actionFetchedMembers(members));
            } catch (error) {
                dispatch(actionFailedFetchedMembers(error));
            }
        },
        async fetchingMissingMembers() {
            let array = [];
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
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));