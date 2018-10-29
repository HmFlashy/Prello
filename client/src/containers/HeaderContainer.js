import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import header from '../components/App/Header';
import boardServices from '../services/BoardServices'
import {
    actionFailedFetchBoards,
    actionBoardsFetched,
    actionFetchingBoards,
    actionFetchingBoard,
    actionBoardFetched,
    actionFailedFetchBoard
} from '../redux/actions/BoardActions'

const mapStateToProps = (state, ownProps) => {
    return {
        boards: state.boards.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
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