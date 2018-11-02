import BoardOverview from "../../components/App/Board/BoardOverview/BoardOverview"
import {connect} from "react-redux";
import socketService from "../../services/SocketService";
import userServices from "../../services/UserServices";
import {actionBoardSubscribe} from "../../redux/actions/BoardActions";
import {actionStarBoard, actionUnstarBoard} from "../../redux/actions/UserActions";
import {withRouter} from "react-router"

const mapStateToProps = (state, ownProps) => {
    const user = state.authentification.user;
    const board = state.boards.all.find(board => ownProps.boardId === board._id)
    return {
        board: board,
        userId: user?user._id:null,
        isStarred: user?board?board.starred.includes(user._id):null:null
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        subscribe() {
            socketService.subscribe();
            dispatch(actionBoardSubscribe())
        },
        async starBoard(userId) {
            await userServices.starBoard(ownProps.boardId, userId);
            dispatch(actionStarBoard(ownProps.boardId, userId))
        },
        async unstarBoard(userId) {
            await userServices.unstarBoard(ownProps.boardId, userId);
            dispatch(actionUnstarBoard(ownProps.boardId, userId))
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardOverview));