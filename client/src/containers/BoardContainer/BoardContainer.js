import board from '../../components/App/Board/Board'
import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import { 
    actionBoardSubscribe, 
    actionFetchingBoard, 
    actionFailedFetchBoard, 
    actionBoardFetched,
    actionDisplayCardModal,
    actionCloseCardModal
} from '../../redux/actions/BoardActions'

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currentBoard,
        cardModal: state.cardModalReducer
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
        },
        closeCardModal(){
            dispatch(actionCloseCardModal())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(board);