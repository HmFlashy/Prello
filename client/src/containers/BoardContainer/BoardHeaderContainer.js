import Header from "./../../components/App/Board/Board/Header"
import {connect} from "react-redux";
import socketService from "../../services/SocketService";
import userServices from "../../services/UserServices";
import {actionBoardSubscribe} from "../../redux/actions/BoardActions";
import {actionStarBoard, actionUnstarBoard} from "../../redux/actions/UserActions";
import {withRouter} from "react-router"

const mapStateToProps = state => {
    const user = state.authentification.user;
    const archivedCards = state.cards.all.filter(card => card.isArchived)
    return {
        userId: user._id,
        archivedCards: archivedCards,
        members: state.boards.currentBoard.members,
        boardLabels: state.boards.currentBoard.labels,
        isStarred: state.boards.currentBoard.starred.includes( state.authentification.user._id),
        boardId: state.boards.currentBoard._id
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
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));