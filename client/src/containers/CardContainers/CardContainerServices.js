import cardServices from '../../services/CardServices'
import {
    actionCardFetched,
    failedActionGetCard,
    failedActionUpdateCard,
    actionUpdatingCard
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
    }
}