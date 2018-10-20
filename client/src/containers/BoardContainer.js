import board from '../components/App/Board'
import { connect } from 'react-redux';
import socketService from '../services/SocketService'
import cardServices from '../services/CardServices'
import boardServices from '../services/BoardServices'
import { actionBoardSubscribe, actionFetchingBoard, actionFailedFetchBoard, actionBoardFetched } from '../redux/actions/BoardActions'
import { failedActionAddCard } from '../redux/actions/CardActions'

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currentBoard
    }
};

const mapDispatchToProps = dispatch => {
    return {
        subscribe(){
            socketService.subscribe()
            dispatch(actionBoardSubscribe())
        },
        async fetchBoard(id){
            try {
                dispatch(actionFetchingBoard(id))
                const board = await boardServices.fetchBoard(id)
                dispatch(actionBoardFetched(board))
            } catch(error) {
                return dispatch(actionFailedFetchBoard(error))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(board);