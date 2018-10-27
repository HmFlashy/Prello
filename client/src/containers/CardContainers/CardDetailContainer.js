import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CardDetail from '../../components/App/Card/CardDetail';
import cardContainerServices from "./CardContainerServices"
import cardServices from '../../services/CardServices'
import {
    actionCardFetched,
    failedActionGetCard
} from '../../redux/actions/CardActions'

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cardModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async fetchCard(cardId) {
            try {
                const card = await cardServices.fetchCard(cardId)
                return dispatch(actionCardFetched(card))
            } catch (error) {
                return dispatch(failedActionGetCard())
            }
        },
        async updateCard(cardId, oldValue, data) {
            await cardContainerServices.updateCard(cardId, oldValue, data, dispatch)
        },
        async createChecklist(cardId, data) {
            await cardContainerServices.createChecklist(cardId, data, dispatch)
        },
        async deleteChecklist(cardId, checklistId) {
            await cardContainerServices.deleteChecklist(cardId, checklistId, dispatch)
        },
        async updateChecklist(cardId, checklistId, oldVal, newVal, name) {
            await cardContainerServices.updateChecklist(cardId, checklistId, oldVal, newVal, name, dispatch)
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail));