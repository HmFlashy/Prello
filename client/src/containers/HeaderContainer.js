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

const mapStateToProps = (state, ownProps) => {
    return {
        boards: state.boards.all,
        boardId: state.boards.currentBoard._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscribe(boardId){
            socketService.subscribe(boardId)
            dispatch(actionBoardSubscribe(boardId))
        },
        unsubscribe(boardId){
            socketService.unsubscribe(boardId)
            //dispatch(actionBoardUnsubscribe(boardId))
        },
        async fetchBoards() {
            try {
                dispatch(actionFetchingBoards())
                const boards = await boardServices.fetchBoards()
                return dispatch(actionBoardsFetched(boards))
            } catch (error) {
                return dispatch(actionFailedFetchBoards())
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
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(header));