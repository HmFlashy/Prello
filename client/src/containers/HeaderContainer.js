import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import header from '../components/App/Header';
import boardServices from '../services/BoardServices'
import socketService from '../services/SocketService.js'
import {
    actionFailedFetchBoards,
    actionBoardsFetched,
    actionFetchingBoards,
    actionFetchingBoard,
    actionBoardFetched,
    actionFailedFetchBoard,
    actionBoardSubscribe
} from '../redux/actions/BoardActions'
import userServices from "../services/UserServices";
import { actionGetProfile, actionLogout } from "../redux/actions/UserActions";
import AuthentificationServices from '../services/AuthentificationServices';

const mapStateToProps = (state, ownProps) => {
    return {
        boards: state.boards.all,
        boardId: state.boards.currentBoard._id,
        user: state.authentification.user
    }
}

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
        logout(boardId){
            dispatch(actionLogout())
            ownProps.history.push("/login")
        },
        async fetchBoards() {
            try {
                dispatch(actionFetchingBoards())
                const boards = await boardServices.fetchBoards()
                return dispatch(actionBoardsFetched(boards))
            } catch (error) {
                return dispatch(actionFailedFetchBoards(error))
            }
        },
        async fetchBoard(id) {
            try {
                dispatch(actionFetchingBoard(id))
                const board = await boardServices.fetchBoard(id)
                dispatch(actionBoardFetched(board))
            } catch (error) {
                return dispatch(actionFailedFetchBoard(error))
            }
        },
        async getProfile() {
            try {
                const user = await userServices.getProfile();
                dispatch(actionGetProfile(user))
            } catch (error) {
            }
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(header));