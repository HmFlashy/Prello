import board from '../../components/App/Board/Board'
import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import cardServices from '../../services/CardServices'
import cardContainerServices from "../CardContainers/CardContainerServices"
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
import { withRouter } from 'react-router'

const mapStateToProps = state => {
    return {
        board: state.boards.currentBoard,
        lists: state.lists.all,
        cardModal: state.cardModal,
        errors: state.errors.all
    }
};

const mapDispatchToProps = dispatch => {
    return {
        subscribe(boardId) {
            socketService.subscribe(boardId)
            dispatch(actionBoardSubscribe(boardId))
        },
        unsubscribe(boardId) {
            socketService.unsubscribe(boardId)
            //dispatch(actionBoardUnsubscribe(boardId))
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
        async fetchCard(cardId) {
            try {
                dispatch(actionFetchingCard(cardId))
                const card = await cardServices.fetchCard(cardId)
                dispatch(actionCardFetched(card))
                dispatch(actionFetchingBoard(card.board))
                const board = await boardServices.fetchBoard(card.board)
                return dispatch(actionBoardFetched(board))
            } catch (error) {
                return dispatch(actionFailedCardFetched(error))
            }
        },
        async moveCard(cardId, data) {
            await cardContainerServices.moveCard(cardId, data, dispatch)
        },
        closeCardModal() {
            dispatch(actionCloseCardModal())
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(board));