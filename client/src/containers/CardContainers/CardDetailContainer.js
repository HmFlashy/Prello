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
        card: state.cardModalReducer
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
        async updateCard(cardId, data) {
            cardContainerServices.updateCard(cardId, data, dispatch)
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail));