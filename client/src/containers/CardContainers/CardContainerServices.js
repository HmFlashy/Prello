import cardServices from '../../services/CardServices'
import {
    actionCardFetched,
    failedActionGetCard,
    failedActionUpdateCard,
    actionUpdatingCard,
    actionCardChecklistUpdated,
    failedActionCardChecklistUpdated,
    failedActionCardChecklistDeleted,
    failedActionCardChecklistCreated,
    failedActionCardAddItemToChecklist,
    failedActionCardDeleteItemToChecklist,
    failedActionCardUpdateItemToChecklist,
    actionCardUpdateItemToChecklist,
    actionMoveCard,
    failedActionMoveCard,
    failedActionAddComment,
    failedActionDeleteComment,
    failedActionUpdateComment,
    actionUpdateComment,
    failedActionCardAddLabel,
    failedActionCardRemoveLabel
} from '../../redux/actions/CardActions'

export default {
    async fetchCard(cardId, dispatch) {
        try {
            const card = await cardServices.fetchCard(cardId)
            return dispatch(actionCardFetched(card))
        } catch (error) {
            return dispatch(failedActionGetCard())
        }
    },
    async updateCard(cardId, oldValue, data, dispatch) {
        try {
            Object.keys(data).forEach(key => {
                if (key !== "_id") {
                    let toDispatch = actionUpdatingCard({ [key]: data[key], _id: data._id })
                    dispatch(toDispatch)
                }
            })
            await cardServices.updateCardApi(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionUpdateCard(oldValue, error))
        }
    }, async moveCard(cardId, data, dispatch) {
        try {
            dispatch(actionMoveCard(data))
            await cardServices.moveCardApi(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionMoveCard(data))
        }
    }, async deleteCard(cardId, dispatch) {
        try {
            await cardServices.deleteCardApi(cardId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionMoveCard(error))
        }
    }, async addComment(cardId, data, dispatch) {
        try {
            await cardServices.addCommentApi(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionAddComment(data))
        }
    }, async deleteComment(cardId, commentId, dispatch) {
        try {
            await cardServices.deleteCommentApi(cardId, commentId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionDeleteComment(error))
        }
    }, async updateComment(cardId, commentId, oldValue, data, dispatch) {
        try {
            dispatch(actionUpdateComment(data))
            await cardServices.updateCommentApi(cardId, commentId, { content: data.comment.content })
        } catch (error) {
            console.log(error)
            return dispatch(failedActionUpdateComment(oldValue))
        }
    },
    async createChecklist(cardId, data, dispatch) {
        try {
            await cardServices.createChecklist(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardChecklistCreated(error))
        }
    },
    async deleteChecklist(cardId, checklistId, dispatch) {
        try {
            await cardServices.deleteChecklist(cardId, checklistId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardChecklistDeleted(error))
        }
    },
    async updateChecklist(cardId, checklistId, oldVal, newVal, name, dispatch) {
        try {
            dispatch(actionCardChecklistUpdated(newVal))
            await cardServices.updateChecklist(cardId, checklistId, name)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardChecklistUpdated(oldVal))
        }
    },
    async addItemToChecklist(cardId, checklistId, data, dispatch) {
        try {
            await cardServices.addItemToChecklist(cardId, checklistId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardAddItemToChecklist(error))
        }
    },
    async deleteItemToChecklist(cardId, checklistId, itemId, dispatch) {
        try {
            await cardServices.deleteItemToChecklist(cardId, checklistId, itemId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardDeleteItemToChecklist(error))
        }
    },
    async updateItemToChecklist(cardId, checklistId, itemId, oldVal, newVal, data, dispatch) {
        try {
            dispatch(actionCardUpdateItemToChecklist(newVal))
            await cardServices.updateItemToChecklist(cardId, checklistId, itemId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardUpdateItemToChecklist(oldVal))
        }
    },
    async addCardLabel(cardId, labelId, dispatch) {
        try {
            await cardServices.addLabel(cardId, labelId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardAddLabel(error))
        }
    },
    async removeCardLabel(cardId, labelId, dispatch) {
        try {
            await cardServices.removeLabel(cardId, labelId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardRemoveLabel(error))
        }
    },
    async updloadLocalFile(cardId, file, dispatch) {
        try {
            return await cardServices.uploadLocalFile(cardId, file)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardRemoveLabel(error))
        }
    },
    async updloadFile(cardId, data, dispatch) {
        try {
            return await cardServices.uploadFile(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardRemoveLabel(error))
        }
    },
    async deleteAttachment(cardId, attachmentId, dispatch) {
        try {
            return await cardServices.deleteAttachment(cardId, attachmentId)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardRemoveLabel(error))
        }
    },
    async addMember(cardId, user, dispatch) {
        try {
            return await cardServices.addMember(cardId, user)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardRemoveLabel(error))
        }
    },
    async removeMember(cardId, user, dispatch) {
        try {
            return await cardServices.removeMember(cardId, user)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionCardRemoveLabel(error))
        }
    }

}