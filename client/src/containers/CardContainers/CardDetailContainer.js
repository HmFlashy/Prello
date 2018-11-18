import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CardDetail from '../../components/App/Card/CardDetail';
import cardContainerServices from "./CardContainerServices"
import cardServices from '../../services/CardServices'
import {
    actionCardFetched,
    failedActionGetCard,
} from '../../redux/actions/CardActions'
import {
    actionCloseCardModal
} from '../../redux/actions/BoardActions'

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.boards.currentBoard,
        card: state.cardModal,
        userId: state.authentification.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeCardModal() {
            dispatch(actionCloseCardModal())
        },
        async fetchCard(cardId) {
            try {
                const card = await cardServices.fetchCard(cardId)
                return dispatch(actionCardFetched(card))
            } catch (error) {
                return dispatch(failedActionGetCard(error))
            }
        },
        async updateCard(cardId, oldValue, data) {
            await cardContainerServices.updateCard(cardId, oldValue, data, dispatch)
        },
        async moveCard(cardId, data) {
            await cardContainerServices.moveCard(cardId, data, dispatch)
        },
        async deleteCard(cardId) {
            await cardContainerServices.deleteCard(cardId)
        },
        async createChecklist(cardId, data) {
            await cardContainerServices.createChecklist(cardId, data, dispatch)
        },
        async deleteChecklist(cardId, checklistId) {
            await cardContainerServices.deleteChecklist(cardId, checklistId, dispatch)
        },
        async updateChecklist(cardId, checklistId, oldVal, newVal, name) {
            await cardContainerServices.updateChecklist(cardId, checklistId, oldVal, newVal, name, dispatch)
        },
        async addItemToChecklist(cardId, checklistId, data) {
            await cardContainerServices.addItemToChecklist(cardId, checklistId, data, dispatch)
        },
        async deleteItemToChecklist(cardId, checklistId, itemId) {
            await cardContainerServices.deleteItemToChecklist(cardId, checklistId, itemId, dispatch)
        },
        async updateItemToChecklist(cardId, checklistId, itemId, oldVal, newVal, data) {
            await cardContainerServices.updateItemToChecklist(cardId, checklistId, itemId, oldVal, newVal, data, dispatch)
        },
        async addComment(cardId, data) {
            await cardContainerServices.addComment(cardId, data, dispatch)
        },
        async deleteComment(cardId, commentId) {
            await cardContainerServices.deleteComment(cardId, commentId, dispatch)
        },
        async updateComment(cardId, commentId, oldVal, data) {
            await cardContainerServices.updateComment(cardId, commentId, oldVal, data, dispatch)
        },
        async addCardLabel(cardId, labelId) {
            await cardContainerServices.addCardLabel(cardId, labelId, dispatch)
        },
        async removeCardLabel(cardId, labelId) {
            await cardContainerServices.removeCardLabel(cardId, labelId, dispatch)
        },
        async uploadLocalFile(cardId, file) {
            return await cardContainerServices.updloadLocalFile(cardId, file, dispatch)
        },
        async uploadFile(cardId, data) {
            return await cardContainerServices.updloadFile(cardId, data, dispatch)
        },
        async deleteAttachment(cardId, attachmentId) {
            await cardContainerServices.deleteAttachment(cardId, attachmentId, dispatch)
        },
        async manageMember(cardId, user, isAdding) {
            isAdding
                ? await cardContainerServices.addMember(cardId, user, dispatch)
                : await cardContainerServices.removeMember(cardId, user, dispatch)
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail));