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
    actionCardUpdateItemToChecklist
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
            dispatch(actionUpdatingCard(data))
            await cardServices.updateCardApi(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionUpdateCard(oldValue, error))
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
            return dispatch(failedActionCardChecklistUpdated(oldVal, error))
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
    }
}