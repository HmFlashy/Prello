import cardServices from '../../services/CardServices'
import { actionCardFetched, failedActionGetCard, failedActionUpdateCardName } from '../../redux/actions/CardActions'

export default {
    async fetchCard(cardId, dispatch) {
        try {
            const card = await cardServices.fetchCard(cardId)
            return dispatch(actionCardFetched(card))
        } catch (error) {
            return dispatch(failedActionGetCard())
        }
    },
    async updateCard(cardId, data, dispatch) {
        try {
            await cardServices.updateCardApi(cardId, data)
        } catch (error) {
            console.log(error)
            return dispatch(failedActionUpdateCardName(error))
        }
    }
}