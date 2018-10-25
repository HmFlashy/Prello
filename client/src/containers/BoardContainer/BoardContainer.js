import board from '../../components/App/Board/Board'
import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import cardServices from '../../services/CardServices'
import { 
    actionBoardSubscribe, 
    actionFetchingBoard, 
    actionFailedFetchBoard, 
    actionBoardFetched,
    actionCloseCardModal
} from '../../redux/actions/BoardActions'
import { 
    actionFetchingCard,
    actionCardFetched,
    actionFailedCardFetched
} from '../../redux/actions/CardActions'

const mapStateToProps = state => {
    return {
        board: state.boards.currentBoard,
        cardModal: state.cardModal,
        errors: state.errors.all
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
        async fetchCard(cardId){
            try {
                dispatch(actionFetchingCard(cardId))
                const card = await cardServices.fetchCard(cardId)
                dispatch(actionCardFetched(card))
                dispatch(actionFetchingBoard(card.board))
                const board = await boardServices.fetchBoard(card.board)
                return dispatch(actionBoardFetched(board))
            } catch(error){
                return dispatch(actionFailedCardFetched(error))
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