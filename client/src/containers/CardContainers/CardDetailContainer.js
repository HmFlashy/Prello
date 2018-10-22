import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actionCardFetched, failedActionGetCard } from '../../redux/actions/CardActions'
import cardServices from '../../services/CardServices'
import CardDetail from '../../components/App/Card/CardDetail';

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cardModalReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async fetchCard(cardId) {
            try {
                const card = await cardServices.fetchCard(cardId)
                return dispatch(actionCardFetched(card))
            } catch (error) {
                return dispatch(failedActionGetCard())
            }
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail));