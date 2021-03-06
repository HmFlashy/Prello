import BoardOverview from "../../components/App/Board/BoardOverview/BoardOverview"
import { connect } from "react-redux";
import socketService from "../../services/SocketService";
import userServices from "../../services/UserServices";
import { actionBoardSubscribe } from "../../redux/actions/BoardActions";
import { actionStarBoard, actionUnstarBoard } from "../../redux/actions/UserActions";

const mapStateToProps = (state, ownProps) => {
    const user = state.authentification.user;
    const board = state.boards.all.find(board => ownProps.boardId === board._id);
    return {
        board: board,
        userId: user._id,
        isStarred: board ? board.starred.includes(user._id) : false
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        subscribe() {
            socketService.subscribe();
            dispatch(actionBoardSubscribe())
        },
        async starBoard(userId) {
            await userServices.starBoard(ownProps.boardId);
            dispatch(actionStarBoard(ownProps.boardId, userId))
        },
        async unstarBoard(userId) {
            await userServices.unstarBoard(ownProps.boardId);
            dispatch(actionUnstarBoard(ownProps.boardId, userId))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardOverview);