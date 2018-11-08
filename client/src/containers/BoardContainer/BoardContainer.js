import board from '../../components/App/Board/Board'
import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import cardServices from '../../services/CardServices'
import cardContainerServices from "../CardContainers/CardContainerServices"
import listServices from '../../services/ListServices'
import { failedMoveList, actionMoveList } from '../../redux/actions/ListActions'
import {
    actionBoardSubscribe,
    actionFetchingBoard,
    actionFailedFetchBoard,
    actionBoardFetched,
    actionCloseCardModal,
    actionBoardCreatingLabel,
    failedActionBoardCreatingLabel,
    actionBoardDeletingLabel,
    failedActionBoardDeletingLabel
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
                this.subscribe(board._id)
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
                this.fetchBoard(card.board)
            } catch (error) {
                return dispatch(actionFailedCardFetched(error))
            }
        },
        async moveCard(cardId, data) {
            await cardContainerServices.moveCard(cardId, data, dispatch)
        },
        async moveList(listId, pos) {
            try {
                dispatch(actionMoveList({ _id: listId, pos }))
                await listServices.moveListApi(listId, pos)
            } catch (error) {
                console.log(error)
                return dispatch(failedMoveList(error))
            }
        },
        closeCardModal() {
            dispatch(actionCloseCardModal())
        },
        async onNewLabel(boardId, newLabelName, newLabelColor) {
            try{     
                const label = await boardServices.createLabel(boardId, newLabelName, newLabelColor)
            }
            catch(error){
                console.log(error)
                return dispatch(failedActionBoardCreatingLabel(error))
            }
        },
        async onDeleteLabel(boardId, labelId)  {
            try{ 
                await boardServices.deleteLabel(boardId, labelId)
            }
            catch(error){
                return dispatch(failedActionBoardDeletingLabel(error))
            }
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(board));